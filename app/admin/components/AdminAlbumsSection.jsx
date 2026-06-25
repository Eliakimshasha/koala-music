/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import AdminImagePickerField from "./AdminImagePickerField";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=80";

function getEmptyAlbumDraft() {
  return {
    title: "",
    description: "",
    release_date: "",
    cover_image_url: "",
  };
}

function getEmptyTrackDraft(coverImage = "") {
  return {
    title: "",
    artist: "",
    duration_seconds: "",
    release_date: "",
    audio_url: "",
    cover_image_url: coverImage,
  };
}

async function parseApiError(response, fallbackMessage) {
  try {
    const data = await response.json();

    if (typeof data?.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data?.detail)) {
      const first = data.detail[0];
      if (typeof first === "string") return first;
      if (typeof first?.msg === "string") return first.msg;
    }

    if (typeof data?.message === "string") {
      return data.message;
    }
  } catch {
    return fallbackMessage;
  }

  return fallbackMessage;
}

export default function AdminAlbumsSection({ token, apiUrl }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [albumDraft, setAlbumDraft] = useState(getEmptyAlbumDraft);
  const [localTracks, setLocalTracks] = useState([]);
  const [newTrack, setNewTrack] = useState(getEmptyTrackDraft);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAlbumsAndTracks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const [albumsRes, musicRes] = await Promise.all([
        fetch(`${apiUrl}/albums`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiUrl}/music`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (!albumsRes.ok || !musicRes.ok) {
        throw new Error("Failed to load albums section");
      }
      const [albumsData, musicData] = await Promise.all([
        albumsRes.json(),
        musicRes.json(),
      ]);
      const nextAlbums = Array.isArray(albumsData) ? albumsData : [];
      setAlbums(nextAlbums);
      setLocalTracks(Array.isArray(musicData) ? musicData : []);
      if (nextAlbums.length > 0) {
        setSelectedAlbumId((prev) => prev || nextAlbums[0].id);
      }
    } catch (err) {
      setError(err?.message || "Failed to load albums section");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, token]);

  useEffect(() => {
    fetchAlbumsAndTracks();
  }, [fetchAlbumsAndTracks]);

  const selectedAlbum = useMemo(
    () => albums.find((album) => album.id === selectedAlbumId) || null,
    [albums, selectedAlbumId]
  );

  const relatedTracks = useMemo(() => {
    if (!selectedAlbum) return [];
    return localTracks.filter((track) => track.album === selectedAlbum.title);
  }, [selectedAlbum, localTracks]);

  function openAlbumDialog(albumId) {
    const album = albums.find((item) => item.id === albumId) || null;
    setSelectedAlbumId(albumId);
    setNewTrack(getEmptyTrackDraft(album?.cover_image_url || ""));
    setDialogOpen(true);
  }

  function startCreateAlbum() {
    setEditingAlbumId(null);
    setAlbumDraft(getEmptyAlbumDraft());
    setSheetOpen(true);
  }

  function startEditAlbum(album) {
    setEditingAlbumId(album.id);
    setAlbumDraft({
      title: album.title || "",
      description: album.description || "",
      release_date: album.release_date ? String(album.release_date).slice(0, 10) : "",
      cover_image_url: album.cover_image_url || "",
    });
    setSheetOpen(true);
  }

  async function saveAlbum(event) {
    event.preventDefault();
    setError("");

    const payload = {
      title: albumDraft.title.trim(),
      description: albumDraft.description.trim() || null,
      release_date: albumDraft.release_date || null,
      cover_image_url: albumDraft.cover_image_url || null,
    };

    try {
      if (editingAlbumId) {
        const response = await fetch(`${apiUrl}/albums/${editingAlbumId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(await parseApiError(response, "Failed to update album"));
        }
      } else {
        const response = await fetch(`${apiUrl}/albums`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(await parseApiError(response, "Failed to create album"));
        }
      }

      setSheetOpen(false);
      setAlbumDraft(getEmptyAlbumDraft());
      setEditingAlbumId(null);
      await fetchAlbumsAndTracks();
    } catch (err) {
      setError(err?.message || "Failed to save album");
    }
  }

  async function deleteAlbum(album) {
    if (!window.confirm(`Delete "${album.title}"? This cannot be undone.`)) {
      return;
    }

    setError("");

    try {
      const response = await fetch(`${apiUrl}/albums/${album.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(await parseApiError(response, "Failed to delete album"));
      }

      if (selectedAlbumId === album.id) {
        setSelectedAlbumId(null);
        setDialogOpen(false);
      }

      await fetchAlbumsAndTracks();
    } catch (err) {
      setError(err?.message || "Failed to delete album");
    }
  }

  async function addTrackToAlbum(event) {
    event.preventDefault();
    if (!selectedAlbum || !newTrack.title.trim()) return;
    setError("");
    try {
      const response = await fetch(`${apiUrl}/music`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTrack.title.trim(),
          artist: newTrack.artist.trim() || "Unknown Artist",
          album: selectedAlbum.title,
          duration_seconds: newTrack.duration_seconds
            ? Number(newTrack.duration_seconds)
            : null,
          release_date: newTrack.release_date || null,
          audio_url: newTrack.audio_url.trim() || null,
          cover_image_url:
            newTrack.cover_image_url || selectedAlbum.cover_image_url || null,
        }),
      });
      if (!response.ok) {
        throw new Error(await parseApiError(response, "Failed to add music"));
      }
      const created = await response.json();
      setLocalTracks((prev) => [created, ...prev]);
      setNewTrack(getEmptyTrackDraft(selectedAlbum.cover_image_url || ""));
    } catch (err) {
      setError(err?.message || "Failed to add music");
    }
  }

  async function deleteTrack(trackId) {
    setError("");
    try {
      const response = await fetch(`${apiUrl}/music/${trackId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(await parseApiError(response, "Failed to delete music"));
      }
      setLocalTracks((prev) => prev.filter((track) => track.id !== trackId));
    } catch (err) {
      setError(err?.message || "Failed to delete music");
    }
  }

  function getTrackCount(albumTitle) {
    return localTracks.filter((track) => track.album === albumTitle).length;
  }

  return (
    <section className="space-y-4">
      <div className="border border-slate-300 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.12em] text-slate-500">
              Albums
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Albums Manager
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Create albums, manage their cover images, and attach related music.
            </p>
          </div>
          <button
            type="button"
            onClick={startCreateAlbum}
            className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
          >
            New Album
          </button>
        </div>

        {error ? (
          <p className="mt-3 border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        ) : null}
        {loading ? (
          <p className="mt-3 border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Loading albums...
          </p>
        ) : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {albums.map((album) => (
            <div
              key={album.id}
              className="overflow-hidden border border-slate-300 bg-slate-50"
            >
              <button
                type="button"
                onClick={() => openAlbumDialog(album.id)}
                className="w-full text-left"
              >
                <img
                  src={album.cover_image_url || FALLBACK_COVER}
                  alt={album.title}
                  className="h-36 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-900">{album.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                    {album.description || "No description"}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.08em] text-slate-500">
                    <span>Release: {album.release_date || "TBA"}</span>
                    <span>{getTrackCount(album.title)} Tracks</span>
                  </div>
                </div>
              </button>

              <div className="flex flex-wrap gap-2 border-t border-slate-300 px-3 py-3">
                <button
                  type="button"
                  onClick={() => startEditAlbum(album)}
                  className="border border-slate-300 bg-white px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-slate-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteAlbum(album)}
                  className="border border-rose-300 bg-rose-50 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto border-l border-slate-300 bg-white p-0 sm:max-w-xl"
        >
          <div className="p-4 sm:p-5">
            <SheetHeader>
              <SheetTitle>{editingAlbumId ? "Edit Album" : "Create Album"}</SheetTitle>
              <SheetDescription>
                {editingAlbumId
                  ? "Update album information and cover art."
                  : "Add a new album directly to the database."}
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={saveAlbum} className="mt-4 grid gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Title
                </span>
                <input
                  value={albumDraft.title}
                  onChange={(event) =>
                    setAlbumDraft((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Description
                </span>
                <textarea
                  rows={3}
                  value={albumDraft.description}
                  onChange={(event) =>
                    setAlbumDraft((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Release Date
                </span>
                <input
                  type="date"
                  value={albumDraft.release_date}
                  onChange={(event) =>
                    setAlbumDraft((prev) => ({
                      ...prev,
                      release_date: event.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>

              <AdminImagePickerField
                label="Cover Image"
                value={albumDraft.cover_image_url}
                onChange={(value) =>
                  setAlbumDraft((prev) => ({ ...prev, cover_image_url: value }))
                }
              />

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
                >
                  {editingAlbumId ? "Save Album" : "Create Album"}
                </button>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border border-slate-300 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>
              {selectedAlbum ? `${selectedAlbum.title} - Related Music` : "Related Music"}
            </DialogTitle>
            <DialogDescription>
              Add tracks to this album with cover art, audio links, and timing data.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={addTrackToAlbum}
            className="mt-3 grid gap-3 border border-slate-300 bg-slate-50 p-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Track Title
                </span>
                <input
                  value={newTrack.title}
                  onChange={(event) =>
                    setNewTrack((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Artist
                </span>
                <input
                  value={newTrack.artist}
                  onChange={(event) =>
                    setNewTrack((prev) => ({ ...prev, artist: event.target.value }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Duration (seconds)
                </span>
                <input
                  type="number"
                  min="0"
                  value={newTrack.duration_seconds}
                  onChange={(event) =>
                    setNewTrack((prev) => ({
                      ...prev,
                      duration_seconds: event.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Release Date
                </span>
                <input
                  type="date"
                  value={newTrack.release_date}
                  onChange={(event) =>
                    setNewTrack((prev) => ({
                      ...prev,
                      release_date: event.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                Audio URL
              </span>
              <input
                value={newTrack.audio_url}
                onChange={(event) =>
                  setNewTrack((prev) => ({ ...prev, audio_url: event.target.value }))
                }
                className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
              />
            </label>

            <AdminImagePickerField
              label="Track Cover Image"
              value={newTrack.cover_image_url}
              onChange={(value) =>
                setNewTrack((prev) => ({ ...prev, cover_image_url: value }))
              }
            />

            <button
              type="submit"
              className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white sm:w-fit"
            >
              Add Music
            </button>
          </form>

          {relatedTracks.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-slate-300 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-600">
                  <tr>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Cover</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Title</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Artist</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Duration</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Release Date</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {relatedTracks.map((track) => (
                    <tr key={track.id} className="border-b border-slate-200">
                      <td className="px-3 py-2">
                        <img
                          src={track.cover_image_url || selectedAlbum?.cover_image_url || FALLBACK_COVER}
                          alt={track.title}
                          className="h-12 w-12 object-cover"
                        />
                      </td>
                      <td className="px-3 py-2 text-slate-900">{track.title}</td>
                      <td className="px-3 py-2 text-slate-700">{track.artist || "-"}</td>
                      <td className="px-3 py-2 text-slate-600">
                        {track.duration_seconds || "-"}
                      </td>
                      <td className="px-3 py-2 text-slate-600">{track.release_date || "-"}</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => deleteTrack(track.id)}
                          className="border border-rose-300 bg-rose-50 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-rose-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 border border-slate-300 bg-slate-50 p-3 text-sm text-slate-600">
              No music items mapped to this album yet.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

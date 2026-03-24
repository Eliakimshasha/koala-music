"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1000&q=80";

export default function AdminAlbumsSection({ token, apiUrl }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localTracks, setLocalTracks] = useState([]);
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "",
    release_date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchAlbumsAndTracks() {
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
      setAlbums(Array.isArray(albumsData) ? albumsData : []);
      setLocalTracks(Array.isArray(musicData) ? musicData : []);
      if (Array.isArray(albumsData) && albumsData.length > 0) {
        setSelectedAlbumId((prev) => prev || albumsData[0].id);
      }
    } catch (err) {
      setError(err?.message || "Failed to load albums section");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlbumsAndTracks();
  }, [token, apiUrl]);

  const selectedAlbum = useMemo(
    () => albums.find((album) => album.id === selectedAlbumId) || null,
    [albums, selectedAlbumId]
  );

  const relatedTracks = useMemo(() => {
    if (!selectedAlbum) return [];
    return localTracks.filter((track) => track.album === selectedAlbum.title);
  }, [selectedAlbum, localTracks]);

  function openAlbumDialog(albumId) {
    setSelectedAlbumId(albumId);
    setDialogOpen(true);
  }

  async function addTrackToAlbum(e) {
    e.preventDefault();
    if (!selectedAlbum || !newTrack.title.trim()) return;
    setError("");
    try {
      const res = await fetch(`${apiUrl}/music`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTrack.title.trim(),
          artist: newTrack.artist.trim() || "Unknown Artist",
          album: selectedAlbum.title,
          release_date: newTrack.release_date || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to add music");
      const created = await res.json();
      setLocalTracks((prev) => [created, ...prev]);
      setNewTrack({ title: "", artist: "", release_date: "" });
    } catch (err) {
      setError(err?.message || "Failed to add music");
    }
  }

  async function deleteTrack(trackId) {
    setError("");
    try {
      const res = await fetch(`${apiUrl}/music/${trackId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete music");
      setLocalTracks((prev) => prev.filter((track) => track.id !== trackId));
    } catch (err) {
      setError(err?.message || "Failed to delete music");
    }
  }

  return (
    <section className="space-y-4">
      <div className="border border-slate-300 bg-white p-4 sm:p-5">
        <p className="text-[0.58rem] uppercase tracking-[0.12em] text-slate-500">
          Albums
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">
          Albums Manager
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Click an album card to view all related music.
        </p>

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
          {albums.map((album) => {
            return (
              <button
                key={album.id}
                type="button"
                onClick={() => openAlbumDialog(album.id)}
                className={`overflow-hidden  text-left transition bg-slate-50`}
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
                  <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-slate-500">
                    Release: {album.release_date || "TBA"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border border-slate-300 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>
              {selectedAlbum ? `${selectedAlbum.title} - Related Music` : "Related Music"}
            </DialogTitle>
            <DialogDescription>
              Add new music to this album or remove existing tracks.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={addTrackToAlbum} className="mt-3 grid gap-3 border border-slate-300 bg-slate-50 p-3 sm:grid-cols-4">
            <input
              value={newTrack.title}
              onChange={(e) => setNewTrack((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Track title"
              className="border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 sm:col-span-2"
            />
            <input
              value={newTrack.artist}
              onChange={(e) => setNewTrack((prev) => ({ ...prev, artist: e.target.value }))}
              placeholder="Artist"
              className="border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
            <input
              type="date"
              value={newTrack.release_date}
              onChange={(e) =>
                setNewTrack((prev) => ({ ...prev, release_date: e.target.value }))
              }
              className="border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
            <button
              type="submit"
              className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white sm:col-span-4 sm:w-fit"
            >
              Add Music
            </button>
          </form>

          {relatedTracks.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-slate-300 text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-600">
                  <tr>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Title</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Artist</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Release Date</th>
                    <th className="border-b border-slate-300 px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {relatedTracks.map((track) => (
                    <tr key={track.id} className="border-b border-slate-200">
                      <td className="px-3 py-2 text-slate-900">{track.title}</td>
                      <td className="px-3 py-2 text-slate-700">{track.artist || "-"}</td>
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

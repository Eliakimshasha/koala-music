"use client";

import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

function getInitialDraft(fields) {
  const next = {};
  fields.forEach((field) => {
    next[field.name] = "";
  });
  return next;
}

const AUDIO_IMAGE =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80";

export default function AdminMockResourceWorkspace({ title, fields, seedItems }) {
  const [items, setItems] = useState(seedItems);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(() => getInitialDraft(fields));
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [items, query]);

  function startCreate() {
    setEditingId(null);
    setDraft(getInitialDraft(fields));
    setSheetOpen(true);
  }

  function startEdit(item) {
    setEditingId(item.id);
    const next = getInitialDraft(fields);
    fields.forEach((field) => {
      next[field.name] = item[field.name] ?? "";
    });
    setDraft(next);
    setSheetOpen(true);
  }

  function saveItem(e) {
    e.preventDefault();
    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...draft } : item
        )
      );
      setEditingId(null);
      setSheetOpen(false);
      return;
    }

    const nextId = String(Date.now());
    setItems((prev) => [{ id: nextId, ...draft }, ...prev]);
    setDraft(getInitialDraft(fields));
    setSheetOpen(false);
  }

  function askDelete(item) {
    setDeleteTarget(item);
  }

  function removeItem() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setDraft(getInitialDraft(fields));
    }
    setDeleteTarget(null);
  }

  function getItemImage(item) {
    const isAudio = title.toLowerCase().includes("music");
    if (isAudio) return AUDIO_IMAGE;
    if (item.thumbnail_url) return item.thumbnail_url;
    if (item.image_url) return item.image_url;
    return DEFAULT_IMAGE;
  }

  return (
    <section className="border border-slate-300 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.12em] text-slate-500">
            {title}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Mock Workspace
          </h2>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
        >
          New Item
        </button>
      </div>

      <div className="mt-4">
        <div className="border border-slate-300 bg-slate-50 p-3">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
              Existing Items
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 outline-none focus:border-slate-900 sm:w-[160px]"
            />
          </div>

          <div className="grid gap-2 lg:grid-cols-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="border border-slate-300 bg-white p-3 text-sm"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="min-w-0 wrap-break-word font-semibold text-slate-900">
                      {item.title || item.name || item.venue || item.city || "Untitled"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="border border-slate-300 bg-slate-100 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => askDelete(item)}
                        className="border border-rose-300 bg-rose-50 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <img
                    src={getItemImage(item)}
                    alt={item.title || item.name || "item"}
                    className="mb-2 h-36 w-full border border-slate-300 object-cover"
                  />
                  <div className="grid gap-1 text-xs text-slate-600">
                    {fields
                      .filter((field) => !field.name.includes("url"))
                      .slice(0, 3)
                      .map((field) => (
                        <p key={`${item.id}-${field.name}`}>
                          <span className="font-semibold text-slate-800">
                            {field.label}:
                          </span>{" "}
                          {item[field.name] || "-"}
                        </p>
                      ))}
                    </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="border border-slate-300 bg-white p-3 text-sm text-slate-600">
                No results found.
              </p>
            )}
          </div>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto border-l border-slate-300 bg-white p-0 sm:max-w-xl"
        >
          <div className="p-4 sm:p-5">
            <SheetHeader>
              <SheetTitle>{editingId ? "Edit Item" : "Create Item"}</SheetTitle>
              <SheetDescription>
                {editingId
                  ? `Update ${title.toLowerCase()} details.`
                  : `Add a new entry to ${title.toLowerCase()}.`}
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={saveItem} className="mt-4 grid gap-3">
              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                    {field.label}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={draft[field.name] || ""}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                      className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      step={field.step}
                      value={draft[field.name] || ""}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                      className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                    />
                  )}
                </label>
              ))}
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
                >
                  {editingId ? "Save Changes" : "Add Item"}
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

      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-md border border-slate-300 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              This will remove{" "}
              <span className="font-semibold text-slate-900">
                {deleteTarget?.title || deleteTarget?.name || "this item"}
              </span>
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={removeItem}
              className="border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-rose-700"
            >
              Confirm Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function DashboardUpcoming({ gigs }) {
  const [items, setItems] = useState(gigs);
  const [editingIndex, setEditingIndex] = useState(null);
  const [draft, setDraft] = useState({ title: "", location: "", date: "" });

  function openEdit(index) {
    const gig = items[index];
    setDraft({
      title: gig.title,
      location: gig.location,
      date: gig.date,
    });
    setEditingIndex(index);
  }

  function saveEdit(e) {
    e.preventDefault();
    if (editingIndex === null) return;
    setItems((prev) =>
      prev.map((item, idx) => (idx === editingIndex ? { ...item, ...draft } : item))
    );
    setEditingIndex(null);
  }

  return (
    <>
      <section className="border border-slate-300 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-slate-500">
              Tour Pipeline
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              Next appearances
            </h3>
          </div>
        </div>

        <Separator className="my-4 bg-slate-300" />

        <div className="space-y-4">
          {items.map((gig, index) => (
            <div key={gig.title} className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {gig.title}
                  </p>
                  <p className="text-xs text-slate-600">
                    {gig.location}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[9px]  tracking-[0.12em] text-slate-500">
                    {gig.date}
                  </p>
                  <button
                    type="button"
                    onClick={() => openEdit(index)}
                    className="mt-2 border border-slate-300 bg-slate-100 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-slate-700"
                  >
                    Edit
                  </button>
                </div>
              </div>
              {index < items.length - 1 && <Separator className="bg-slate-300" />}
            </div>
          ))}
        </div>
      </section>

      <Sheet
        open={editingIndex !== null}
        onOpenChange={(open) => {
          if (!open) setEditingIndex(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-full border-l border-slate-300 bg-white p-0 sm:max-w-md"
        >
          <div className="p-4 sm:p-5">
            <SheetHeader>
              <SheetTitle>Edit Show</SheetTitle>
              <SheetDescription>Update the selected show details.</SheetDescription>
            </SheetHeader>

            <form onSubmit={saveEdit} className="mt-4 grid gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Title
                </span>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Location
                </span>
                <input
                  value={draft.location}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Date
                </span>
                <input
                  value={draft.date}
                  onChange={(e) => setDraft((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingIndex(null)}
                  className="border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

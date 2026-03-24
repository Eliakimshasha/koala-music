"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function DashboardActivity({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <section className="border border-slate-300 bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-slate-500">
              Activity Feed
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">Latest updates</h3>
          </div>
          <span className="text-xs text-slate-500">
            Last 14 days
          </span>
        </div>

        <Separator className="my-4 bg-slate-300" />

        <div className="space-y-3 text-sm text-slate-600">
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_80px] gap-3 text-xs uppercase tracking-[0.12em] text-slate-500 sm:grid">
            <span>Name</span>
            <span>Timestamp</span>
            <span>Actions</span>
          </div>
          <Separator className="hidden bg-slate-300 sm:block" />
          {items.map((item, index) => (
            <div key={item.title} className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_120px_80px] sm:items-center sm:gap-3">
                <span className="text-sm text-slate-900 sm:text-sm">
                  {item.title}
                </span>
                <span className="text-xs text-slate-500 sm:text-xs sm:text-slate-600">{item.time}</span>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="w-fit border border-slate-300 bg-slate-100 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-900 hover:bg-white"
                >
                  View
                </button>
              </div>
              {index < items.length - 1 && <Separator className="bg-slate-300" />}
            </div>
          ))}
        </div>
      </section>

      <Dialog open={Boolean(selectedItem)} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md border border-slate-300 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
            <DialogDescription>
              Review this specific activity item.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-2 text-sm">
              <p>
                <span className="font-semibold text-slate-900">Title:</span>{" "}
                <span className="text-slate-700">{selectedItem.title}</span>
              </p>
              <p>
                <span className="font-semibold text-slate-900">Time:</span>{" "}
                <span className="text-slate-700">{selectedItem.time}</span>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

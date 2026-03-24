"use client";

import { Separator } from "@/components/ui/separator";

export default function DashboardUpcoming({ gigs }) {
  return (
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
        <span className="text-xs text-slate-500">
          Next 30 days
        </span>
      </div>

      <Separator className="my-4 bg-slate-300" />

      <div className="space-y-4">
        {gigs.map((gig, index) => (
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
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  {gig.date}
                </p>
                <button
                  type="button"
                  className="mt-2 border border-slate-300 bg-slate-100 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-slate-700"
                >
                  Edit
                </button>
              </div>
            </div>
            {index < gigs.length - 1 && <Separator className="bg-slate-300" />}
          </div>
        ))}
      </div>
    </section>
  );
}

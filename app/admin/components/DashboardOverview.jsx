"use client";

export default function DashboardOverview({ stats }) {
  return (
    <section className="border border-slate-300 bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">
            Command Metrics
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
            Performance Snapshot
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-slate-300 bg-slate-50 p-4"
          >
            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-slate-500">
              {stat.label}
            </p>
            <div className="mt-3 flex items-center gap-2 lg:gap-6">
              <p className="text-2xl font-semibold text-slate-900">
                {stat.value}
              </p>
              {stat.delta && (
                <span className="border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[0.62rem] font-semibold text-emerald-700">
                  {stat.delta}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600">
              {stat.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

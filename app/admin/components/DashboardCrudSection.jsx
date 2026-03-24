"use client";

import { Separator } from "@/components/ui/separator";
import ResourcePanel from "./ResourcePanel";

export default function DashboardCrudSection({ resources, token, apiUrl }) {
  return (
    <section className="border border-slate-300 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.2em] text-slate-500">
            Content Operations
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">CRUD Workspaces</h2>
        </div>
        <button
          className="border border-slate-300 bg-slate-100 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-slate-700 transition hover:border-slate-900 hover:bg-white"
          type="button"
        >
          Refresh All
        </button>
      </div>
      <Separator className="my-4 bg-slate-300" />
      <div className="admin-resource-grid lg:grid-cols-2">
        {resources.map((resource) => (
          <ResourcePanel
            key={resource.title}
            title={resource.title}
            endpoint={resource.endpoint}
            fields={resource.fields}
            token={token}
            apiUrl={apiUrl}
          />
        ))}
      </div>
    </section>
  );
}

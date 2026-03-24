"use client";

import { Separator } from "@/components/ui/separator";

export default function AdminAuthInfo({ apiUrl }) {
  return (
    <div className="border border-slate-300 bg-white p-6">
      <p className="text-[0.58rem] uppercase tracking-[0.12em] text-slate-500">
        Access Brief
      </p>
      <Separator className="my-4 bg-slate-300" />
      <div className="space-y-3 text-sm text-slate-700">
        <div className="border border-slate-300 bg-slate-50 p-3">
          One-time admin setup: use `Create First Admin` only once.
        </div>
        <div className="border border-slate-300 bg-slate-50 p-3">
          System available at: <span className="font-medium text-slate-900">{apiUrl}</span>
        </div>
      </div>
    </div>
  );
}

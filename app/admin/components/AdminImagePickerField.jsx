/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";

let imageAssetsCache = null;

export default function AdminImagePickerField({
  label,
  value,
  onChange,
  placeholder = "https://example.com/image.jpg or /assets/images/example.jpg",
}) {
  const [assets, setAssets] = useState(() => imageAssetsCache || []);
  const [libraryOpen, setLibraryOpen] = useState(false);

  useEffect(() => {
    if (imageAssetsCache) return;

    let mounted = true;

    async function loadAssets() {
      try {
        const response = await fetch("/api/admin-assets/images");
        if (!response.ok) return;
        const data = await response.json();
        if (!mounted || !Array.isArray(data)) return;
        imageAssetsCache = data;
        setAssets(data);
      } catch {
        // Keep manual URL entry available even if the asset library fails.
      }
    }

    loadAssets();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedAsset = useMemo(
    () => assets.find((asset) => asset.src === value) || null,
    [assets, value]
  );

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
          {label}
        </span>
        <button
          type="button"
          onClick={() => setLibraryOpen((open) => !open)}
          className="border border-slate-300 bg-slate-50 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-slate-700"
        >
          {libraryOpen ? "Hide Library" : "Choose From Assets"}
        </button>
      </div>

      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
      />

      {assets.length > 0 ? (
        <select
          value={selectedAsset?.src || ""}
          onChange={(event) => {
            if (!event.target.value) return;
            onChange(event.target.value);
          }}
          className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
        >
          <option value="">Select from asset library</option>
          {assets.map((asset) => (
            <option key={asset.src} value={asset.src}>
              {asset.name}
            </option>
          ))}
        </select>
      ) : null}

      {libraryOpen && assets.length > 0 ? (
        <div className="grid max-h-64 grid-cols-2 gap-3 overflow-y-auto border border-slate-300 bg-slate-50 p-3 sm:grid-cols-3">
          {assets.map((asset) => {
            const active = asset.src === value;

            return (
              <button
                key={asset.src}
                type="button"
                onClick={() => onChange(asset.src)}
                className={`overflow-hidden border text-left transition ${
                  active
                    ? "border-slate-900 bg-white"
                    : "border-slate-300 bg-white hover:border-slate-500"
                }`}
              >
                <img
                  src={asset.src}
                  alt={asset.name}
                  className="h-24 w-full object-cover"
                />
                <div className="border-t border-slate-200 px-2 py-2 text-[11px] text-slate-700">
                  {asset.name}
                </div>
              </button>
            );
          })}
        </div>
      ) : null}

      {value ? (
        <div className="overflow-hidden border border-slate-300 bg-slate-50">
          <img
            src={value}
            alt={label}
            className="h-40 w-full object-cover"
          />
        </div>
      ) : (
        <div className="border border-dashed border-slate-300 bg-slate-50 px-3 py-6 text-center text-xs text-slate-500">
          Image preview will appear here.
        </div>
      )}
    </div>
  );
}

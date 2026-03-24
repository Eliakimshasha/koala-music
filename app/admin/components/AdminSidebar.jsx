"use client";

import { useState } from "react";

import {
  Disc3,
  Calendar,
  LayoutGrid,
  LogOut,
  Menu,
  Music2,
  Settings,
  ShoppingBag,
  Video,
  X,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "albums", label: "Albums", icon: Disc3 },
  { key: "music", label: "Music Library", icon: Music2 },
  { key: "videos", label: "Video Gallery", icon: Video },
  { key: "shows", label: "Shows Manager", icon: Calendar },
  { key: "store", label: "Merch Store", icon: ShoppingBag },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ onLogout, activeView, onSelect }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  function handleSelect(view) {
    onSelect(view);
    setMobileOpen(false);
  }

  function confirmLogout() {
    setLogoutOpen(false);
    setMobileOpen(false);
    onLogout();
  }

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-slate-300 bg-slate-100 px-3 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
            Admin
          </p>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center gap-1 border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700"
            aria-label="Open navigation menu"
          >
            <Menu className="size-3.5" />
            Menu
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-[85vw] max-w-[320px] border-r border-slate-300 bg-slate-100 px-4 py-4 text-slate-900 md:hidden">
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                  Admin Menu
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-1 border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                >
                  <X className="size-3.5" />
                  Close
                </button>
              </div>

              <Separator className="bg-slate-300" />

              <nav className="space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelect(item.key)}
                      className={`flex w-full items-center gap-3 border px-3 py-2 text-left text-sm transition ${
                        activeView === item.key
                          ? "border-slate-900 bg-white text-slate-900"
                          : "border-transparent text-slate-700 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <Separator className="bg-slate-300" />

              <button
                type="button"
                onClick={() => setLogoutOpen(true)}
                className="mt-auto flex items-center justify-center gap-2 border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      <aside className="fixed left-0 top-0 hidden h-screen max-h-screen w-[240px] border-r border-slate-300 bg-slate-100 px-5 py-6 text-slate-900 md:block">
        <div className="flex h-full flex-col gap-6">
          <div className="space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid size-11 place-items-center border border-slate-300 bg-white text-sm font-semibold text-slate-700">
                AC
              </div>
              <div>
                <p className="text-sm font-semibold">Admin Crew</p>
                <p className="text-xs text-slate-500">Management</p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-300" />

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSelect(item.key)}
                  className={`flex w-full items-center gap-3 border px-3 py-2 text-left text-sm transition ${
                    activeView === item.key
                      ? "border-slate-900 bg-white text-slate-900"
                      : "border-transparent text-slate-700 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <Separator className="bg-slate-300" />

          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="mt-auto flex items-center gap-3 border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 transition hover:border-slate-900"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-md border border-slate-300 bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out from the admin dashboard?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setLogoutOpen(false)}
              className="border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              className="border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

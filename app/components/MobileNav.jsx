import React from "react";

export default function MobileNav({ navLinks, menuOpen, setMenuOpen }) {
  return (
    <div
      id="mobile-nav"
      className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!menuOpen}
    >
      <div
        className={`absolute inset-0 bg-accent text-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:border-black/40"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-xl">x</span>
        </button>
        <div className="h-full overflow-y-auto px-6 pb-12 pt-24">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.45em] text-black/60">
            <span>Navigation</span>
            <span className="tracking-wide">Swipe or tap</span>
          </div>
          <div className="mt-12 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between border-b border-black/10 py-5 transition hover:border-black/40"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center gap-5">
                  <span className="text-xs uppercase tracking-[0.4em] text-black/50">
                    0{index + 1}
                  </span>
                  <span className="font-display text-2xl tracking-[0.2em]">
                    {link.label}
                  </span>
                </div>
                <span className="text-lg text-black/50 transition group-hover:text-black">
                  -&gt;
                </span>
              </a>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6">
            <a
              href="#music"
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-accent transition hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Listen Now
            </a>
            <span className="text-xs uppercase tracking-[0.3em] text-black/60">
              KOALA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

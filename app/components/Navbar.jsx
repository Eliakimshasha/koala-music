import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({
  navLinks,
  menuOpen,
  setMenuOpen,
  theme,
  onToggleTheme,
}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50    border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-display font-bold text-accent">KOALA</div>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover-text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-surface hover-bg-surface-strong transition"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-6 bg-base-text transition-transform duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-base-text transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-base-text transition-transform duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              ></span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

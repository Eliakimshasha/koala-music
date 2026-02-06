import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-subtle bg-surface text-base-color transition hover-text-accent hover-border-accent"
      onClick={onToggle}
    >
      {isLight ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
    </button>
  );
}

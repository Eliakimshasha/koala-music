import React from "react";
import Link from "next/link";
import logoBlack from "../../public/assets/images/black.png";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function MobileNav({ navLinks, menuOpen, setMenuOpen }) {
  return (
    <div
      id="mobile-nav"
      className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
        menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
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
        <div>
          <button
            type="button"
            aria-label="Close menu"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:border-black/40"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-xl">x</span>
          </button>
          <div className="absolute left-6 top-6 flex   items-center justify-center">
            <Link
              href="/"
              aria-label="Go to home"
              className="inline-flex items-center justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src={logoBlack}
                alt="Koala logo"
                width={140}
                height={40}
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
        </div>
        <div className="h-full overflow-y-auto px-6 pb-12 pt-24">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.45em] text-black/60">
            <span>Navigation</span>
            <span className="tracking-wide">Swipe or tap</span>
          </div>
          <div className="mt-12 max-[900px]:mt-5 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between border-b border-black/10 py-5 max-[900px]:py-4 transition hover:border-black/40"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center gap-5">
                  <span className="text-xs uppercase tracking-[0.4em] text-black/50">
                    0{index + 1}
                  </span>
                  <span className="font-display text-2xl max-[900px]:text-sm tracking-[0.2em]">
                    {link.label}
                  </span>
                </div>
                <span className="text-lg text-black/50 transition group-hover:text-black">
                  <IoIosArrowRoundForward />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 max-[900px]:mt-1 flex items-center justify-between  pt-6">
            <Link
              href="/music"
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-accent transition hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Listen Now
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Go to home"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-black/60">
                KOALA
              </span>
              <Image
                src={logoBlack}
                alt="Koala logo"
                width={140}
                height={40}
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

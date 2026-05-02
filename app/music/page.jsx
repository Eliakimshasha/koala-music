"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBars2 } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";

const LISTEN_NOW_HREF = "https://onerpm.link/245155137539";
const SAFE_SPACE_HREF = "https://onerpm.link/219151261349";

const navLinks = [
  { label: "MUSIC", href: "/music" },
  { label: "VIDEOS", href: "/videos" },
  { label: "SHOWS", href: "/live-shows" },
  { label: "LIFESTYLE", href: "/lifestyle" },
  { label: "MORE THAN MUSIC", href: "/more-than-music" },
  { label: "STORE", href: "/store" },
  { label: "ABOUT", href: "/about" },
];

const tracks = [
  {
    title: "On and Off",
    imageSrc: "/assets/images/main-on-and-off.jpeg",
    imageAlt: "On and Off cover art",
    href: LISTEN_NOW_HREF,
  },
  {
    title: "Kitu Wrong",
    imageSrc: "/assets/images/alb1.jpeg",
    imageAlt: "Kitu Wrong cover art",
    href: LISTEN_NOW_HREF,
  },
  {
    title: "Safe Space",
    imageSrc: "/assets/images/safe-space.jpg",
    imageAlt: "Safe Space cover art",
    href: SAFE_SPACE_HREF,
  },
  {
    title: "Bottles of Beer",
    imageSrc: "/assets/images/alb2.jpeg",
    imageAlt: "Bottles of Beer cover art",
    href: LISTEN_NOW_HREF,
  },
  {
    title: "Am Alive",
    imageSrc: "/assets/images/koala9.jpeg",
    imageAlt: "Am Alive cover art",
    href: LISTEN_NOW_HREF,
  },
];

export default function MusicPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      }
    };
  }, [menuOpen]);

  return (
    <div className="bg-base text-base-color overflow-hidden min-h-screen">
      <div className="noise"></div>

      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-nav backdrop-blur-md border-subtle transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-between items-center">
            <Link href="/" className="flex items-center" aria-label="Go to home">
              <Image
                src="/assets/images/green.png"
                alt="Koala logo"
                width={140}
                height={40}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm tracking-wider">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover-text-accent transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-surface hover-bg-surface-strong transition"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="sr-only">Toggle navigation</span>
                <HiOutlineBars2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        <div
          id="mobile-nav"
          className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
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
              <div className="absolute left-6 top-6 flex items-center justify-center">
                <Link
                  href="/"
                  aria-label="Go to home"
                  className="inline-flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    src="/assets/images/black.png"
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
                {navLinks.map((l, index) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group flex items-center justify-between border-b border-black/10 py-5 max-[900px]:py-4 transition hover:border-black/40"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-xs uppercase tracking-[0.4em] text-black/50">
                        0{index + 1}
                      </span>
                      <span className="font-display text-2xl max-[900px]:text-sm tracking-[0.2em]">
                        {l.label}
                      </span>
                    </div>
                    <span className="text-lg text-black/50 transition group-hover:text-black">
                      <IoIosArrowRoundForward />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 max-[900px]:mt-1 flex items-center justify-between pt-6">
                <Link
                  href={LISTEN_NOW_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-accent transition hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  Listen Now
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  aria-label="Go to home"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-black/60">
                    KOALA
                  </span>
                  <Image
                    src="/assets/images/black.png"
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
      </header>

      <main className="pt-28 pb-24 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center font-display text-6xl md:text-8xl font-bold mb-6 text-gradient">
            Music
          </h1>
          <div className="splash-line mx-auto mb-16"></div>

          <div className="space-y-0 md:space-y-0 py-12  bg-surface lg:w-[70%] lg:mx-auto ">
            {tracks.map((track, i) => {
              const imageFirst = i % 2 === 0;

              return (
                <section
                  key={track.title}
                  className="px-6 py-6 md:px-10 md:py-0 min-h-[420px] md:min-h-[370px] md:max-h-[380px]"
                >
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-0 items-center min-h-[340px] md:min-h-[380px]">
                  <div
                    className={[
                      "relative w-full  overflow-hidden",
                      "h-[300px] md:h-[380px]",
                      "max-w-[460px] md:max-w-[520px] lg:max-w-none",
                      imageFirst ? "md:order-1" : "md:order-2",
                    ].join(" ")}
                  >
                    <Image
                      src={track.imageSrc}
                      alt={track.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={i < 2}
                    />
                  </div>

                  <div
                    className={[
                      "p-2 md:p-4",
                      imageFirst ? "md:order-2" : "md:order-1",
                      imageFirst ? "lg:pl-12" : "",
                    ].join(" ")}
                  >
                    <div className="text-muted text-sm mb-3">Koala Muziki</div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                      {track.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={track.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-accent text-accent-contrast font-semibold hover:scale-105 transition-transform"
                      >
                        Listen now
                      </Link>
                      <div className="text-muted text-sm">
                        Available on all platforms
                      </div>
                    </div>
                  </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="footer-distinct px-6 md:px-24 pb-10">
        <div className="max-w-7xl mx-auto border-t border-gray-100/10 pt-10">
          <div className="flex flex-col items-center text-center gap-6">
            <Link href="/" aria-label="Go to home">
              <Image
                src="/assets/images/green2.png"
                alt="Koala logo"
                width={220}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <div className="text-muted text-xs md:text-sm tracking-wide">
              <span>© 2026 KOALA MUZIKI</span>
              <span className="mx-2">|</span>
              <Link
                href="/about"
                className="hover-text-accent transition-colors"
              >
                About
              </Link>
              <span className="mx-2">|</span>
              <Link
                href="/contact"
                className="hover-text-accent transition-colors"
              >
                Contact
              </Link>
              <span className="mx-2">|</span>
              <Link
                href="/store"
                className="hover-text-accent transition-colors"
              >
                Store
              </Link>
              <span className="mx-2">|</span>
              <Link
                href={LISTEN_NOW_HREF}
                target="_blank"
                rel="noreferrer"
                className="hover-text-accent transition-colors"
              >
                Listen Now
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

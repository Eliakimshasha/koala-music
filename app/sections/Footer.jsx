import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import logoGreen from "../../public/assets/images/green.png";
import logoBlack from "../../public/assets/images/black.png";

export default function Footer() {
  const logoSrc =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "light"
      ? logoBlack
      : logoGreen;

  return (
    <footer className="section-stack relative py-16 px-6 border-t-[1px] border-gray-100/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 mb-4"
              aria-label="Go to home"
            >
              <Image
                src={logoSrc}
                alt="Koala logo"
                width={140}
                height={40}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-muted">More Than Music. Pure Feeling.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-muted">
              <div>
                <Link href="/music" className="hover-text-accent transition-colors">
                  Music
                </Link>
              </div>
              <div>
                <Link href="/videos" className="hover-text-accent transition-colors">
                  Videos
                </Link>
              </div>
              <div>
                <Link href="/store" className="hover-text-accent transition-colors">
                  Store
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-surface border border-subtle  focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-2 bg-accent text-accent-contrast font-semibold hover:scale-105 transition-transform">
                <IoIosArrowRoundForward/>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-muted text-sm">
          (c) 2024 Koala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

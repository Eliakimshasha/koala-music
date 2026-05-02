import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBars2 } from "react-icons/hi2";
import logoGreen from "../../public/assets/images/green.png";

export default function Navbar({ navLinks, menuOpen, setMenuOpen, glassBg }) {

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        glassBg ? "bg-nav backdrop-blur-md  border-subtle" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Go to home">
          <Image
            src={logoGreen}
            alt="Koala logo"
            width={140}
            height={40}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover-text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center gap-3">
          <button
            type="button"
            className="flex h-8 w-11 items-center bg-white/10 justify-center rounded-xs   hover-bg-surface-strong transition"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <HiOutlineBars2 className="h-6 w-6 text-accent" />
          </button>
        </div>
      </div>
    </nav>
  );
}

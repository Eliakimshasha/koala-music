"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function Chrome({ navLinks, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [glassBg, setGlassBg] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
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

  useEffect(() => {
    if (typeof document === "undefined") return;
    const target = document.querySelector(".hero-section");
    if (!target) {
      setGlassBg(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setGlassBg(!entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar
        navLinks={navLinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        glassBg={glassBg}
      />
      <MobileNav
        navLinks={navLinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {children}
    </>
  );
}

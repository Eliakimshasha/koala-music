"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function Chrome({ navLinks: allNavLinks, children }) {
  const navLinks = allNavLinks.filter((link) => !link.hidden);
  const [menuOpen, setMenuOpen] = useState(false);
  const [glassBg, setGlassBg] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

  // Hide the header while scrolling down, reveal it as soon as the user scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) setNavHidden(false);
      else if (delta > 6) setNavHidden(true);
      else if (delta < -6) setNavHidden(false);
      if (Math.abs(delta) > 6 || y < 80) lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        hidden={navHidden && !menuOpen}
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

"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Albums from "./sections/Albums";
import Music from "./sections/Music";
import Videos from "./sections/Videos";
import Store from "./sections/Store";
import ComingSoon from "./sections/ComingSoon";
import Connect from "./sections/Connect";
import Footer from "./sections/Footer";
import {
  navLinks,
  albums,
  tracks,
  videos,
  products,
  socialLinks,
  comingSoon,
} from "./data/siteData";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function KoalaWebsite() {
  const containerRef = useRef(null);
  const albumScrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      return;
    }
    const prefersLight = window.matchMedia?.(
      "(prefers-color-scheme: light)",
    ).matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const splitTextInstances = [];
    const ctx = gsap.context(() => {
      // Smooth scrolling setup
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      // Hero intro animation
      const heroIntro = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      heroIntro
        .from(".hero-bg", { scale: 1.08, opacity: 0, duration: 1.4 })
        .from(".hero-vibe", { y: 40, opacity: 0, duration: 1 }, "-=1.1")
        .from(".hero-orb", { scale: 0.7, opacity: 0, stagger: 0.15 }, "-=1.1")
        .from(
          ".hero-koala-text",
          { y: 20, opacity: 0, letterSpacing: "0.6em" },
          "-=0.9",
        )
        .from(".hero-title", { y: 60, opacity: 0 }, "-=0.8")
        .from(".hero-subtitle", { y: 24, opacity: 0 }, "-=0.7")
        .from(".hero-actions", { y: 20, opacity: 0 }, "-=0.6");

      // Pin hero and let content slide above it
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        endTrigger: "#about",
        end: "top top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          endTrigger: "#about",
          end: "top top",
          scrub: true,
        },
        y: -80,
        scale: 0.92,
        opacity: 0.35,
      });

      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          endTrigger: "#about",
          end: "top top",
          scrub: true,
        },
        scale: 1.2,
        opacity: 0.4,
      });

      gsap.to(".hero-spotlight", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          endTrigger: "#about",
          end: "top top",
          scrub: true,
        },
        scale: 1.4,
        opacity: 0.2,
        y: -120,
      });

      gsap.to(".hero-section", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
        autoAlpha: 0,
      });

      gsap.to(".hero-orb", {
        y: -18,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1.2,
      });

      // Staggered reveal for section titles
      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // Album cards parallax
      gsap.utils.toArray(".album-card").forEach((card, i) => {
        const speed = 1 + (i % 3) * 0.3;
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: (i) => i * -50 * speed,
        });
      });

      // Music player reveal
      gsap.from(".music-player", {
        scrollTrigger: {
          trigger: ".music-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Video grid animations
      gsap.utils.toArray(".video-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });

      // Store items reveal
      gsap.utils.toArray(".store-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // About text: character-by-character color reveal
      const msgOne = document.querySelector(".msg-one");
      const msgTwo = document.querySelector(".msg-two");

      if (msgOne) {
        const firstText = SplitText.create(msgOne, { type: "chars" });
        splitTextInstances.push(firstText);
        gsap.to(firstText.chars, {
          color: "#AFD3A1",
          stagger: 0.02,
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".maini",
            start: "top 80%",
            end: "bottom 150%",
            scrub: 1.5,
          },
        });
      }

      if (msgTwo) {
        const secondText = SplitText.create(msgTwo, { type: "chars" });
        splitTextInstances.push(secondText);
        gsap.to(secondText.chars, {
          color: "#AFD3A1",
          stagger: 0.02,
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".maini",
            start: "top 40%",
            end: "bottom 100%",
            scrub: 1.5,
          },
        });
      }

      // Social links floating animation
      gsap.to(".social-link", {
        y: -10,
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Parallax background elements
      gsap.to(".parallax-slow", {
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: (i, el) =>
          (1 - parseFloat(el.getAttribute("data-speed"))) *
          ScrollTrigger.maxScroll(window),
      });
    }, containerRef);

    return () => {
      splitTextInstances.forEach((instance) => instance.revert());
      ctx.revert();
    };
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const scrollAlbums = (direction) => {
    if (!albumScrollRef.current) return;
    const container = albumScrollRef.current;
    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="bg-base text-base-color overflow-hidden">
      

      <div className="noise"></div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar
            navLinks={navLinks}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <MobileNav
            navLinks={navLinks}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <Hero />
          <About />
          <Albums
            albums={albums}
            scrollRef={albumScrollRef}
            onPrev={() => scrollAlbums(-1)}
            onNext={() => scrollAlbums(1)}
          />
          <Music tracks={tracks} />
          <Videos videos={videos} />
          <Store products={products} />
          <ComingSoon data={comingSoon} />
          <Connect socialLinks={socialLinks} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import face from "../../public/assets/images/face1.png";
import faceBw from "../../public/assets/images/face1-bw.png";
import TunnelGallery from "../components/TunnelGallery";

gsap.registerPlugin(ScrollTrigger);

// Web-sized copies (700x1050) in /tunnel; the originals are 15–20MB and fail to optimize.
const tunnelPhotos = [
  "man1",
  "koala9",
  "man2",
  "safe-space",
  "man3",
  "on-and-off",
  "man4",
  "alb1",
  "man5",
  "alb3",
  "man6",
  "man7",
  "man8",
  "man9",
].map((name) => `/assets/images/tunnel/${name}.jpg`);

export default function Hero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const heroIntro = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      heroIntro
        .from(".hero-bg", { scale: 1.08, opacity: 0, duration: 1.4 })
        .from(".hero-tunnel", { scale: 1.08, autoAlpha: 0, duration: 2.2, ease: "expo.out" }, 0)
        .from(".hero-orb", { scale: 0.7, opacity: 0, stagger: 0.15 }, "-=1.1")
        .from(".hero-title", { y: 60, opacity: 0 }, "-=0.8")
        .from(".hero-actions", { y: 20, opacity: 0 }, "-=0.6");

      const aboutSection = document.querySelector("#about");

      mm.add("(min-width: 1024px)", () => {
        if (!aboutSection) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          endTrigger: aboutSection,
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(".hero-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            endTrigger: aboutSection,
            end: "top top",
            scrub: true,
          },
          y: -80,
          scale: 0.92,
          opacity: 0.35,
        });

        gsap.to(".hero-bg", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            endTrigger: aboutSection,
            end: "top top",
            scrub: true,
          },
          scale: 1.2,
          opacity: 0.4,
        });

        gsap.to(".hero-spotlight", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            endTrigger: aboutSection,
            end: "top top",
            scrub: true,
          },
          scale: 1.4,
          opacity: 0.2,
          y: -120,
        });

        gsap.to(sectionRef.current, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
            end: "top 30%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        if (!aboutSection) return;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          endTrigger: aboutSection,
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
      });

      gsap.to(".hero-orb", {
        y: -18,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1.2,
      });

      gsap.to(".parallax-slow", {
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: (i, el) =>
          (1 - parseFloat(el.getAttribute("data-speed") || "0")) *
          ScrollTrigger.maxScroll(window),
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative h-screen flex items-center justify-center overflow-hidden z-10 lg:bg-black"
    >
      {/* Gradient, spotlight and orbs are mobile-only; desktop is plain black */}
      <div className="hero-bg absolute inset-0 opacity-50 lg:hidden"></div>
      <div className="hero-spotlight absolute inset-0 lg:hidden"></div>

      {/* Desktop only: photo corridor on the sides, centre left clear for the portrait */}
      <div className="hero-tunnel hidden lg:block absolute inset-0">
        <TunnelGallery
          photos={tunnelPhotos}
          clearCenter={0.14}
          scale={1.3}
          className="h-full w-full"
        />
      </div>

      <div
        className="hero-orb parallax-slow absolute top-16 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 lg:hidden"
        data-speed="0.3"
      ></div>
      <div
        className="hero-orb hero-orb-secondary parallax-slow absolute bottom-16 right-12 w-64 h-64 rounded-full blur-3xl opacity-10 lg:hidden"
        data-speed="0.5"
      ></div>

      <div className="relative z-40 w-full max-w-6xl px-6">
        {/* Mobile hero (text + actions) */}
        <div className="lg:hidden relative">
          <div className="relative h-[55vh] w-full">
            <Image
              src={face}
              alt="Koala portrait"
              fill
              priority
              sizes="(min-width: 724px) 40vw, 80vw"
              className="hero-portrait"
            />
            <div className="hero-image-band"></div>
          </div>

          <h1 className="hero-title hero-mobile-title absolute z-60 top-2 hero-vertical-title font-display uppercase">
            <p className="text-start leading-tight -tracking-[0.01em]">More</p>
            <p className="text-start leading-tight -tracking-[0.01em]">Than</p>
            <p className="text-start leading-tight -tracking-[0.01em]">Music</p>
          </h1>

          <div className="hero-actions absolute -bottom-8 left-1/2 -translate-x-1/2 w-full z-50 flex justify-center gap-4">
            <button className="relative z-40 px-5 py-3 bg-accent text-accent-contrast font-semibold tracking-wider hover:scale-105 transition-transform">
              LISTEN NOW
            </button>
            <button className="relative z-40 px-5 py-3 border-2 border-subtle hover-border-accent hover-text-accent transition-all">
              EXPLORE
            </button>
          </div>

          <p className="absolute -bottom-15 left-1/2 -translate-x-1/2 w-full z-50 text-xs">
            (c) 2026 Koala. All rights reserved.
          </p>
        </div>

      </div>

      {/* Desktop hero: vintage black-and-white portrait + title, centred between the photo walls */}
      <div className="hero-desktop-center hidden lg:flex">
        <div className="hero-desktop-face">
          <Image
            src={faceBw}
            alt="Koala portrait"
            fill
            priority
            sizes="(min-width: 1024px) 30vw, 1px"
            className="object-contain"
          />
        </div>
        <div className="hero-desktop-copy">
          <p className="text-xs tracking-[0.45em] uppercase text-accent">
            More than music
          </p>
          <h2 className="font-display uppercase leading-none text-[clamp(3rem,5.2vw,5.5rem)] tracking-[0.04em]">
            Koala Muziki
          </h2>
          <p className="text-sm tracking-[0.2em] uppercase text-muted">
            Pure feeling · Music · Videos · Live
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import face from "../../public/assets/images/face1.png";
import mike from "../../public/assets/images/mike.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroIntro = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      heroIntro
        .from(".hero-bg", { scale: 1.08, opacity: 0, duration: 1.4 })
        .from(".hero-orb", { scale: 0.7, opacity: 0, stagger: 0.15 }, "-=1.1")
        .from(".hero-title", { y: 60, opacity: 0 }, "-=0.8")
        .from(".hero-actions", { y: 20, opacity: 0 }, "-=0.6");

      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
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
      }

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

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative h-screen flex items-center justify-center overflow-hidden z-10"
    >
      <div className="hero-bg absolute inset-0 opacity-50"></div>
      <div className="hero-spotlight absolute inset-0"></div>
      <div className="hero-pattern absolute inset-0"></div>

      <div
        className="hero-orb parallax-slow absolute top-16 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        data-speed="0.3"
      ></div>
      <div
        className="hero-orb hero-orb-secondary parallax-slow absolute bottom-16 right-12 w-64 h-64 rounded-full blur-3xl opacity-10"
        data-speed="0.5"
      ></div>

      <div className="hero-layout relative z-40 w-full max-w-6xl px-6">
        <div className="hero-copy">
          {/* <div className="hero-koala-text text-accent text-xs tracking-[0.4em] mb-4 font-semibold uppercase">
            Follow Us Now
          </div> */}
          {/* <div className="">
            <span className="hero-accent-square"></span>
            <span className="hero-accent-line"></span>
            <span className="hero-accent-dot">
              <Image
                src={mike}
                alt="Microphone"
                width={20}
                height={20}
                className="hero-accent-icon"
              />
            </span>
          </div> */}

          {/* <p className="hero-subtitle text-base md:text-lg text-muted tracking-[0.2em] uppercase">
            Pure Feeling. Raw Passion. Unforgettable Sound.
          </p> */}
          <div className="hero-actions absolute -bottom-8 left-1/2 -translate-x-1/2 w-full z-50 lg:mt-8 flex justify-center gap-4">
            <button className="relative z-40 lg:px-8 px-5 py-3 bg-accent text-accent-contrast font-semibold tracking-wider hover:scale-105 transition-transform">
              LISTEN NOW
            </button>
            <button className="relative z-40 lg:px-8 px-5 py-3 border-2 border-subtle hover-border-accent hover-text-accent transition-all">
              EXPLORE
            </button>
          </div>

          <p className=" absolute -bottom-15 left-1/2 -translate-x-1/2 w-full z-50 text-xs">
            (c) 2026 Koala. All rights reserved.
          </p>
        </div>
        <div className="flex h-[50vh]">
          <h1 className="hero-title absolute z-60 top-2 hero-vertical-title font-display uppercase">
            <p className="text-start leading-tight -tracking-[0.01em]">More</p>
            <p className="text-start leading-tight -tracking-[0.01em]">Than</p>
            <p className="text-start leading-tight -tracking-[0.01em]">Music</p>
          </h1>
          <div className="">
            <Image
              src={face}
              alt="Koala portrait"
              fill
              priority
              sizes="(min-width: 724px) 40vw, 80vw"
              className="hero-portrait"
            />
            <div className="hero-image-band"></div>
            {/* <div className="hero-image-glow"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

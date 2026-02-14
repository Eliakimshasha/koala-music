"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ComingSoon({ data }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="coming-soon"
      ref={sectionRef}
      className="section-stack relative py-32 pt-9 px-6"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.4em] text-subtle mb-6">
            {data.label}
          </div>
          <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-8 text-gradient">
            {data.title}
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-xl">
            {data.description}
          </p>
          <div className="mt-10 flex gap-4">
            <button className="lg:px-8 px-6 py-4 bg-accent text-accent-contrast font-semibold tracking-wider hover:scale-105 transition-transform">
              Notify Me
            </button>
            <button className="lg:px-8 px-6 py-4 border-2 border-subtle hover-border-accent hover-text-accent transition-all">
              Get the Look
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-6 w-32 h-32 rounded-full bg-accent blur-3xl opacity-30"></div>
          <div className="relative aspect-6/5 rounded-xs overflow-hidden shadow-2xl">
            <Image
              src={data.image}
              alt="Coming soon collection preview"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

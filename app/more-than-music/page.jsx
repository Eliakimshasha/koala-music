"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chrome from "../components/Chrome";
import Connect from "../sections/Connect";
import Footer from "../sections/Footer";
import { navLinks, socialLinks, moreThanMusic } from "../data/siteData";

export default function MoreThanMusicPage() {
  const { title, subtitle, disciplines, gallery } = moreThanMusic;
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".mtm-hero-copy > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from(".mtm-hero-card", {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 90,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".mtm-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.05,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Chrome navLinks={navLinks}>
      <div ref={containerRef} className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <section className="section-stack relative pt-10 pb-14 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
              <div className="mtm-hero-copy">
                <div className="text-xs uppercase tracking-[0.5em] text-subtle mb-4">
                  Beyond the studio
                </div>
                <h1 className="section-title font-display text-5xl md:text-7xl font-bold text-gradient">
                  {title}
                </h1>
                <p className="mt-4 text-base text-muted leading-relaxed">
                  {subtitle}
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-subtle px-6 py-3 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
                  >
                    Book a Project
                    <IoIosArrowRoundForward className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="relative mtm-hero-card">
                <div className="relative">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={gallery[0].image}
                      alt={gallery[0].title}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-stack relative py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                <div>
                  <h2 className="section-title font-display text-4xl md:text-6xl font-bold text-accent">
                    Creative Lanes
                  </h2>
                  <p className="mt-3 text-muted max-w-xl">
                    Select work beyond the studio.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-subtle px-5 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
                >
                  <IoIosArrowRoundForward className="h-5 w-5" />
                  Inquire
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {disciplines.slice(0, 3).map((item) => (
                  <div key={item.title} className="mtm-card group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25" />
                    </div>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-subtle mb-2">
                        {item.tag}
                      </p>
                      <h3 className="text-2xl font-display font-semibold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Connect socialLinks={socialLinks} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiveShows({ shows = [] }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isHome = Boolean(document.querySelector("#smooth-wrapper"));
      const headerTargets = isHome
        ? [".live-kicker", ".live-copy", ".live-cta"]
        : ".live-header > *";

      gsap.from(headerTargets, {
        scrollTrigger: {
          trigger: ".live-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.utils.toArray(".live-show-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="live-shows"
      ref={sectionRef}
      className="section-stack relative lg:py-20 max-[900px]:mt-5 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="live-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className=" w-full ">
            <div className="text-center">
              <h2 className="section-title lg:text-center font-display text-3xl md:text-8xl font-bold text-gradient">
                Live Shows
              </h2>
            </div>
            <p className="live-copy lg:text-center mt-3 text-base text-center text-muted max-w-xl mx-auto">
              Dates, locations, and pricing in one clean list.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {shows.map((show) => (
            <div
              key={`${show.title}-${show.date}`}
              className="live-show-card card-hover"
            >
              <div className="relative aspect-video mb-4 overflow-hidden">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-subtle">
                    {show.date}
                  </p>
                  <h3 className="mt-2 text-2xl font-display font-semibold">
                    {show.title}
                  </h3>
                  <p className="mt-2 text-sm max-[900px]:text-xs text-muted">
                    {show.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.6rem] uppercase tracking-[0.35em] text-subtle">
                    Price
                  </p>
                  <p className="mt-2 text-xl max-[900px]:text-sm font-semibold text-accent">
                    {show.price}
                  </p>
                  <Link
                    href="/live-shows"
                    className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-subtle hover-text-accent transition"
                  >
                    Tickets
                    <IoIosArrowRoundForward className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-10 flex justify-end">
         
        </div>
      </div>
    </section>
  );
}

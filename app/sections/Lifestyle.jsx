"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Lifestyle({ posts = [] }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isHome = Boolean(document.querySelector("#smooth-wrapper"));
      const headerTargets = isHome
        ? [".lifestyle-kicker", ".lifestyle-copy", ".lifestyle-cta"]
        : ".lifestyle-header > *";

      gsap.from(headerTargets, {
        scrollTrigger: {
          trigger: ".lifestyle-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.utils.toArray(".lifestyle-card").forEach((card, i) => {
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
      id="lifestyle"
      ref={sectionRef}
      className="section-stack relative py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="lifestyle-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="lifestyle-kicker text-xs uppercase tracking-[0.5em] text-subtle mb-4">
              Beyond the Studio
            </p>
            <h2 className="section-title font-display text-5xl md:text-8xl font-bold text-accent">
              Lifestyle & Stories
            </h2>
            <p className="lifestyle-copy mt-3 text-base text-muted max-w-xl">
              Simple notes from life on and off the road.
            </p>
          </div>
          <Link
            href="/lifestyle"
            className="lifestyle-cta inline-flex items-center gap-2 border border-subtle px-5 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
          >
            <IoIosArrowRoundForward className="h-5 w-5" />
            View More
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.title}
              href="/lifestyle"
              className="lifestyle-card card-hover group transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-video overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-all" />
              </div>
              <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.4em] text-subtle">
                <span>{post.tag}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="mt-3 text-xl font-display font-semibold">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/lifestyle"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-subtle hover-text-accent transition"
          >
            See more stories
            <IoIosArrowRoundForward className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

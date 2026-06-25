"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Videos({
  videos = [],
  showMoreLink = false,
  centerTitle = false,
  intro,
}) {
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

      gsap.utils.toArray(".video-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power3.out",
        });
      });

      if (document.querySelector("#live-shows")) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom",
          endTrigger: "#live-shows",
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderVideoMeta = (video) => {
    return (
      <div className="flex items-end justify-between gap-5 px-2 pb-2 pt-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.38em] text-subtle/80">
            Video Release
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
            {video.title}
          </h3>
        </div>
        <p className="shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-accent">
          {video.views}
        </p>
      </div>
    );
  };

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="section-stack relative pb-32 pt-9 lg:pt-32  px-6"
    >
      <div className="max-w-4xl mx-auto">
        {centerTitle ? (
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <h2 className="section-title font-display text-5xl md:text-8xl font-bold text-accent">
              Videos
            </h2>
            {intro ? <p className="text-base text-muted">{intro}</p> : null}
            {showMoreLink ? (
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 border border-subtle lg:px-5 px-3 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
              >
                <IoIosArrowRoundForward className="h-5 w-5" />
                View More
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6 mb-16">
            <h2 className="section-title font-display text-5xl md:text-8xl font-bold text-accent">
              Videos
            </h2>
            {showMoreLink ? (
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 border border-subtle lg:px-5 px-3 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
              >
                <IoIosArrowRoundForward className="h-5 w-5" />
                View More
              </Link>
            ) : null}
          </div>
        )}

        <div className="grid gap-7 lg:grid-cols-2">
          {videos.map((video, i) => (
            <article
              key={`${video.title}-${i}`}
              className="video-item group overflow-hidden  border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.34)] backdrop-blur-sm transition duration-300 "
            >
              <div className="relative lg:h-84 aspect-vide overflow-hidden  bg-black">
                <Image
                  src={video.image}
                  alt={video.imageAlt || video.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition group-hover:scale-110 group-hover:bg-accent group-hover:text-black">
                    <svg
                      className="ml-1 h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {renderVideoMeta(video)}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

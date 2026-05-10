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
      <div className="flex items-start justify-between gap-6 border-t border-white/10 px-5 py-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-subtle/80">
            Video Release
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            {video.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-subtle/80">
            Streams
          </p>
          <p className="mt-2 text-sm font-semibold text-accent md:text-base">
            {video.views}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="section-stack relative pb-32 pt-9 lg:pt-32  px-6"
    >
      <div className="max-w-7xl mx-auto">
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

        <div className="grid gap-8 lg:grid-cols-2 ">
          {videos.map((video, i) => (
            <article
              key={`${video.title}-${i}`}
              className="video-item group overflow-hidden border border-white/10 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(175,211,161,0.18),_rgba(10,10,10,0.96)_68%)]">
                <Image
                  src={video.image}
                  alt={video.imageAlt || video.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/60">
                      Watch Now
                    </p>
                    <p className="mt-2 max-w-xs font-display text-2xl text-white md:text-3xl">
                      {video.title}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition group-hover:scale-110 group-hover:bg-white/20">
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

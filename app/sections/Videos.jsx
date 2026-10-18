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
  homePreview = false,
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
    if (homePreview) {
      return (
        <div className="flex h-full items-stretch justify-between gap-6">
          <div className="flex min-w-0 flex-col justify-between py-1">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.38em] text-subtle/70">
                Video Release
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white md:text-[2rem] line-clamp-2">
                {video.title}
              </h3>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-white/50 transition-colors duration-300 group-hover:text-accent">
              {video.href ? "Watch" : "Link coming soon"}
              {video.href ? <IoIosArrowRoundForward className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /> : null}
            </span>
          </div>
          <div
            className="relative w-36 shrink-0 self-center overflow-hidden bg-black ring-1 ring-white/10 sm:w-48"
            style={{ aspectRatio: video.aspectRatio || "1 / 1" }}
          >
            {video.image ? <Image
              src={video.image}
              alt={video.imageAlt || video.title}
              fill
              sizes="192px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(211,234,153,0.18),transparent_60%),#111] text-center text-[0.55rem] uppercase tracking-[0.2em] text-white/50">Artwork soon</div>}
            <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:bg-accent group-hover:text-black">
                <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      );
    }

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
        {video.views ? (
          <p className="shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-accent">
            {video.views}
          </p>
        ) : video.href ? (
          <span className="shrink-0 text-xs uppercase tracking-[0.3em] text-accent">Watch</span>
        ) : (
          <span className="shrink-0 text-xs uppercase tracking-[0.3em] text-white/45">Link coming soon</span>
        )}
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
          {videos.map((video, i) => {
            const VideoTag = video.href ? "a" : "article";
            return <VideoTag
              href={video.href || undefined}
              target={video.href ? "_blank" : undefined}
              rel={video.href ? "noopener noreferrer" : undefined}
              aria-label={video.href ? `Watch ${video.title} on YouTube` : undefined}
              key={`${video.title}-${i}`}
              className={
                homePreview
                  ? "video-item group overflow-hidden border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20 sm:min-h-[13rem] sm:p-7"
                  : "video-item group overflow-hidden  border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3 shadow-[0_22px_60px_rgba(0,0,0,0.34)] backdrop-blur-sm transition duration-300 "
              }
            >
              {!homePreview ? (
                <div
                  className="relative w-full overflow-hidden bg-[#10120e]"
                  style={{ aspectRatio: video.aspectRatio || "1 / 1" }}
                >
                  {video.image ? <Image
                    src={video.image}
                    alt={video.imageAlt || video.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(211,234,153,0.18),transparent_60%),#111] p-8 text-center font-display text-2xl text-white/70">Artwork coming soon</div>}

                  {video.href ? <div className="absolute inset-0 flex items-end justify-end p-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm transition group-hover:scale-110 group-hover:border-transparent group-hover:bg-accent group-hover:text-black">
                      <svg
                        className="ml-1 h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div> : null}
                </div>
              ) : null}
              {renderVideoMeta(video)}
            </VideoTag>;
          })}
        </div>
      </div>
    </section>
  );
}

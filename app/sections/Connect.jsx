"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";

import { AiOutlineTikTok, AiOutlineSpotify } from "react-icons/ai";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { SiAudiomack, SiTidal } from "react-icons/si";

import boomplay from "musicfetch/brands/boomplay";
import { BrandIcon } from "musicfetch/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SocialCard = ({ Icon, label, href, index }) => {
  return (
    <a
      href={href || "#"}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-40 flex-col justify-between overflow-hidden p-5 text-left transition duration-300 hover:bg-white/[0.04] md:min-h-52 md:p-7"
    >
      <span className="text-xs uppercase tracking-[0.35em] text-subtle">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <Icon
          size={34}
          width={34}
          height={34}
          className="mb-6 text-accent transition duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
        <span className="font-display text-3xl text-white transition duration-300 group-hover:text-accent md:text-4xl">
          {label}
        </span>
      </div>
    </a>
  );
};

/* -------------------- COMPONENT -------------------- */

export default function Connect({ socialLinks = [] }) {
  const sectionRef = useRef(null);

  /* -------------------- GSAP -------------------- */

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

  /* -------------------- ICON MAP -------------------- */

  const iconMap = {
    tiktok: AiOutlineTikTok,
    twitter: FaXTwitter,
    x: FaXTwitter,
    instagram: IoLogoInstagram,
    youtube: FaYoutube,
    spotify: AiOutlineSpotify,
    boomplay: (props) => (
      <BrandIcon brand={boomplay} {...props} />
    ),
  };

  const resolveIcon = (label = "") => {
    const key = label.toLowerCase().replace(/\s+/g, "");
    return iconMap[key];
  };

  /* -------------------- PREPARE ICONS -------------------- */

  const connectItems = socialLinks
    .map((icon) => ({
      ...icon,
      Icon: resolveIcon(icon.label),
    }))
    .filter((icon) => icon.Icon);

  const streamingItems = [
    { label: "Audiomack", href: "#", Icon: SiAudiomack },
    { label: "Tidal", href: "#", Icon: SiTidal },
  ];

  const gridItems = [...connectItems, ...streamingItems].slice(0, 8);

  /* -------------------- JSX -------------------- */

  return (
    <section
      ref={sectionRef}
      className="section-stack relative px-6 py-24 lg:pb-32 lg:pt-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-4 text-center md:mb-16">
          <p className="text-xs uppercase tracking-[0.45em] text-subtle">
            Stay in the loop
          </p>
          <h2 className="section-title font-display text-5xl font-bold text-accent md:text-8xl">
            Connect
          </h2>
          <div className="splash-line mx-auto"></div>
        </div>

        <div className="relative overflow-hidden border border-white/15 bg-black/35 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {gridItems.map((item, index) => (
              <SocialCard
                key={item.label}
                Icon={item.Icon}
                label={item.label}
                href={item.href}
                index={index}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0">
            <Separator
              orientation="vertical"
              className="absolute left-1/2 top-0 h-full bg-white/15 md:left-1/4"
            />
            <Separator
              orientation="vertical"
              className="absolute left-1/2 top-0 hidden h-full bg-white/15 md:block"
            />
            <Separator
              orientation="vertical"
              className="absolute left-3/4 top-0 hidden h-full bg-white/15 md:block"
            />
            <Separator className="absolute left-0 top-1/4 bg-white/15 md:hidden" />
            <Separator className="absolute left-0 top-1/2 bg-white/15" />
            <Separator className="absolute left-0 top-3/4 bg-white/15 md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}

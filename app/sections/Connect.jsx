"use client";

import React, { useLayoutEffect, useRef } from "react";

import { AiOutlineTikTok, AiOutlineSpotify } from "react-icons/ai";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

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
      className="group relative flex min-h-40 flex-col justify-between overflow-hidden bg-black p-5 text-left transition duration-300 last:col-span-2 hover:bg-[#0d0d0d] md:min-h-52 md:p-7 md:last:col-span-1"
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

  const gridItems = connectItems;

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

        <div className="relative overflow-hidden border border-white/15 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-5">
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
        </div>
      </div>
    </section>
  );
}

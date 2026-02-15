"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";
import logo from "../../public/assets/images/green.png";

import { AiOutlineTikTok, AiOutlineSpotify } from "react-icons/ai";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

import boomplay from "musicfetch/brands/boomplay";
import { BrandIcon } from "musicfetch/react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------- ORBIT ICON -------------------- */

const OrbitIcon = ({ Icon, label, href, size }) => {
  return (
    <a
      href={href || "#"}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full w-full items-center justify-center transition-transform duration-300 hover:scale-110"
    >
      <Icon
        size={size}
        width={size}
        height={size}
        className="opacity-90 text-accent"
        aria-hidden="true"
      />
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

  const orbitIcons = socialLinks
    .map((icon) => ({
      ...icon,
      Icon: resolveIcon(icon.label),
    }))
    .filter((icon) => icon.Icon);

  const outerIcons = orbitIcons.slice(0, 6);
  const innerIcons = orbitIcons.slice(0, 4);

  /* -------------------- JSX -------------------- */

  return (
    <section
      ref={sectionRef}
      className="section-stack relative px-6 lg:pb-32 lg:pt-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="section-title font-display mb-4 text-5xl font-bold text-accent md:text-8xl">
          Connect
        </h2>

        <div className="splash-line mx-auto lg:mb-12"></div>

        <div className="relative mx-auto flex h-90 w-full max-w-2xl items-center justify-center overflow-hidden">
          {/* OUTER ORBIT */}
          <OrbitingCircles
            iconSize={36}
            radius={130}
            speed={1}
            pathColor="var(--border-strong)"
            pathOpacity={0.9}
            className="border border-subtle bg-black/80 shadow-[0_0_16px_-12px_rgba(0,0,0,0.9)]"
          >
            {outerIcons.map((icon) => (
              <OrbitIcon
                key={`outer-${icon.label}`}
                Icon={icon.Icon}
                label={icon.label}
                href={icon.href}
                size={22}
              />
            ))}
          </OrbitingCircles>

          {/* INNER ORBIT */}
          <OrbitingCircles
            iconSize={36}
            radius={85}
            reverse
            speed={1}
            pathColor="var(--border-strong)"
            pathOpacity={0.9}
            className="border border-subtle bg-black/80 shadow-[0_0_16px_-12px_rgba(0,0,0,0.9)]"
          >
            {innerIcons.map((icon) => (
              <OrbitIcon
                key={`inner-${icon.label}`}
                Icon={icon.Icon}
                label={icon.label}
                href={icon.href}
                size={18}
              />
            ))}
          </OrbitingCircles>

          {/* CENTER LOGO */}
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-strong bg-black shadow-[0_0_24px_-14px_rgba(0,0,0,0.9)]">
            <Image
              src={logo}
              alt="Koala logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

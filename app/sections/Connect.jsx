"use client";

import React from "react";
import Image from "next/image";
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";
import logo from "../../public/assets/images/green.png";

const OrbitIcon = ({ icon, label, href, size }) => {
  return (
    <a
      href={href || "#"}
      aria-label={label}
      className="flex h-full w-full items-center justify-center"
    >
      <Image
        src={icon}
        alt={label}
        width={size}
        height={size}
        className="opacity-90"
      />
    </a>
  );
};

export default function Connect({ socialLinks }) {
  const outerIcons = socialLinks.slice(0, 6);
  const innerIcons = socialLinks.slice(0, 4);

  return (
    <section className="section-stack relative pb-32 lg:pt-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-12 text-accent">
          Connect
        </h2>
        <div className="relative mx-auto flex h-[360px] w-full max-w-3xl items-center justify-center overflow-hidden">
          <OrbitingCircles
            iconSize={46}
            radius={150}
            speed={1}
            className="border border-subtle bg-black/80 shadow-[0_0_16px_-12px_rgba(0,0,0,0.9)]"
          >
            {outerIcons.map((icon) => (
              <OrbitIcon
                key={`outer-${icon.label}`}
                icon={icon.icon}
                label={icon.label}
                href={icon.href}
                size={22}
              />
            ))}
          </OrbitingCircles>
          <OrbitingCircles
            iconSize={36}
            radius={105}
            reverse
            speed={1.35}
            className="border border-subtle bg-black/80 shadow-[0_0_16px_-12px_rgba(0,0,0,0.9)]"
          >
            {innerIcons.map((icon) => (
              <OrbitIcon
                key={`inner-${icon.label}`}
                icon={icon.icon}
                label={icon.label}
                href={icon.href}
                size={18}
              />
            ))}
          </OrbitingCircles>
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

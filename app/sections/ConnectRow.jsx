"use client";

import React from "react";
import Image from "next/image";

export default function ConnectRow({ socialLinks = [] }) {
  const links = socialLinks.filter((item) => item && item.label);

  return (
    <section className="section-stack relative py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-accent mb-3">
          Connect
        </h2>
        <p className="text-muted text-sm md:text-base">
          Follow Koala across platforms.
        </p>
        <div className="mt-8 flex  items-center justify-center gap-4">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href || "#"}
              aria-label={item.label}
              className=" items-center gap-3 rounded-full bg-surface h-4 h-4 text-[0.65rem] uppercase tracking-[0.35em] text-subtle"
            >
              {item.icon ? (
                <Image
                  src={item.icon}
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-80 group-hover:opacity-100"
                />
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

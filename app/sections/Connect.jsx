import React from "react";
import Image from "next/image";

export default function Connect({ socialLinks }) {
  return (
    <section className="section-stack relative pb-32 lg:pt-32  px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-16 text-accent">
          Connect
        </h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {socialLinks.map((platform) => (
            <a
              key={platform.label}
              href={platform.href}
              className="social-link group"
            >
              <div className="lg:w-20 lg:h-20 h-14 w-14  hover-bg-accent rounded-full flex items-center justify-center  hover-border-accent transition-all">
                <Image
                  src={platform.icon}
                  alt={`${platform.label} icon`}
                  width={28}
                  height={28}
                  className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="mt-2 text-sm text-muted group-hover-text-accent transition-colors">
                {platform.label}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

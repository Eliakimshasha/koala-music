import React from "react";
import Image from "next/image";
import face from "../../public/assets/images/face1.png";
import mike from '../../public/assets/images/mike.png';

export default function Hero() {
  return (
    <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden z-10">
      <div className="hero-bg absolute inset-0 opacity-50"></div>
      <div className="hero-spotlight absolute inset-0"></div>
      <div className="hero-pattern absolute inset-0"></div>

      <div
        className="hero-orb parallax-slow absolute top-16 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        data-speed="0.3"
      ></div>
      <div
        className="hero-orb hero-orb-secondary parallax-slow absolute bottom-16 right-12 w-64 h-64 rounded-full blur-3xl opacity-10"
        data-speed="0.5"
      ></div>

      <div className="hero-layout relative z-40 w-full max-w-6xl px-6">
        <div className="hero-copy">
          <div className="hero-koala-text text-accent text-xs tracking-[0.4em] mb-4 font-semibold uppercase">
            Follow Us Now
          </div>
          <div className="hero-accent-stack">
            <span className="hero-accent-square"></span>
            <span className="hero-accent-line"></span>
            <span className="hero-accent-dot">
              <Image
                src={mike}
                alt="Microphone"
                width={20}
                height={20}
                className="hero-accent-icon"
              />
            </span>
          </div>
          <h1 className="hero-title hero-vertical-title font-display uppercase">
            More Than Music
          </h1>
          <p className="hero-subtitle text-base md:text-lg text-muted tracking-[0.2em] uppercase">
            Pure Feeling. Raw Passion. Unforgettable Sound.
          </p>
          <div className="hero-actions mt-8 flex gap-4">
            <button className="relative z-40 lg:px-8 px-5 py-3 bg-accent text-accent-contrast font-semibold tracking-wider hover:scale-105 transition-transform">
              LISTEN NOW
            </button>
            <button className="relative z-40 lg:px-8 px-5 py-3 border-2 border-subtle hover-border-accent hover-text-accent transition-all">
              EXPLORE
            </button>
          </div>
        </div>
        <div className="hero-vibe hero-image-frame">
          <Image
            src={face}
            alt="Koala portrait"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="hero-portrait"
          />
          <div className="hero-image-band"></div>
          <div className="hero-image-glow"></div>
        </div>
      </div>
    </section>
  );
}

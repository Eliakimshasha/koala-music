"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chrome from "../components/Chrome";
import About from "../sections/About";
import Footer from "../sections/Footer";
import { navLinks, socialLinks } from "../data/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const pinRef = useRef(null);
  const copyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!pinRef.current || !copyRef.current) return;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: () => `+=${copyRef.current.offsetHeight}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          {/* this below div should be pinned when i start scrolling and the next div with descriptions should scroll over it */}
          <div ref={pinRef} className="relative z-0">
            <About />
          </div>
          <div
            ref={copyRef}
            className="relative bg-black z-10 max-w-4xl mx-auto px-6 lg:max-w-2xl text-xs pb-16 max-[900px]:pb-16 pt-12 text-muted leading-relaxed"
          >
             <div className="text-sm uppercase text-center   tracking-[0.5em] text-subtle mb-4">
                  About Koala
                </div>
            <p className="mt-4">
              Koala isn't just an artist--he's a storyteller, a spiritual being,
              and a creator. He believes in love, in feeling deeply, and in
              channeling those emotions into music that speaks straight to the
              soul. With a smooth yet slightly rugged voice that carries raw
              passion, he makes you stop and ask, "Who is that?"--and once you
              hear him, you won't forget.
            </p>
            <p className="mt-6">
              For over five years, Koala has been crafting his sound, blending
              R&B/soul, Afro soul, Afrobeats, Amapiano, Jazz, and Indie to
              create something uniquely his own. His music is more than just
              melodies--it's a reflection of his life, emotions, and journey.
              Because at the end of the day, Koala isn't just making music--he's
              selling feelings.
            </p>
            <p className="mt-6">
              Even while pursuing a diploma in biotechnology at Dar es Salaam
              Institute of Technology, music was always calling. He took every
              chance to perform, making it to the finals of Unitalent and
              winning AUSP Overall Winner for Talents at the African University
              Students Platform Conference in Rwanda.
            </p>
            <p className="mt-6">
              After graduating, he joined Freshows, a choir/band that reimagined
              covers with a choral twist and released original songs like I Move
              On, Happiness, and Ya Kesho. But Koala's journey didn't stop
              there--he stepped into his solo artistry with his debut single,
              Kitu Wrong, and has been unstoppable ever since.
            </p>
            <div className="max-w-4xl mx-auto mt-6 px-6 lg:max-w-2xl pb-20">
              <div className="flex justify-center items-center gap-4">
                {socialLinks.map((icon) => (
                  <a
                    key={icon.label}
                    href={icon.href || "#"}
                    aria-label={icon.label}
                    className="rounded-full h-6 w-6  transition"
                  >
                    <Image
                      src={icon.icon}
                      alt={`${icon.label} icon`}
                      width={22}
                      height={22}
                      className="opacity-80"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* add all media icons in below div */}
        </div>
      </div>
    </Chrome>
  );
}

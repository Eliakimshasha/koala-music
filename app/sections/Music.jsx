"use client";

import React, { useLayoutEffect, useRef } from "react";
import { IoIosPlay } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Music({ tracks }) {
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

      gsap.from(".music-player", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="music"
      ref={sectionRef}
      className="music-section section-stack relative pb-32 lg:pt-32  px-6 section-alt"
    >
      <div className="max-w-4xl mx-auto">
        
         <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-6 text-gradient">
          Latest Tracks
        </h2>
        <div className="splash-line mx-auto mb-16"></div>
        <div className="music-player music-panel">
          <div className="music-list">
            {tracks.map((track, i) => (
              <div key={i} className="music-row">
                <span className="music-icon" aria-hidden="true">
                  <IoIosPlay />
                </span>
                <span className="music-title">{track.title}</span>
                <span className="music-dots" aria-hidden="true"></span>
                <span className="music-duration">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

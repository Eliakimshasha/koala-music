"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chrome from "../components/Chrome";
import { navLinks, moreThanMusic } from "../data/siteData";

export default function MoreThanMusicPage() {
  const { title, subtitle } = moreThanMusic;
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".mtm-hero-copy > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.utils.toArray(".section-title").forEach((title) => {
        if (title.classList.contains("mtm-hero-title")) return;
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 90,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray(".mtm-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.05,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Chrome navLinks={navLinks}>
      <div ref={containerRef} className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="lg:pt-24 pt-16">
        

          <section className="section-stack relative lg:px-68 py-10 px-6">
            {/* <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-start"> */}
            <div className="max-w-7xl mx-auto grid  gap-10 items-start">
              <div>
              <h1 className="section-title text-center mtm-hero-title font-display text-5xl md:text-7xl font-bold text-gradient">
                  {title}
                </h1>
               
                <div className="mt-5 space-y-4 max-[900px]:text-[13px] text-center text-muted leading-relaxed">
                  <p>
                    Beyond music, Koala is a trained Biotechnologist with an
                    Ordinary Diploma from the Dar es Salaam Institute of
                    Technology, bringing a strong research and analytical
                    mindset to his work.
                  </p>
                  <p>
                    He is also a Digital Strategist, Creative Entrepreneur,
                    Brand Developer, and Project Coordinator, actively involved
                    in community-driven initiatives through Tanzania Bora
                    Initiative.
                  </p>
                  <p>
                    In addition, he serves as a Public Speaker, Youth Advocate,
                    Workshop Host, and Creative Director, combining leadership,
                    strategy, and social impact beyond the artistic space.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="mtm-card bg-surface rounded-xs text-center p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-center text-subtle mb-3">
                    Education + Research
                  </p>
                  <h3 className="text-2xl font-display font-semibold">
                    Biotechnology (DIT)
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Ordinary Diploma from Dar es Salaam Institute of Technology
                    with a research and analytical focus.
                  </p>
                </div>
                <div className="mtm-card bg-surface rounded-xs text-center p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-center text-subtle mb-3">
                    Strategy + Brand
                  </p>
                  <h3 className="text-2xl font-display font-semibold">
                    Digital + Creative Leadership
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Digital Strategist, Creative Entrepreneur, Brand Developer,
                    and Project Coordinator driving outcomes beyond the studio.
                  </p>
                </div>
                <div className="mtm-card bg-surface rounded-xs text-center p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-center text-subtle mb-3">
                    Community + Impact
                  </p>
                  <h3 className="text-2xl font-display font-semibold">
                    Tanzania Bora Initiative
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Public Speaker, Youth Advocate, Workshop Host, and Creative
                    Director focused on community-driven growth.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Chrome>
  );
}

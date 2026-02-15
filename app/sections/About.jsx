"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const splitTextInstances = [];

    const ctx = gsap.context(() => {
      const msgOne = document.querySelector(".msg-one");
      const msgTwo = document.querySelector(".msg-two");

      if (msgOne) {
        const firstText = SplitText.create(msgOne, { type: "chars" });
        splitTextInstances.push(firstText);
        gsap.to(firstText.chars, {
          color: "#AFD3A1",
          stagger: 0.02,
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".maini",
            start: "top 80%",
            end: "bottom 150%",
            scrub: 1.5,
          },
        });
      }

      if (msgTwo) {
        const secondText = SplitText.create(msgTwo, { type: "chars" });
        splitTextInstances.push(secondText);
        gsap.to(secondText.chars, {
          color: "#AFD3A1",
          stagger: 0.02,
          ease: "power1.in",
          scrollTrigger: {
            trigger: ".maini",
            start: "top 40%",
            end: "bottom 100%",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => {
      splitTextInstances.forEach((instance) => instance.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-stack noise2 bg-black relative py-0 lg:py-16 px-6"
    >
      <div className="tracking-[0.02em] maini flex flex-col items-center justify-center min-h-screen gap-9 px-8">
        <div className="relative overflow-hidden min-w-[280px] md:min-w-[500px] lg:flex-1 flex flex-col gap-8 justify-center items-center">
          <h1 className="font-bold msg-one uppercase text-6xl md:text-8xl text-center text-accent-faint tracking-tighter">
            More <br /> Than
          </h1>
          <div className="absolute top-1/2 z-20 -translate-y-1/2 left-1/2 min-w-fit -rotate-6 border-2 bg-accent border-strong px-4 py-2 -translate-x-1/2">
            <h1 className="font-bold uppercase text-4xl lg:text-8xl text-accent-contrast tracking-tighter">
              Music
            </h1>
          </div>
          <h1 className="font-bold msg-two lg:mt-16 mt-5 uppercase text-center text-6xl md:text-8xl text-msg-two tracking-tighter">
            Pure <br /> Feelings
          </h1>
        </div>
        <div className="text-center text-muted lg:max-w-2xl text-xs">
          Every release is built for late-night drives, slow dances, and the
          kind of honesty that sticks with you. Koala turns emotion into
          sound - pure, warm, unforgettable.
        </div>
      </div>
    </section>
  );
}

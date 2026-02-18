"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Split msg-one words and animate color on scroll
      const firstMsgSplit = SplitText.create(".msg-one", { type: "words" });
      gsap.to(firstMsgSplit.words, {
        color: "#AFD3A1",
        ease: "power1.in",
        stagger: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
          
        },
      });

      // Split msg-two words and animate color on scroll
      const secondMsgSplit = SplitText.create(".msg-two", { type: "words" });
      gsap.to(secondMsgSplit.words, {
        color: "#AFD3A1",
        ease: "power1.in",
        stagger: 1,
        scrollTrigger: {
          trigger: ".msg-two",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      // Clip-path reveal for .music heading (same as msg-text-scroll)
      gsap.to(".music-reveal", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.inOut",
        delay: 1,
        scrollTrigger: {
          trigger: ".music-reveal",
          start: "top 60%",
        },
      });

      // Split paragraph words and animate in
     
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-stack h-screen max-h-screen flex justify-center items-center noise2 bg-black relative py-0  px-6"
    >
      <div className="tracking-[0.02em]  maini flex flex-col items-center justify-center  gap-1 px-8">
        <div className="relative overflow-hidden min-w-70 md:min-w-125 lg:flex-1 flex flex-col gap-8 justify-center items-center">
          <h1 className="font-bold msg-one uppercase text-6xl md:text-8xl text-center text-accent-faint tracking-tighter">
            More <br /> Than
          </h1>
          {/* Clip-path reveal wrapper — same pattern as msg-text-scroll */}
          <div
            className="music-reveal absolute top-1/2 z-20 lg:-translate-y-24 -translate-y-20 left-1/2  min-w-fit -rotate-6 bg-accent border-2 border-black px-4 py-2 -translate-x-1/2"
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          >
            <h1 className="font-bold music uppercase text-4xl lg:text-8xl text-accent-contrast tracking-tighter">
              Music
            </h1>
          </div>
          <h1 className="font-bold msg-two lg:mt-8 text-accent-faint  uppercase text-center text-6xl md:text-8xl text-msg-two tracking-tighter">
            Pure <br /> Feelings
          </h1>
           <div className="text-center text-muted lg:max-w-2xl text-xs">
          Every release is built for late-night drives, slow dances, and the
          kind of honesty that sticks with you. Koala turns emotion into
          sound - pure, warm, unforgettable.
        </div>
        </div>
       
      </div>
    </section>
  );
}
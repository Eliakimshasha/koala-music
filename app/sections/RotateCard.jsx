"use client";

import React, { useRef } from "react";
import cardImage from "../../public/assets/images/alb2.jpg";
import toto1 from "../../public/assets/images/toto (1).jpeg";
import toto2 from "../../public/assets/images/toto (2).jpeg";
import toto3 from "../../public/assets/images/toto (3).jpeg";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LISTEN_NOW_HREF = "https://oneprm.link/245155137539";

function RotateCard() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);

  // Refs for the 5 small images
  const smallImg1 = useRef(null);
  const smallImg2 = useRef(null);
  const smallImg3 = useRef(null);
  const smallImg4 = useRef(null);
  const smallImg7 = useRef(null);
  const textContent = useRef(null);

  useGSAP(
    () => {
      gsap.set(cardRef3.current, { left: "-100px", xPercent: -50 });
      gsap.set(textContent.current, { opacity: "0" });

      // Set initial state for small images - centered, same size as main card, hidden
      gsap.set(
        [
          smallImg1.current,
          smallImg2.current,
          smallImg3.current,
          smallImg4.current,
          smallImg7.current,
        ],
        {
          width: "300px",
          height: "300px",
          top: "0",
          left: "0",
          opacity: 0, // Hidden initially
        },
      );

      // Create separate timelines for mobile and desktop
      let mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 768px)",
          // Up to 1023px only; desktop (>=1024px) shows ZoomGallery instead
          isDesktop: "(min-width: 769px) and (max-width: 1023px)",
        },
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 15%",
              end: "+=3000", // Extended for more animations
              scrub: true,
              pin: true,
            },
          });

          // "KOALA" slides in from the left and settles centred
          timeline.to(cardRef3.current, {
            left: "50%",
            duration: 1,
          });

          // First card rotates from 0 to 180 degrees (disappears)
          timeline.fromTo(
            cardRef.current,
            {
              rotateY: 0,
            },
            {
              rotateY: 180,
              duration: 1,
            },
          );

          // Second card rotates from 180 to 360 degrees (appears and completes rotation)
          timeline.fromTo(
            cardRef2.current,
            {
              rotateY: 180,
            },
            {
              rotateY: 360,
              duration: 1,
            },
            "<",
          );

          // Make small images visible at their initial centered position - AFTER rotation completes
          timeline.to(
            [
              smallImg1.current,
              smallImg2.current,
              smallImg3.current,
              smallImg4.current,
              smallImg7.current,
            ],
            {
              opacity: 1,
              duration: 0.3,
            },
          );

          // NOW all images shrink and move to their final positions SIMULTANEOUSLY

          // Main card shrinks and moves to center position
          timeline.to(
            cardRef2.current,
            {
              width: "100px",
              height: "100px",
              top: "120%",
              left: "60%",
              x: "-50%",
              y: "-50%",
              duration: 1,
            },
            "<",
          );

          timeline.to(
            textContent.current,

            {
              opacity: "1",
              duration: 1,
            },
            "-=1.5",
          );

          // Small image 1 - top left (FIXED POSITION)
          timeline.to(
            smallImg1.current,
            {
              width: "100px",
              height: "100px",
              top: "-100px",
              left: "5%",
              duration: 1,
            },
            "<",
          );

          // Small image 2 - top right (FIXED POSITION)
          timeline.to(
            smallImg2.current,
            {
              width: "100px",
              height: "100px",
              top: "30px",
              left: "13%",
              duration: 1,
            },
            "<",
          );

          // Small image 3 - bottom left (FIXED POSITION)
          timeline.to(
            smallImg3.current,
            {
              width: "100px",
              height: "100px",
              top: "-60px",
              left: "33%",
              duration: 1,
            },
            "<",
          );

          // Small image 4 - random position
          timeline.to(
            smallImg4.current,
            {
              width: "100px",
              height: "100px",
              top: "80%",
              left: "70%",
              duration: 1,
            },
            "<",
          );

          // Small image 7 - bottom position (mirrors image 3)
          timeline.to(
            smallImg7.current,
            {
              width: "100px",
              height: "100px",
              top: "130%",
              left: "15%",
              duration: 1,
            },
            "<",
          );
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-[60vh] flex lg:hidden items-center justify-center relative perspective-distant"
    >
      <div
        className="relative w-125 h-75 "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 5 Small Images - Start centered behind main card (z-30) */}
        <div
          ref={smallImg1}
          className="absolute inset-0 z-30"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={cardImage}
            alt="Small 1"
            fill
            className="object-cover rounded-xs shadow-xl"
          />
        </div>

        <div
          ref={smallImg2}
          className="absolute inset-0 z-33"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={toto1}
            alt="Small 2"
            fill
            className="object-cover object-[50%_20%] rounded-xs shadow-xl"
          />
        </div>

        <div
          ref={smallImg3}
          className="absolute inset-0 z-34"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={cardImage}
            alt="Small 3"
            fill
            className="object-cover rounded-xs shadow-xl"
          />
        </div>

        <div
          ref={smallImg4}
          className="absolute inset-0 z-32"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={toto2}
            alt="Small 4"
            fill
            className="object-cover object-[50%_20%] rounded-xs shadow-xl"
          />
        </div>

        <div
          ref={smallImg7}
          className="absolute inset-0 z-40"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={cardImage}
            alt="Small 7"
            fill
            className="object-cover rounded-xs shadow-xl"
          />
        </div>

        {/* First Card */}
        <div
          ref={cardRef}
          className="absolute inset-0 z-40 w-full h-full backface-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={cardImage}
            alt="Card 1"
            fill
            className="object-cover  shadow-2xl"
          />
        </div>

        {/* Second Card */}
        <div
          ref={cardRef2}
          className="absolute inset-0 z-40 w-full h-full backface-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={toto3}
            alt="Card 2"
            fill
            className="object-cover object-[50%_20%]  shadow-2xl"
          />
        </div>
      </div>

      <div
        ref={cardRef3}
        className="absolute top-1/3 transform -translate-y-1/9 mt-15 text-2xl font-semibold z-50"
      >
        KOALA
      </div>
      <div
        ref={textContent}
        className="absolute top-1/2 transform -translate-y-1/2 mt-14 w-[90%] mx-auto text-center text-xs lg:text-sm z-50"
      >
        <p className="lg:max-w-[420px] text-center mx-auto lg:mt-9">
          Koala blends R&B, Afro soul, Afrobeats, Amapiano, Jazz, and Indie into
          warm, late-night soundscapes that hit straight to the heart.
        </p>
        <a
          href={LISTEN_NOW_HREF}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-white rounded-xs mt-1 py-1 px-3 text-center text-black/50"
        >
          LISTEN NOW
        </a>
      </div>
    </section>
  );
}

export default RotateCard;

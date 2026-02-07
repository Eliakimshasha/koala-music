"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
// import logo from "../../public/assets/images/black.png";
import logo from "../../public/assets/images/green.png";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-subtle bg-black shadow-[0_0_20px_-12px_rgba(0, 0, 0, 0.86)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function Connect({ socialLinks }) {
  const containerRef = useRef(null);
  const leftTopRef = useRef(null);
  const leftMidRef = useRef(null);
  const leftBottomRef = useRef(null);
  const rightTopRef = useRef(null);
  const rightMidRef = useRef(null);
  const rightBottomRef = useRef(null);
  const centerRef = useRef(null);

  const icons = socialLinks.slice(0, 6);

  return (
    <section className="section-stack relative pb-32 lg:pt-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-12 text-accent">
          Connect
        </h2>
        <div
          ref={containerRef}
          className="relative flex h-[320px] w-full items-center justify-center overflow-hidden"
        >
          <div className="flex size-full max-h-[220px] max-w-xl flex-col items-stretch justify-between gap-8">
            <div className="flex flex-row items-center justify-between">
              <a href={icons[0]?.href || "#"} className="social-link">
                <Circle ref={leftTopRef}>
                  {icons[0] && (
                    <Image
                      src={icons[0].icon}
                      alt={icons[0].label}
                      width={26}
                      height={26}
                      className="opacity-90"
                    />
                  )}
                </Circle>
              </a>
              <a href={icons[1]?.href || "#"} className="social-link">
                <Circle ref={rightTopRef}>
                  {icons[1] && (
                    <Image
                      src={icons[1].icon}
                      alt={icons[1].label}
                      width={26}
                      height={26}
                      className="opacity-90"
                    />
                  )}
                </Circle>
              </a>
            </div>
            <div className="flex flex-row items-center justify-between">
              <a href={icons[2]?.href || "#"} className="social-link">
                <Circle ref={leftMidRef}>
                  {icons[2] && (
                    <Image
                      src={icons[2].icon}
                      alt={icons[2].label}
                      width={26}
                      height={26}
                      className="opacity-90"
                    />
                  )}
                </Circle>
              </a>
              <Circle
                ref={centerRef}
                className="h-16 w-16 border-strong bg-black"
              >
                <Image
                  src={logo}
                  alt="Koala logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </Circle>
              <a href={icons[3]?.href || "#"} className="social-link">
                <Circle ref={rightMidRef}>
                  {icons[3] && (
                    <Image
                      src={icons[3].icon}
                      alt={icons[3].label}
                      width={26}
                      height={26}
                      className="opacity-90"
                    />
                  )}
                </Circle>
              </a>
            </div>
            <div className="flex flex-row items-center justify-between">
              <a href={icons[4]?.href || "#"} className="social-link">
                <Circle ref={leftBottomRef}>
                  {icons[4] && (
                    <Image
                      src={icons[4].icon}
                      alt={icons[4].label}
                      width={26}
                      height={26}
                      className="opacity-90"
                    />
                  )}
                </Circle>
              </a>
              <a href={icons[5]?.href || "#"} className="social-link">
                <Circle ref={rightBottomRef}>
                  {icons[5] && (
                    <Image
                      src={icons[5].icon}
                      alt={icons[5].label}
                      width={26}
                      height={26}
                      className="opacity-90"
                    />
                  )}
                </Circle>
              </a>
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftTopRef}
            toRef={centerRef}
            curvature={-75}
            endYOffset={-10}
            pathColor="var(--border)"
            gradientStartColor="var(--accent)"
            gradientStopColor="var(--accent)"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftMidRef}
            toRef={centerRef}
            pathColor="var(--border)"
            gradientStartColor="var(--accent)"
            gradientStopColor="var(--accent)"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftBottomRef}
            toRef={centerRef}
            curvature={75}
            endYOffset={10}
            pathColor="var(--border)"
            gradientStartColor="var(--accent)"
            gradientStopColor="var(--accent)"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={rightTopRef}
            toRef={centerRef}
            curvature={-75}
            endYOffset={-10}
            reverse
            pathColor="var(--border)"
            gradientStartColor="var(--accent)"
            gradientStopColor="var(--accent)"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={rightMidRef}
            toRef={centerRef}
            reverse
            pathColor="var(--border)"
            gradientStartColor="var(--accent)"
            gradientStopColor="var(--accent)"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={rightBottomRef}
            toRef={centerRef}
            curvature={75}
            endYOffset={10}
            reverse
            pathColor="var(--border)"
            gradientStartColor="var(--accent)"
            gradientStopColor="var(--accent)"
          />
        </div>
      </div>
    </section>
  );
}

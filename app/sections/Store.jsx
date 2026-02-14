"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Store({ products, enableMobileSlider = false }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!enableMobileSlider) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const slider = track.parentElement;

        const getScrollAmount = () => {
          const lastCard = track.lastElementChild;
          if (!lastCard || !slider) return 0;

          const currentX = gsap.getProperty(track, "x");
          gsap.set(track, { x: 0 });

          const sliderRect = slider.getBoundingClientRect();
          const lastCardRect = lastCard.getBoundingClientRect();

          const base = Math.max(0, lastCardRect.right - sliderRect.right);
          const tail = Math.max(16, sliderRect.width * 0.38);
          const amount = base + tail;

          gsap.set(track, { x: currentX });
          return amount;
        };

        if (getScrollAmount() <= 0) return;

        const moveTween = gsap.to(track, {
          x: () => `-${getScrollAmount()}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}px`,
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const handleLoad = () => ScrollTrigger.refresh();

        const resizeObserver = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });

        resizeObserver.observe(track);
        if (slider) resizeObserver.observe(slider);

        if (document.readyState === "complete") {
          handleLoad();
        } else {
          window.addEventListener("load", handleLoad);
        }

        return () => {
          window.removeEventListener("load", handleLoad);
          resizeObserver.disconnect();
          moveTween.scrollTrigger?.kill();
          moveTween.kill();
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [enableMobileSlider]);

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

      gsap.utils.toArray(".store-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const gridClassName = enableMobileSlider
    ? "store-track relative flex flex-row flex-nowrap gap-6 pr-6 md:pr-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
    : "store-track flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8";

  const itemClassName = enableMobileSlider
    ? "store-item card-hover cursor-pointer flex-none w-[76vw] sm:w-[60vw] md:w-auto"
    : "store-item card-hover cursor-pointer";

  return (
    <section
      id="store"
      ref={sectionRef}
      className={`section-stack  section-alt relative pb-32 pt-32 px-6 ${
        enableMobileSlider ? "min-h-screen md:min-h-0" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-16">
          <h2 className="section-title font-display text-6xl md:text-8xl font-bold text-gradient">
            Store
          </h2>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 border border-subtle px-5 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
          >
            <IoIosArrowRoundForward className="h-5 w-5" />
            View More
          </Link>
        </div>

        <div
          className={
            enableMobileSlider
              ? "store-slider overflow-hidden md:overflow-visible"
              : undefined
          }
        >
          <div ref={trackRef} className={gridClassName}>
            {products.slice(0, 3).map((product, i) => (
              <div key={i} className={itemClassName}>
                <div className="relative aspect-square rounded-xs mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-accent font-bold">{product.price}</p>
                  </div>
                  <button className="btn-cart-inline">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="mt-0.5">Buy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-subtle hover-text-accent transition"
          >
            See More
            <IoIosArrowRoundForward className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

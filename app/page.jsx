"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

import Chrome from "./components/Chrome";
import SplashScreen from "./components/SplashScreen";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Albums from "./sections/Albums";
import Music from "./sections/Music";
import Videos from "./sections/Videos";
import LiveShows from "./sections/LiveShows";
import Lifestyle from "./sections/Lifestyle";
import Store from "./sections/Store";
import ComingSoon from "./sections/ComingSoon";
import Connect from "./sections/Connect";
import Footer from "./sections/Footer";
import {
  navLinks,
  albums,
  tracks,
  videos,
  liveShows,
  lifestylePosts,
  products,
  socialLinks,
  comingSoon,
} from "./data/siteData";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function KoalaWebsite() {
  const containerRef = useRef(null);
  const albumScrollRef = useRef(null);

  useEffect(() => {
    const splitTextInstances = [];
    const ctx = gsap.context(() => {
      // Smooth scrolling setup
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      // Hero intro animation
      const heroIntro = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      heroIntro
        .from(".hero-bg", { scale: 1.08, opacity: 0, duration: 1.4 })
        .from(".hero-vibe", { y: 40, opacity: 0, duration: 1 }, "-=1.1")
        .from(".hero-orb", { scale: 0.7, opacity: 0, stagger: 0.15 }, "-=1.1")
        .from(
          ".hero-koala-text",
          { y: 20, opacity: 0, letterSpacing: "0.6em" },
          "-=0.9",
        )
        .from(".hero-title", { y: 60, opacity: 0 }, "-=0.8")
        .from(".hero-subtitle", { y: 24, opacity: 0 }, "-=0.7")
        .from(".hero-actions", { y: 20, opacity: 0 }, "-=0.6");

      // Pin hero and let content slide above it
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        endTrigger: "#about",
        end: "top top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          endTrigger: "#about",
          end: "top top",
          scrub: true,
        },
        y: -80,
        scale: 0.92,
        opacity: 0.35,
      });

      gsap.to(".hero-bg", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          endTrigger: "#about",
          end: "top top",
          scrub: true,
        },
        scale: 1.2,
        opacity: 0.4,
      });

      gsap.to(".hero-spotlight", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          endTrigger: "#about",
          end: "top top",
          scrub: true,
        },
        scale: 1.4,
        opacity: 0.2,
        y: -120,
      });

      gsap.to(".hero-section", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          end: "top 30%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".hero-orb", {
        y: -18,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1.2,
      });

      // Staggered reveal for section titles
      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      // Album cards parallax
      gsap.utils.toArray(".album-card").forEach((card, i) => {
        const speed = 1 + (i % 3) * 0.3;
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: (i) => i * -50 * speed,
        });
      });

      // Music player reveal
      gsap.from(".music-player", {
        scrollTrigger: {
          trigger: ".music-section",
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Video grid animations
      gsap.utils.toArray(".video-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });

      // Pin videos when "See More" reaches the bottom; let Live Shows pass above
      if (
        document.querySelector("#videos") &&
        document.querySelector("#live-shows")
      ) {
        ScrollTrigger.create({
          trigger: "#videos",
          start: "bottom bottom",
          endTrigger: "#live-shows",
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      // Store items reveal
      gsap.utils.toArray(".store-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Pin store when the bottom marker appears; let Coming Soon pass above
      const storeSection = document.querySelector("#store");
      const comingSoonSection = document.querySelector("#coming-soon");
      const storePinTrigger = document.querySelector("#store .gsap-reference");

      if (storeSection && comingSoonSection && storePinTrigger) {
        ScrollTrigger.create({
          trigger: storePinTrigger,
          start: "top bottom",
          endTrigger: comingSoonSection,
          end: "top top",
          pin: storeSection,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      // About text: character-by-character color reveal
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

      // Social links floating animation
      gsap.to(".social-link", {
        y: -10,
        duration: 2,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Parallax background elements
      gsap.to(".parallax-slow", {
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: (i, el) =>
          (1 - parseFloat(el.getAttribute("data-speed"))) *
          ScrollTrigger.maxScroll(window),
      });
    }, containerRef);

    return () => {
      splitTextInstances.forEach((instance) => instance.revert());
      ctx.revert();
    };
  }, []);

  const scrollAlbums = (direction) => {
    if (!albumScrollRef.current) return;
    const container = albumScrollRef.current;
    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <Chrome navLinks={navLinks}>
      <div ref={containerRef} className="bg-base main-one text-base-color overflow-hidden">
        <SplashScreen />
        <div className="noise"></div>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Hero />
            <About />
            <Albums
              albums={albums}
              scrollRef={albumScrollRef}
              onPrev={() => scrollAlbums(-1)}
              onNext={() => scrollAlbums(1)}
            />
            <Music tracks={tracks} />
            <Videos videos={videos} />
            <LiveShows shows={liveShows} />
            <Lifestyle posts={lifestylePosts} />
            <Store products={products} enableMobileSlider />
            <ComingSoon data={comingSoon} />
            <Connect socialLinks={socialLinks} />
            <Footer />
          </div>
        </div>
      </div>
    </Chrome>
  );
}

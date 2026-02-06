"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import vibe from "../public/assets/images/vibing2.png";
import product1 from "../public/assets/images/prod1.jpg";
import product2 from "../public/assets/images/prod2.jpg";
import product3 from "../public/assets/images/prod3.jpg";
import product4 from "../public/assets/images/prod4.jpg";
import product5 from "../public/assets/images/prod5.jpg";
import album1 from "../public/assets/images/alb1.jpeg";
import album2 from "../public/assets/images/alb2.jpeg";
import album3 from "../public/assets/images/alb3.jpeg";
import album4 from "../public/assets/images/alb4.jpeg";
import iconApple from "../public/assets/images/apple.png";
import iconSpotify from "../public/assets/images/spotify.png";
import iconTikTok from "../public/assets/images/tiktok.png";
import iconTwitter from "../public/assets/images/twitter.png";
import iconYouTube from "../public/assets/images/youtube.png";
import iconInstagram from "../public/assets/images/social.png";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function KoalaWebsite() {
  const containerRef = useRef(null);
  const albumScrollRef = useRef(null);
  const heroRef = useRef(null);
  const [activeAlbum, setActiveAlbum] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
        autoAlpha: 0,
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
            toggleActions: "play none none reverse",
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
          toggleActions: "play none none reverse",
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
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });

      // Store items reveal
      gsap.utils.toArray(".store-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // About text: word-by-word color reveal
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

      // Story text: word-by-word reveal on scroll
      const splitWords = (element) => {
        if (!element || element.dataset.split === "true") return;
        const words = element.textContent.trim().split(/\s+/);
        element.textContent = "";
        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.className = "story-word";
          span.textContent = word + (index < words.length - 1 ? " " : "");
          element.appendChild(span);
        });
        element.dataset.split = "true";
      };

      gsap.utils.toArray(".story-text").forEach((paragraph) => {
        splitWords(paragraph);
        const words = paragraph.querySelectorAll(".story-word");
        gsap.from(words, {
          scrollTrigger: {
            trigger: paragraph,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
          opacity: 0,
          y: 20,
          stagger: 0.03,
          ease: "power2.out",
        });
      });

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      }
    };
  }, [menuOpen]);

  const scrollAlbums = (direction) => {
    if (!albumScrollRef.current) return;
    const container = albumScrollRef.current;
    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  const navLinks = [
    { label: "MUSIC", href: "#music" },
    { label: "VIDEOS", href: "#videos" },
    { label: "STORE", href: "#store" },
    { label: "ABOUT", href: "#about" },
  ];

  const albums = [
    {
      title: "Feelings Collection",
      year: "2024",
      image: album1,
      tracks: 12,
    },
    {
      title: "Deep Vibes",
      year: "2023",
      image: album2,
      tracks: 10,
    },
    {
      title: "Life Sessions",
      year: "2023",
      image: album3,
      tracks: 8,
    },
    {
      title: "Kitu Wrong EP",
      year: "2022",
      image: album4,
      tracks: 6,
    },
  ];

  const tracks = [
    { title: "Kitu Wrong", duration: "3:45", plays: "1.2M" },
    { title: "I Move On", duration: "4:12", plays: "890K" },
    { title: "Happiness", duration: "3:28", plays: "1.5M" },
    { title: "Ya Kesho", duration: "3:56", plays: "750K" },
    { title: "More Than Music", duration: "4:34", plays: "2.1M" },
  ];

  const videos = [
    {
      title: "Kitu Wrong (Official Video)",
      views: "2.3M",
      image: product5,
    },
    {
      title: "Studio Sessions Vol. 1",
      views: "560K",
      image: product5,
    },
    {
      title: "Live at Mlimani City",
      views: "1.1M",
      image: product5,
    },
    { title: "Behind The Scenes", views: "430K", image: product5 },
  ];

  const products = [
    { name: "Feelings T-Shirt", price: "35,000 TZS", image: product1 },
    { name: "Deep Hoodie", price: "75,000 TZS", image: product2 },
    { name: "Life Cap", price: "25,000 TZS", image: product3 },
    {
      name: "Koala Tote Bag",
      price: "30,000 TZS",
      image: product4,
    },
  ];

  const socialLinks = [
    { label: "Instagram", href: "#", icon: iconInstagram },
    { label: "Twitter", href: "#", icon: iconTwitter },
    { label: "YouTube", href: "#", icon: iconYouTube },
    { label: "Spotify", href: "#", icon: iconSpotify },
    { label: "Apple Music", href: "#", icon: iconApple },
    { label: "TikTok", href: "#", icon: iconTikTok },
  ];

  const renderVideoMeta = (video, size = "sm") => {
    const titleSize =
      size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
    const viewsSize = size === "lg" ? "text-base" : "text-sm";

    return (
      <div className="mt-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gray-500">
            Video
          </p>
          <h3 className={`${titleSize} font-display font-semibold`}>
            {video.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gray-500">
            Views
          </p>
          <p className={`${viewsSize} font-semibold text-[#AFD3A1]`}>
            {video.views}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="bg-[#000000] text-white overflow-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap");

        * {
          box-sizing: border-box;
        }

        body {
          font-family: "Space Grotesk", sans-serif;
          background: #000000;
          color: white;
          overflow-x: hidden;
        }

        .font-display {
          font-family: "Instrument Serif", serif;
        }

        .text-gradient {
          background: linear-gradient(135deg, #afd3a1 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-effect {
          text-shadow:
            0 0 20px rgba(175, 211, 161, 0.5),
            0 0 40px rgba(175, 211, 161, 0.3);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(175, 211, 161, 0.3);
        }

        .noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 9999;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .section-stack {
          position: relative;
          z-index: 20;
        }

        .hero-spotlight {
          background: radial-gradient(
            circle at 30% 20%,
            rgba(175, 211, 161, 0.45),
            rgba(0, 0, 0, 0) 60%
          );
          mix-blend-mode: screen;
          opacity: 0.6;
          transform-origin: center;
        }

        .story-word {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>

      <div className="noise"></div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-2xl font-display font-bold text-[#AFD3A1]">
                KOALA
              </div>
              <div className="hidden md:flex gap-8 text-sm tracking-wider">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-[#AFD3A1] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <button
                type="button"
                className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="flex flex-col gap-1.5">
                  <span
                    className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                      menuOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                      menuOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                  ></span>
                </span>
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div
            id="mobile-nav"
            className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
              menuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!menuOpen}
          >
            <div
              className={`absolute inset-0 bg-[#AFD3A1] text-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "translate-y-0" : "translate-y-full"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close menu"
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:border-black/40"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-xl">×</span>
              </button>
              <div className="h-full overflow-y-auto px-6 pb-12 pt-24">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.45em] text-black/60">
                  <span>Navigation</span>
                  <span className="tracking-wide">Swipe or tap</span>
                </div>
                <div className="mt-12 flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between border-b border-black/10 py-5 transition hover:border-black/40"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-xs uppercase tracking-[0.4em] text-black/50">
                          0{index + 1}
                        </span>
                        <span className="font-display text-2xl tracking-[0.2em]">
                          {link.label}
                        </span>
                      </div>
                      <span className="text-lg text-black/50 transition group-hover:text-black">
                        →
                      </span>
                    </a>
                  ))}
                </div>
                <div className="mt-10 flex items-center justify-between  pt-6">
                  <a
                    href="#music"
                    className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-[#AFD3A1] transition hover:scale-105"
                    onClick={() => setMenuOpen(false)}
                  >
                    Listen Now
                  </a>
                  <span className="text-xs uppercase tracking-[0.3em] text-black/60">
                    KOALA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section className="hero-section relative h-screen flex items-center relative justify-center overflow-hidden z-10">
            <div className="hero-vibe absolute bottom-0 left-0 w-full h-36  z-30">
              <Image
                src={vibe}
                alt="Koala Hero"
                fill
                className=" w-auto h-full absolute z-0 "
              />
            </div>
            <div className="hero-bg absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#AFD3A1] opacity-50"></div>
            <div className="hero-spotlight absolute inset-0"></div>

            {/* Parallax circles */}
            <div
              className="hero-orb parallax-slow absolute top-20 left-10 w-96 h-96 bg-[#AFD3A1] rounded-full blur-3xl opacity-20"
              data-speed="0.3"
            ></div>
            <div
              className="hero-orb parallax-slow absolute bottom-20 right-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-10"
              data-speed="0.5"
            ></div>

            <div className="relative z-40 text-center px-6">
              <div className="hero-koala-text text-[#AFD3A1] text-xl tracking-[0.3em] mb-6 font-light">
                KOALA
              </div>
              <h1 className="hero-title font-display text-7xl md:text-9xl font-bold mb-8 glow-effect">
                MORE
                <br />
                THAN
                <br />
                MUSIC
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
                Pure Feeling. Raw Passion. Unforgettable Sound.
              </p>
              <div className="hero-actions mt-12 flex gap-6 justify-center">
                <button className="relative z-40 lg:px-8 px-5 py-4 bg-[#AFD3A1] text-black font-semibold tracking-wider hover:scale-105 transition-transform">
                  LISTEN NOW
                </button>
                <button className="relative z-40 lg:px-8 px-5 py-4 border-2 border-white/30 hover:border-[#AFD3A1] hover:text-[#AFD3A1] transition-all">
                  EXPLORE
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="section-stack relative  py-32  bg-gradient-to-b from-black to-[#0a0a0a]"
          >
            <div className="tracking-[0.02em] maini flex flex-col items-center justify-center min-h-screen gap-0 lg:gap-9 px-8">
           
              <div className="relative overflow-hidden min-w-[500px]  flex-1 flex flex-col  gap-8 justify-center items-center">
                <h1 className="font-bold msg-one uppercase lg:text-8xl text-6xl text-center text-[#AFD3A1]/10 tracking-tighter">
                  More <br /> Than
                </h1>
                <div className="absolute top-[50%] lg:top-[50%] z-20  -translate-y-1/2 left-1/2 min-w-fit -rotate-6 border-3 bg-[#AFD3A1] border-black/20 px-4 py-2  -translate-x-1/2 ">
                  <h1 className="font-bold uppercase text-4xl lg:text-8xl text-black tracking-tighter">
                    Music
                  </h1>
                </div>
                <h1 className="font-bold msg-two lg:mt-16 mt-5 uppercase text-center lg:text-8xl text-6xl text-white tracking-tighter">
                  Pure <br /> Feelings
                </h1>
              </div>
              <div className="text-center text-white/70">
                Every release is built for late-night drives, slow dances, and
                the kind of honesty that sticks with you. Koala turns emotion
                into sound—pure, warm, unforgettable.
              </div>
            </div>
          </section>
          {/* <section
            id="about"
            className="section-stack relative  py-32 px-6 bg-gradient-to-b from-black to-[#0a0a0a]"
          >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
             <div>
               <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-16 text-gradient">
                The Story
              </h2>
                <div className="space-y-6 lg:text-lg text-[14px] text-gray-300 leading-relaxed">
                  <p className=''>
                    Koala isn't just an artist, he's a storyteller, a spiritual
                    being, and a creator. He believes in love, in feeling
                    deeply, and in channeling those emotions into music that
                    speaks straight to the soul.
                  </p>
                  <p>
                    With a smooth yet slightly raspy voice that carries raw
                    passion, he makes you stop and ask, "Who is that?" and once
                    you hear him, you won't forget.
                  </p>
                  <p>
                    For over five years, Koala has been crafting his sound,
                    blending R&B/soul, Afrosoul, Afrobeats, Amapiano, Jazz, and
                    Indie to create something uniquely his own.
                  </p>
                </div>
             </div>
            
              
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-[#AFD3A1] to-[#000000] rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-9xl font-display">
                      K
                    </div>
                  </div>
              </div>
            </div>
          </section> */}

          {/* Albums Section */}
          <section id="albums" className="section-stack relative  py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between gap-6 mb-12 md:mb-16">
                <h2 className="section-title font-display text-6xl md:text-8xl font-bold text-[#AFD3A1]">
                  Albums
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous albums"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:text-[#AFD3A1] hover:border-[#AFD3A1] transition"
                    onClick={() => scrollAlbums(-1)}
                  >
                    <IoIosArrowDropleft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next albums"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:text-[#AFD3A1] hover:border-[#AFD3A1] transition"
                    onClick={() => scrollAlbums(1)}
                  >
                    <IoIosArrowDropright className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div
                ref={albumScrollRef}
                className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
              >
                {albums.map((album, i) => (
                  <div
                    key={i}
                    className="album-card card-hover cursor-pointer min-w-[240px] sm:min-w-[280px] md:min-w-[320px] snap-start"
                  >
                    <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={album.image}
                        alt={album.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 70vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/35"></div>
                      <div className="absolute bottom-4 left-4 text-2xl font-display text-white/80">
                        {album.year}
                      </div>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {album.title}
                    </h3>
                    <p className="text-gray-400">
                      {album.tracks} tracks • {album.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Music Section */}
          <section
            id="music"
            className="music-section section-stack relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-black"
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
                Latest Tracks
              </h2>
              <div className="music-player bg-white/5 backdrop-blur-lg rounded-2xl lg:px-8 lg:py-8 px-3 border border-white/10">
                {tracks.map((track, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-all px-4 rounded group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#AFD3A1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-5 h-5 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">
                          {track.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {track.plays} plays
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400">{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Videos Section */}
          <section id="videos" className="section-stack relative py-32  px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-[#AFD3A1]">
                Videos
              </h2>
              {/* Mobile layout */}
              <div className="grid gap-8 md:hidden">
                {videos.map((video, i) => (
                  <div key={i} className="video-item cursor-pointer group">
                    <div className="aspect-video rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                      <Image
                        src={video.image}
                        alt={video.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all"></div>
                      <svg
                        className="w-20 h-20 text-white group-hover:scale-125 transition-transform relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {renderVideoMeta(video, "sm")}
                  </div>
                ))}
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                  <div className="video-item cursor-pointer group">
                    <div className="relative min-h-[360px] rounded-lg overflow-hidden">
                      <Image
                        src={videos[0].image}
                        alt={videos[0].title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
                      <svg
                        className="absolute left-6 bottom-6 w-16 h-16 text-white group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {renderVideoMeta(videos[0], "lg")}
                  </div>
                  <div className="video-item cursor-pointer group">
                    <div className="relative min-h-[180px] rounded-lg overflow-hidden">
                      <Image
                        src={videos[3].image}
                        alt={videos[3].title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
                      <svg
                        className="absolute left-5 bottom-5 w-12 h-12 text-white group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {renderVideoMeta(videos[3], "sm")}
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="video-item cursor-pointer group">
                    <div className="relative min-h-[180px] rounded-lg overflow-hidden">
                      <Image
                        src={videos[1].image}
                        alt={videos[1].title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
                      <svg
                        className="absolute left-5 bottom-5 w-12 h-12 text-white group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {renderVideoMeta(videos[1], "sm")}
                  </div>
                  <div className="video-item cursor-pointer group">
                    <div className="relative min-h-[360px] rounded-lg overflow-hidden">
                      <Image
                        src={videos[2].image}
                        alt={videos[2].title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
                      <svg
                        className="absolute left-6 bottom-6 w-16 h-16 text-white group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    {renderVideoMeta(videos[2], "lg")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Store Section */}
          <section
            id="store"
            className="section-stack relative  py-32 px-6 bg-gradient-to-b from-black to-[#0a0a0a]"
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
                Store
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, i) => (
                  <div key={i} className="store-item card-hover cursor-pointer">
                    <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#AFD3A1] font-bold">{product.price}</p>
                    <button className="w-full mt-4 py-3 border border-white/20 hover:bg-[#AFD3A1] hover:text-black hover:border-[#AFD3A1] transition-all tracking-wider">
                      ADD TO CART
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Coming Soon Section */}
          <section className="section-stack relative py-32 pt-1 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-6">
                  Coming Soon
                </div>
                <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-8 text-gradient">
                  Limited Drop
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                  A new capsule designed for late nights and long drives. Clean
                  silhouettes, elevated textures, and a quiet signature.
                </p>
                <div className="mt-10 flex gap-4">
                  <button className="lg:px-8 px-6 py-4 bg-[#AFD3A1] text-black font-semibold tracking-wider hover:scale-105 transition-transform">
                    Notify Me
                  </button>
                  <button className="lg:px-8 px-6 py-4 border-2 border-white/30 hover:border-[#AFD3A1] hover:text-[#AFD3A1] transition-all">
                    Get the Look
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-10 -right-6 w-32 h-32 rounded-full bg-[#AFD3A1] blur-3xl opacity-30"></div>
                <div className="relative aspect-[6/5] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={product5}
                    alt="Coming soon collection preview"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Social Media Section */}
          <section className="section-stack relative  py-32 pt-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-16 text-[#AFD3A1]">
                Connect
              </h2>
              <div className="flex justify-center gap-8 flex-wrap">
                {socialLinks.map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    className="social-link group"
                  >
                    <div className="w-20 h-20 bg-white/5 hover:bg-[#AFD3A1] rounded-full flex items-center justify-center border border-white/10 hover:border-[#AFD3A1] transition-all">
                      <Image
                        src={platform.icon}
                        alt={`${platform.label} icon`}
                        width={28}
                        height={28}
                        className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400 group-hover:text-[#AFD3A1] transition-colors">
                      {platform.label}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="section-stack relative py-16 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-display font-bold text-[#AFD3A1] mb-4">
                    KOALA
                  </div>
                  <p className="text-gray-400">
                    More Than Music. Pure Feeling.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <div className="space-y-2 text-gray-400">
                    <div>
                      <a
                        href="#music"
                        className="hover:text-[#AFD3A1] transition-colors"
                      >
                        Music
                      </a>
                    </div>
                    <div>
                      <a
                        href="#videos"
                        className="hover:text-[#AFD3A1] transition-colors"
                      >
                        Videos
                      </a>
                    </div>
                    <div>
                      <a
                        href="#store"
                        className="hover:text-[#AFD3A1] transition-colors"
                      >
                        Store
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Newsletter</h4>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#AFD3A1]"
                    />
                    <button className="px-6 py-2 bg-[#AFD3A1] text-black font-semibold hover:scale-105 transition-transform">
                      →
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm">
                © 2024 Koala. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

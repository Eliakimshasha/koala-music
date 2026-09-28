"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LISTEN_NOW_HREF = "https://oneprm.link/245155137539";

// Zoom-parallax mosaic, ported from the Ephod Trust Events "Moments" section.
// Each photo sits in a full-size layer that scales around the viewport centre,
// so off-centre photos fly outward while the centre photo grows to fill the
// screen. Desktop only (>=1024px); mobile keeps RotateCard.
const photos = [
  // Centre photo: grows from 25vh x 25vw to half the screen (scale 2), not full screen
  { src: "/assets/images/moments/man6.jpg", alt: "Koala singing and playing guitar at sunset", box: "h-[25vh] w-[25vw]", scale: 2 },
  { src: "/assets/images/moments/man5.jpg", alt: "Street guitarist smiling in a crowd", box: "-top-[30vh] left-[5vw] h-[30vh] w-[35vw]", scale: 5 },
  { src: "/assets/images/moments/man2.jpg", alt: "Guitarist performing", box: "-top-[10vh] -left-[25vw] h-[45vh] w-[20vw]", scale: 6 },
  { src: "/assets/images/moments/safe-space.jpg", alt: "Safe Space cover art", box: "left-[27.5vw] h-[25vh] w-[25vw]", scale: 5 },
  { src: "/assets/images/moments/alb2.jpg", alt: "Koala with an acoustic guitar", box: "top-[27.5vh] left-[5vw] h-[25vh] w-[20vw]", scale: 6 },
  { src: "/assets/images/moments/man4.jpg", alt: "Musician on stage", box: "top-[27.5vh] -left-[22.5vw] h-[25vh] w-[30vw]", scale: 8 },
  { src: "/assets/images/moments/main-on-and-off.jpg", alt: "On and Off cover art", box: "top-[22.5vh] left-[25vw] h-[15vh] w-[15vw]", scale: 9 },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// `footer` renders just below the centre photo and fades in with the caption.
export default function ZoomGallery({ footer = null }) {
  const rootRef = useRef(null);
  const pinRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (prefersReducedMotion()) {
          gsap.set(".zoom-shade, .zoom-caption > *, .zoom-footer", { autoAlpha: 1 });
          return;
        }
        const layers = gsap.utils.toArray(".zoom-layer", pinRef.current);
        gsap
          .timeline({
            scrollTrigger: { trigger: pinRef.current, start: "top top", end: "+=220%", pin: true, scrub: 1 },
          })
          .to(layers, { scale: (i) => photos[i].scale, ease: "power1.in", duration: 1 }, 0)
          // Surrounding photos fade out as they fly off, leaving only the centre photo
          .to(layers.slice(1), { autoAlpha: 0, ease: "power1.in", duration: 0.55 }, 0.4)
          .to(".zoom-shade", { autoAlpha: 1, duration: 0.25 }, 0.72)
          .fromTo(".zoom-caption > *", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.25 }, 0.78)
          .fromTo(".zoom-footer", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25 }, 0.9);
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="hidden lg:block">
      <div ref={pinRef} className="relative h-screen overflow-hidden bg-black">
        {photos.map((photo, i) => (
          <div key={photo.src} className="zoom-layer absolute inset-0 flex items-center justify-center will-change-transform">
            <div className={`relative overflow-hidden ${photo.box}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "100vw" : "40vw"}
                quality={i === 0 ? 90 : 75}
                className="object-cover"
              />
              {i === 0 && (
                <div className="zoom-shade pointer-events-none invisible absolute inset-0 bg-linear-to-b from-black/30 via-black/55 to-black/75 opacity-0" />
              )}
            </div>
          </div>
        ))}

        {/* Caption sized to sit inside the half-screen centre photo */}
        <div className="zoom-caption absolute left-1/2 top-1/2 flex h-[50vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center px-10 text-center">
          <p className="invisible text-xs uppercase tracking-[0.5em] text-accent opacity-0">Koala Music</p>
          <h3 className="invisible mt-4 font-display text-[clamp(2rem,3.4vw,3.5rem)] uppercase leading-none opacity-0">
            Warm, late-night soundscapes
          </h3>
          <p className="invisible mt-4 max-w-md text-sm text-muted opacity-0">
            Koala blends R&B, Afro soul, Afrobeats, Amapiano, Jazz, and Indie into
            warm, late-night soundscapes that hit straight to the heart.
          </p>
          <a
            href={LISTEN_NOW_HREF}
            target="_blank"
            rel="noreferrer"
            className="invisible mt-6 bg-accent px-6 py-3 text-sm font-semibold tracking-wider text-accent-contrast opacity-0 transition-transform hover:scale-105"
          >
            LISTEN NOW
          </a>
        </div>

        {/* Footer sits in the space under the half-screen photo (photo ends at 75vh) */}
        {footer && (
          <div className="zoom-footer invisible absolute inset-x-0 top-[75vh] flex h-[25vh] items-center justify-center opacity-0">
            {footer}
          </div>
        )}
      </div>
    </section>
  );
}

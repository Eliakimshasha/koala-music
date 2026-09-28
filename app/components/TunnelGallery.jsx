"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Photo corridor seen from inside. Two walls form a gentle V (65° to the
// screen); photos lie flat on each wall with even gaps and travel toward the
// viewer forever, so the left wall streams left and the right wall right.
// Proportions are fitted to a 1847px-wide reference and scale with the stage.
// Ported from the Ephod Trust Events hero; only animates on desktop (>=1024px).
const REF_WIDTH = 1847;
const WALL_ANGLE = 65; // degrees between wall and screen plane
const PERSPECTIVE = 1000;
const PANEL_H = 400;
const PANEL_W = 270; // length along the wall
const GAP = 62;
const WALL_X = 667; // wall distance from centre at the screen plane
const NEAR_S = -420; // where a photo leaves (past the screen edge)

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// `scale` enlarges the whole corridor (photos, gaps and wall spread) evenly.
export default function TunnelGallery({ photos, clearCenter = 0.1, minScale = 0, scale = 1, className = "" }) {
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray(".tunnel-panel", stage);
      const perWall = Math.ceil(panels.length / 2);
      const rad = (WALL_ANGLE * Math.PI) / 180;
      const dirX = Math.cos(rad); // along-wall step toward the centre…
      const dirZ = -Math.sin(rad); // …and away from the viewer
      const spacing = PANEL_W + GAP;
      const length = spacing * perWall;
      const ease = (v) => v * v * (3 - 2 * v); // smoothstep
      let k = 1;
      let width = 1;
      let travel = 0;

      const layout = () => {
        width = stage.clientWidth;
        k = Math.max(width / REF_WIDTH, minScale ? stage.clientHeight / minScale : 0) * scale;
        stage.style.perspective = `${PERSPECTIVE * k}px`;
        panels.forEach((panel) => {
          panel.style.width = `${PANEL_W * k}px`;
          panel.style.height = `${PANEL_H * k}px`;
          panel.style.marginLeft = `${(-PANEL_W * k) / 2}px`;
          panel.style.marginTop = `${(-PANEL_H * k) / 2}px`;
        });
      };

      const render = () => {
        panels.forEach((panel, i) => {
          const left = i % 2 === 0;
          const slot = Math.floor(i / 2);
          // Distance along the wall (grows toward the far end); right wall offset half a slot.
          const s = NEAR_S + ((((slot * spacing + (left ? 0 : spacing / 2) - travel) % length) + length) % length);
          const x = (-WALL_X + s * dirX) * (left ? 1 : -1);
          const z = s * dirZ;
          panel.style.transform = `translate3d(${x * k}px, 0, ${z * k}px) rotateY(${left ? WALL_ANGLE : -WALL_ANGLE}deg)`;

          // Screen position of the photo's centre, for the clear-centre fade.
          const screenX = Math.abs((x * PERSPECTIVE) / (PERSPECTIVE - z)) * k;
          const progress = (s - NEAR_S) / length; // 0 near → 1 far
          const fadeNear = ease(gsap.utils.clamp(0, 1, progress / 0.12));
          const fadeFar = ease(gsap.utils.clamp(0, 1, (1 - progress) / 0.3));
          const fadeCentre = clearCenter
            ? ease(gsap.utils.clamp(0, 1, (screenX - clearCenter * width) / (0.07 * width)))
            : 1;
          panel.style.opacity = Math.min(fadeNear, fadeFar, fadeCentre);
          // Uniformly dim, a touch darker toward the centre.
          panel.style.filter = `brightness(${0.62 - 0.2 * gsap.utils.clamp(0, 1, progress * 1.4)})`;
        });
      };

      layout();
      render();
      const resizeObserver = new ResizeObserver(() => {
        layout();
        render();
      });
      resizeObserver.observe(stage);

      if (prefersReducedMotion()) return () => resizeObserver.disconnect();

      const tick = (_time, deltaMs) => {
        travel += (deltaMs / 1000) * 70; // reference px per second along the wall
        render();
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
      };
    });

    return () => mm.revert();
  }, [clearCenter, minScale, scale]);

  return (
    <div ref={stageRef} className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 transform-3d">
        {photos.map((photo, i) => (
          <div key={`${photo}-${i}`} className="tunnel-panel absolute left-0 top-0 overflow-hidden will-change-transform">
            {/* Eager: panels are 3D-transformed, so lazy loading misses them until they're already in view */}
            <Image src={photo} alt="" fill sizes="25vw" loading="eager" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/images/green.png";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let timer;
    const originalOverflow = document.documentElement.style.overflow;
    const storageKey = "koalaSplashSeen";

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(storageKey) === "1";
      if (!alreadySeen) {
        sessionStorage.setItem(storageKey, "1");
      }
    } catch (error) {
      alreadySeen = false;
    }

    if (alreadySeen) {
      setVisible(false);
      setChecked(true);
      return undefined;
    }

    setVisible(true);
    setChecked(true);
    document.documentElement.style.overflow = "hidden";

    timer = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = originalOverflow;
    }, 2400);

    return () => {
      if (timer) clearTimeout(timer);
      document.documentElement.style.overflow = originalOverflow;
    };
  }, []);

  if (!checked || !visible) return null;

  return (
    <div className="splash-screen is-visible">
      <div className="splash-glow"></div>
      <div className="splash-content">
        <div className="splash-logo">
          <Image src={logo} alt="Koala logo" width={64} height={64} />
        </div>
        <div className="splash-line"></div>
        <p className="splash-kicker">Koala Music Studio</p>
        <h1 className="splash-title">
          Feel the quiet
          <span>before the drop</span>
        </h1>
        <p className="splash-subtitle">
          A curated sonic journey. New releases, live sessions, and timeless
          moods.
        </p>
      </div>
    </div>
  );
}

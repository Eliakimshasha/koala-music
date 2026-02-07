"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/assets/images/green.png";

export default function SplashScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = originalOverflow;
      router.replace("/");
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [router]);

  if (!visible) return null;

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

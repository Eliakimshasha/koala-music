"use client";

import React from "react";
import Chrome from "../components/Chrome";
import Music from "../sections/Music";
import Footer from "../sections/Footer";
import { navLinks, tracks } from "../data/siteData";

export default function MusicPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <Music tracks={tracks} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

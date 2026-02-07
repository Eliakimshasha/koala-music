"use client";

import React from "react";
import Chrome from "../components/Chrome";
import Videos from "../sections/Videos";
import Footer from "../sections/Footer";
import { navLinks, videos } from "../data/siteData";

export default function VideosPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <Videos videos={videos} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

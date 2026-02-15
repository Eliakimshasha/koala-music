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
        <div className="pt-0 max-[900px]:pt-16 lg:px-52">
          <Videos
            videos={videos}
            centerTitle
            intro="Catch the latest videos, sessions, and live moments as they drop."
          />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

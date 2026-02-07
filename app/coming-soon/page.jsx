"use client";

import React from "react";
import Chrome from "../components/Chrome";
import ComingSoon from "../sections/ComingSoon";
import Footer from "../sections/Footer";
import { navLinks, comingSoon } from "../data/siteData";

export default function ComingSoonPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <ComingSoon data={comingSoon} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

"use client";

import React from "react";
import Chrome from "../components/Chrome";
import About from "../sections/About";
import Connect from "../sections/Connect";
import Footer from "../sections/Footer";
import { navLinks, socialLinks } from "../data/siteData";

export default function AboutPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <About />
          <Connect socialLinks={socialLinks} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

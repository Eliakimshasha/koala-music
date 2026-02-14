"use client";

import React from "react";
import Chrome from "../components/Chrome";
import ConnectRow from "../sections/ConnectRow";
import Footer from "../sections/Footer";
import { navLinks, socialLinks } from "../data/siteData";

export default function ContactPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <ConnectRow socialLinks={socialLinks} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

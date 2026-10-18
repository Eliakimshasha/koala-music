"use client";

import React from "react";
import Chrome from "../components/Chrome";
import Footer from "../sections/Footer";
import { navLinks } from "../data/siteData";

export default function StorePage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
          <h1 className="font-display text-6xl font-bold text-gradient md:text-8xl">
            Merchandise
          </h1>
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

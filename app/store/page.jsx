"use client";

import React from "react";
import Chrome from "../components/Chrome";
import Store from "../sections/Store";
import ComingSoon from "../sections/ComingSoon";
import Footer from "../sections/Footer";
import { navLinks, products, comingSoon } from "../data/siteData";

export default function StorePage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <Store products={products} />
          <ComingSoon data={comingSoon} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

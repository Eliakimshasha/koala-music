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
        <div className="pt-24 max-[900px]:pt-1">
          <Store
            products={products}
            centerTitle
            intro="Shop the newest drops, limited capsules, and everyday essentials."
          />
          <ComingSoon data={comingSoon} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

"use client";

import React from "react";
import Chrome from "../components/Chrome";
import Lifestyle from "../sections/Lifestyle";
import Footer from "../sections/Footer";
import { navLinks, lifestylePosts, socialLinks } from "../data/siteData";

export default function LifestylePage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-16 lg:px-52">
          <Lifestyle posts={lifestylePosts} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

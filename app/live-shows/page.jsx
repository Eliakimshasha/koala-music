"use client";

import React from "react";
import Chrome from "../components/Chrome";
import LiveShows from "../sections/LiveShows";
import ConnectRow from "../sections/ConnectRow";
import Footer from "../sections/Footer";
import { navLinks, liveShows, socialLinks } from "../data/siteData";

export default function LiveShowsPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <LiveShows shows={liveShows} />
          <ConnectRow socialLinks={socialLinks} />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

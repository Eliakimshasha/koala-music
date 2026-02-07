"use client";

import React, { useRef } from "react";
import Chrome from "../components/Chrome";
import Albums from "../sections/Albums";
import Footer from "../sections/Footer";
import { navLinks, albums } from "../data/siteData";

export default function AlbumsPage() {
  const albumScrollRef = useRef(null);

  const scrollAlbums = (direction) => {
    if (!albumScrollRef.current) return;
    const container = albumScrollRef.current;
    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <Albums
            albums={albums}
            scrollRef={albumScrollRef}
            onPrev={() => scrollAlbums(-1)}
            onNext={() => scrollAlbums(1)}
          />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

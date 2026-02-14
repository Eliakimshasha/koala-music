"use client";
import React, { useRef } from "react";

import Chrome from "./components/Chrome";
import SplashScreen from "./components/SplashScreen";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Albums from "./sections/Albums";
import Music from "./sections/Music";
import Videos from "./sections/Videos";
import LiveShows from "./sections/LiveShows";
import Lifestyle from "./sections/Lifestyle";
import Store from "./sections/Store";
import ComingSoon from "./sections/ComingSoon";
import Connect from "./sections/Connect";
import Footer from "./sections/Footer";
import {
  navLinks,
  albums,
  tracks,
  videos,
  liveShows,
  lifestylePosts,
  products,
  socialLinks,
  comingSoon,
} from "./data/siteData";

export default function KoalaWebsite() {
  const albumScrollRef = useRef(null);

  const scrollAlbums = (direction) => {
    if (!albumScrollRef.current) return;
    const container = albumScrollRef.current;
    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base main-one text-base-color overflow-hidden">
        <SmoothScroll />
        <SplashScreen />
        <div className="noise"></div>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Hero />
            <About />
            <Albums
              albums={albums}
              scrollRef={albumScrollRef}
              onPrev={() => scrollAlbums(-1)}
              onNext={() => scrollAlbums(1)}
            />
            <Music tracks={tracks} />
            <Videos videos={videos} />
            {/* <LiveShows shows={liveShows} /> */}
            {/* <Lifestyle posts={lifestylePosts} /> */}
            <Store products={products} enableMobileSlider />
            <ComingSoon data={comingSoon} />
            <Connect socialLinks={socialLinks} />
            <Footer />
          </div>
        </div>
      </div>
    </Chrome>
  );
}

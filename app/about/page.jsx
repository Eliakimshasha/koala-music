"use client";
import Chrome from "../components/Chrome";
import About from "../sections/About";
import Footer from "../sections/Footer";
import { navLinks } from "../data/siteData";

export default function AboutPage() {
  return (
    <Chrome navLinks={navLinks}>
      <div className="bg-base text-base-color overflow-hidden">
        <div className="noise"></div>
        <div className="pt-24">
          <About />
          <Footer />
        </div>
      </div>
    </Chrome>
  );
}

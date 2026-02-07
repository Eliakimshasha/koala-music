import React from "react";
import { IoIosPlay } from "react-icons/io";

export default function Music({ tracks }) {
  return (
    <section
      id="music"
      className="music-section section-stack relative pb-32 lg:pt-32  px-6 section-alt"
    >
      <div className="max-w-4xl mx-auto">
        
         <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
          Latest Tracks
        </h2>
        <div className="music-player music-panel">
          <div className="music-list">
            {tracks.map((track, i) => (
              <div key={i} className="music-row">
                <span className="music-icon" aria-hidden="true">
                  <IoIosPlay />
                </span>
                <span className="music-title">{track.title}</span>
                <span className="music-dots" aria-hidden="true"></span>
                <span className="music-duration">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

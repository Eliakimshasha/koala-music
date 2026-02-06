import React from "react";

export default function Music({ tracks }) {
  return (
    <section
      id="music"
      className="music-section section-stack relative pb-32 lg:pt-32  px-6 section-alt"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title font-display text-6xl md:text-8xl font-bold mb-20 text-gradient">
          Latest Tracks
        </h2>
        <div className="music-player bg-surface backdrop-blur-lg rounded-2xl lg:px-8 lg:py-8 px-3 border border-subtle">
          {tracks.map((track, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-subtle hover:bg-surface transition-all px-4 rounded group"
            >
              <div className="flex items-center gap-4">
                <div className="lg:w-12 lg:h-12 h-8 w-8 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-accent-contrast"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">{track.title}</div>
                  <div className="text-xs text-muted">{track.plays} plays</div>
                </div>
              </div>
              <div className="text-muted text-sm">{track.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

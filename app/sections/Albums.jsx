import React from "react";
import Image from "next/image";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function Albums({ albums, scrollRef, onPrev, onNext }) {
  return (
    <section id="albums" className="section-stack relative pb-32 lg:pt-32 pt-9  px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-12 md:mb-16">
          <h2 className="section-title font-display text-6xl md:text-8xl font-bold text-accent">
            Albums
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous albums"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-surface text-base-color hover-text-accent hover-border-accent transition"
              onClick={onPrev}
            >
              <IoIosArrowDropleft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next albums"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-surface text-base-color hover-text-accent hover-border-accent transition"
              onClick={onNext}
            >
              <IoIosArrowDropright className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
        >
          {albums.map((album, i) => (
            <div
              key={i}
              className="album-card card-hover cursor-pointer min-w-[240px] sm:min-w-[280px] md:min-w-[320px] snap-start"
            >
              <div className="relative aspect-square rounded-lg mb-4 overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 70vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 overlay-soft"></div>
                <div className="absolute bottom-4 left-4 text-2xl font-display text-contrast">
                  {album.year}
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">
                {album.title}
              </h3>
              <p className="text-muted">
                {album.tracks} tracks - {album.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

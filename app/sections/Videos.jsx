import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import Logo from "../../public/assets/images/green2.png";

export default function Videos({ videos }) {
  const renderVideoMeta = (video, size = "sm") => {
    const titleSize =
      size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
    const viewsSize = size === "lg" ? "text-base" : "text-sm";

    return (
      <div className="mt-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-subtle">
            Video
          </p>
          <h3 className={`${titleSize} font-display font-semibold`}>
            {video.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-subtle">
            Views
          </p>
          <p className={`${viewsSize} font-semibold text-accent`}>
            {video.views}
          </p>
        </div>
      </div>
    );
  };

  const featured = videos.slice(0, 3);

  return (
    <section
      id="videos"
      className="section-stack relative pb-32 pt-9 lg:pt-32  px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-16">
          <h2 className="section-title font-display text-5xl md:text-8xl font-bold text-accent">
            Videos
          </h2>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 border border-subtle lg:px-5 px-3 py-2 text-xs uppercase tracking-[0.35em] hover-text-accent hover-border-accent transition"
          >
            <IoIosArrowRoundForward className="h-5 w-5" />
            View More
          </Link>
        </div>

        {/* Mobile layout */}
        <div className="grid gap-8 md:hidden">
          {featured.map((video, i) => (
            <div key={i} className="video-item cursor-pointer group">
              <div className="aspect-video rounded-xs mb-4 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={video.image}
                  alt={video.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all"></div>
                <svg
                  className="w-20 h-20 text-white group-hover:scale-125 transition-transform relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {renderVideoMeta(video, "sm")}
            </div>
          ))}
        </div>

        {/* Desktop layout */}
        <div className="hidden relative md:grid grid-cols-2 gap-8">
          <div className="absolute -bottom-9 left-0 flex items-end ">
            <div className="flex items-center gap-3 h-48 ">
              <Image
                src={Logo}
                alt="Koala logo"
                width={140}
                height={40}
                className="h-48 w-auto opacity-20"
              />
            </div>
            <p className=" absolute bottom-0 -right-20 text-xs"><span className=" font-display text-[#afd3a1] text-lg">KOALA.</span> @all rights reserved</p>
          </div>
          <div className="video-item cursor-pointer group">
            <div className="relative min-h-90 rounded-xs overflow-hidden">
              <Image
                src={featured[0].image}
                alt={featured[0].title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
              <svg
                className="absolute left-6 bottom-6 w-16 h-16 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {renderVideoMeta(featured[0], "lg")}
          </div>
          <div className="flex flex-col gap-8">
            <div className="video-item cursor-pointer group">
              <div className="relative min-h-[180px] rounded-xs overflow-hidden">
                <Image
                  src={featured[1].image}
                  alt={featured[1].title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
                <svg
                  className="absolute left-5 bottom-5 w-12 h-12 text-white group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {renderVideoMeta(featured[1], "sm")}
            </div>
            <div className="video-item cursor-pointer group">
              <div className="relative min-h-[360px] rounded-xs overflow-hidden">
                <Image
                  src={featured[2].image}
                  alt={featured[2].title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all"></div>
                <svg
                  className="absolute left-6 bottom-6 w-16 h-16 text-white group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {renderVideoMeta(featured[2], "lg")}
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-subtle hover-text-accent transition"
          >
            See More
            <IoIosArrowRoundForward className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

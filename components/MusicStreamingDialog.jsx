"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const STREAMING_SERVICES = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/playlist?list=OLAK5uy_lrB7_GXnlwEfe8oUyi_u_JAkeS1Qjzqi0",
    logoSrc: "/assets/images/youtube.webp",
    logoAlt: "YouTube",
    cta: "Play",
  },
  {
    name: "Amazon Music",
    href: "https://music.amazon.com/albums/B0GYBDHGQ9?ref=dm_ff_amazonmusic_3p&tag=featurefm-20",
    logoSrc: "/assets/images/amazon.webp",
    logoAlt: "Amazon Music",
    cta: "Play",
  },
  {
    name: "YouTube Music",
    href: "https://music.youtube.com/playlist?list=OLAK5uy_lrB7_GXnlwEfe8oUyi_u_JAkeS1Qjzqi0",
    logoSrc: "/assets/images/youtubemusic.webp",
    logoAlt: "YouTube Music",
    cta: "Play",
  },
  {
    name: "Deezer",
    href: "https://www.deezer.com/en/album/968386771",
    logoSrc: "/assets/images/deezer.webp",
    logoAlt: "Deezer",
    cta: "Play",
  },
  {
    name: "TIDAL",
    href: "https://tidal.com/album/518706198",
    logoSrc: "/assets/images/tidal.webp",
    logoAlt: "TIDAL",
    cta: "Play",
  },
  {
    name: "Boomplay",
    href: "https://www.boomplay.com/albums/130055353?srModel=openapi_featurefm&ffm=FFM_f06cd7ca97492c88d605aeb900268be4",
    logoSrc: "/assets/images/boomplay.webp",
    logoAlt: "Boomplay",
    cta: "Stream",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/album/0ImHT8mIwXFlaaTz74pSH1",
    logoSrc: "/assets/images/spotify.webp",
    logoAlt: "Spotify",
    cta: "Play",
  },
];

const PRIVACY_POLICY_HREF = "https://ffm.to/privacypolicy.SYL";
const TERMS_OF_USE_HREF =
  "https://featurefm.zendesk.com/hc/en-us/articles/360042334392-Terms-of-Use";

export default function MusicStreamingDialog({
  title,
  imageSrc,
  imageAlt,
  triggerLabel = "Listen now",
  triggerClassName = "",
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={triggerClassName}>
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] overflow-hidden border border-white/10 bg-[#2c2c2c] p-0 text-white shadow-2xl sm:max-w-[420px]"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button
            type="button"
            className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogClose>

        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="px-5 pt-5">
            <div className="mx-auto max-w-[280px] rounded-[1.6rem] bg-[#e7e6cf] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
              <div className="relative aspect-square overflow-hidden rounded-[1.2rem]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg">
                    <span
                      aria-hidden="true"
                      className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-5 pt-4 text-center">
            <DialogTitle className="font-display text-3xl font-bold text-white">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-white/75">
              Choose your preferred music service
            </DialogDescription>
          </div>

          <div className="space-y-px bg-white/10">
            {STREAMING_SERVICES.map((service) => (
              <div
                key={service.name}
                className="flex items-center gap-4 bg-white px-4 py-4 text-[#161616]"
              >
                <div className="relative h-8 flex-1">
                  <Image
                    src={service.logoSrc}
                    alt={service.logoAlt}
                    fill
                    sizes="160px"
                    className="object-contain object-left"
                  />
                </div>

                <Link
                  href={service.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-24 items-center justify-center rounded-md border border-[#d8dbe3] bg-white px-4 py-2 text-sm font-medium text-[#445067] transition hover:border-[#c3cad6] hover:bg-[#f8fafc]"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="px-6 pb-6 pt-4 text-center text-xs leading-5 text-white/70">
            By using this service you agree to our{" "}
            <Link
              href={PRIVACY_POLICY_HREF}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white transition hover:text-[#d7eb92]"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href={TERMS_OF_USE_HREF}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white transition hover:text-[#d7eb92]"
            >
              Terms of Use
            </Link>
            .
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

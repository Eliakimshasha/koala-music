import { readdir } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "assets", "images");
    const entries = await readdir(imagesDir, { withFileTypes: true });

    const images = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        name,
        src: `/assets/images/${name}`,
      }));

    return NextResponse.json(images);
  } catch {
    return NextResponse.json(
      { detail: "Unable to load image assets right now." },
      { status: 500 }
    );
  }
}

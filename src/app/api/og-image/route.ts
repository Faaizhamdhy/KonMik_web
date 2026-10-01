import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coverUrl = searchParams.get("cover");

  const fallbackPath = path.join(process.cwd(), "public", "citsune.jpg");

  // If no cover is provided, return default citsune image as JPEG
  if (!coverUrl) {
    try {
      const fallbackBuffer = fs.readFileSync(fallbackPath);
      const converted = await sharp(fallbackBuffer)
        .resize(600, 800, { fit: "cover", position: "center" })
        .jpeg({ quality: 85 })
        .toBuffer();

      return new NextResponse(converted, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
      });
    } catch {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  try {
    // Decode if needed
    const decodedUrl = decodeURIComponent(coverUrl);

    // Fetch the external comic cover with proper headers to bypass hotlink / user-agent blocks
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(decodedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        Referer: decodedUrl.includes("voratoon") ? "https://voratoon.com/" : "https://shinigami.id/",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Failed to fetch cover: ${res.status}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Convert WebP / PNG / AVIF / JPEG into WhatsApp-compliant JPEG (< 300KB)
    const jpegBuffer = await sharp(inputBuffer)
      .resize(600, 800, { fit: "cover", position: "center" })
      .jpeg({ quality: 82, progressive: true })
      .toBuffer();

    return new NextResponse(jpegBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    });
  } catch (err) {
    // If fetching external image fails (403, S3 token expired, or timeout), fallback to citsune mascot image
    try {
      const fallbackBuffer = fs.readFileSync(fallbackPath);
      const converted = await sharp(fallbackBuffer)
        .resize(600, 800, { fit: "cover", position: "center" })
        .jpeg({ quality: 85 })
        .toBuffer();

      return new NextResponse(converted, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch {
      return new NextResponse("Error generating image", { status: 500 });
    }
  }
}

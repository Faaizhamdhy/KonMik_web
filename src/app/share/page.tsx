import { Metadata } from "next";
import ShareClient from "./ShareClient";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function reconstructCoverUrl(params: { [key: string]: string | string[] | undefined }): string {
  const rawCover = typeof params.cover === "string" ? params.cover : "";
  if (!rawCover) {
    return "https://api.konkon.id/static/assets/citsune.jpg";
  }

  let cover = decodeURIComponent(rawCover);

  // If AWS S3 query parameters got decoupled (like in VoraToon), reattach them to cover
  if (!cover.includes("X-Amz-Signature") && typeof params["X-Amz-Signature"] === "string") {
    const s3Params = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      if (key.startsWith("X-Amz-") || key === "x-id" || key.startsWith("x-amz-")) {
        if (typeof val === "string") {
          s3Params.set(key, val);
        }
      }
    }
    const glue = cover.includes("?") ? "&" : "?";
    cover = `${cover}${glue}${s3Params.toString()}`;
  }

  return cover;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawTitle = typeof params.title === "string" ? params.title : "";
  const title = rawTitle ? decodeURIComponent(rawTitle) : "Rekomendasi Komik di KonMik";

  const cover = reconstructCoverUrl(params);
  const source = typeof params.source === "string" ? params.source : "";
  const desc = `Baca ${title}${source ? ` (${source})` : ""} gratis tanpa iklan mengganggu di aplikasi KonMik!`;

  // Use our specialized JPEG proxy endpoint so WhatsApp and social platforms always get a valid <300KB JPEG
  const ogImageUrl = `https://konmik.konkon.id/api/og-image?cover=${encodeURIComponent(cover)}`;

  return {
    metadataBase: new URL("https://konmik.konkon.id"),
    title: `${title} - Baca di KonMik`,
    description: desc,
    openGraph: {
      title: `${title} | KonMik`,
      description: desc,
      url: `https://konmik.konkon.id/share`,
      siteName: "KonMik",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 600,
          height: 800,
          type: "image/jpeg",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | KonMik`,
      description: desc,
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;

  const title = typeof params.title === "string" ? decodeURIComponent(params.title) : "Komik Pilihan";
  const cover = reconstructCoverUrl(params);
  const source = typeof params.source === "string" ? params.source : "";
  const id = typeof params.id === "string" ? params.id : "";
  const endpoint = typeof params.endpoint === "string" ? decodeURIComponent(params.endpoint) : "";

  return (
    <ShareClient
      title={title}
      cover={cover}
      source={source}
      id={id}
      endpoint={endpoint}
    />
  );
}

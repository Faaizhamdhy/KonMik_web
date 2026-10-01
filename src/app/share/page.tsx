import { Metadata } from "next";
import ShareClient from "./ShareClient";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const rawTitle = typeof params.title === "string" ? params.title : "";
  const title = rawTitle ? decodeURIComponent(rawTitle) : "Rekomendasi Komik di KonMik";
  
  const rawCover = typeof params.cover === "string" ? params.cover : "";
  const cover = rawCover
    ? decodeURIComponent(rawCover)
    : "https://api.konkon.id/static/assets/citsune.jpg";

  const source = typeof params.source === "string" ? params.source : "";
  const desc = `Baca ${title}${source ? ` (${source})` : ""} gratis tanpa iklan mengganggu di aplikasi KonMik!`;

  return {
    metadataBase: new URL("https://konmik-web.vercel.app"),
    title: `${title} - Baca di KonMik`,
    description: desc,
    openGraph: {
      title: `${title} | KonMik`,
      description: desc,
      images: [
        {
          url: cover,
          alt: title,
        },
      ],
      type: "website",
      siteName: "KonMik",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | KonMik`,
      description: desc,
      images: [cover],
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;
  
  const title = typeof params.title === "string" ? decodeURIComponent(params.title) : "Komik Pilihan";
  const cover = typeof params.cover === "string" ? decodeURIComponent(params.cover) : "";
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

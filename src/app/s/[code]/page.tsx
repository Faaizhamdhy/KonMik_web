import { Metadata } from "next";
import { notFound } from "next/navigation";
import ShareClient from "@/app/share/ShareClient";
import { getLatestVersion } from "@/lib/version";

type Props = {
  params: Promise<{ code: string }>;
};

interface ComicShareData {
  code: string;
  source: string;
  id: string;
  endpoint?: string;
  title?: string;
  cover?: string;
}

async function fetchShareData(code: string): Promise<ComicShareData | null> {
  try {
    const res = await fetch(`https://api.konkon.id/api/comic/share/${encodeURIComponent(code)}`, {
      next: { revalidate: 3600 }, // Cache 1 hour
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status === "success" && json.data) {
      return json.data;
    }
  } catch (e) {
    console.error("Failed to fetch short link data:", e);
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const data = await fetchShareData(code);

  const title = data?.title || "Rekomendasi Komik di KonMik";
  const cover = data?.cover || "https://api.konkon.id/static/assets/citsune.jpg";
  const source = data?.source || "";
  const desc = `Baca ${title}${source ? ` (${source})` : ""} gratis tanpa iklan mengganggu di aplikasi KonMik!`;

  const ogImageUrl = `https://konmik.konkon.id/api/og-image?cover=${encodeURIComponent(cover)}`;

  return {
    metadataBase: new URL("https://konmik.konkon.id"),
    title: `${title} - Baca di KonMik`,
    description: desc,
    openGraph: {
      title: `${title} | KonMik`,
      description: desc,
      url: `https://konmik.konkon.id/s/${code}`,
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

export default async function ShortSharePage({ params }: Props) {
  const { code } = await params;
  const [data, version] = await Promise.all([fetchShareData(code), getLatestVersion()]);

  if (!data) {
    notFound();
  }

  return (
    <ShareClient
      title={data.title || "Komik Pilihan"}
      cover={data.cover || ""}
      source={data.source || ""}
      id={data.id || ""}
      endpoint={data.endpoint || ""}
      version={version}
    />
  );
}

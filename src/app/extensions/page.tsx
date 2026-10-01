import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Extensions from "@/components/Extensions";
import { getLatestVersion } from "@/lib/version";

export const metadata: Metadata = {
  title: "Katalog Ekstensi Komik KonMik - Line Webtoon & DoujinDesu",
  description:
    "Koleksi ekstensi modular resmi & komunitas untuk aplikasi KonMik. Pasang ekstensi Webtoon dan DoujinDesu secara mudah langsung di aplikasi.",
  openGraph: {
    title: "Katalog Ekstensi KonMik",
    description:
      "Pasang sumber komik favoritmu di aplikasi KonMik dengan mudah melalui katalog ekstensi modular.",
    url: "https://konmik.konkon.id/extensions",
  },
};

export default async function ExtensionsPage() {
  const version = await getLatestVersion();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar version={version} />
      <main className="flex-1 pt-8">
        <Extensions />
      </main>
      <Footer version={version} />
    </div>
  );
}

import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Extensions from "@/components/Extensions";

export const metadata: Metadata = {
  title: "Katalog Ekstensi Komik KonMik - Webtoon, SoftKomik, DoujinDesu",
  description:
    "Koleksi ekstensi resmi & komunitas untuk aplikasi KonMik. Pasang ekstensi Webtoon, SoftKomik, DoujinDesu, KomikIndo, MangaDex, dan Kiryuu hanya dengan 1 klik.",
  openGraph: {
    title: "Katalog Ekstensi KonMik",
    description:
      "Pasang sumber komik favoritmu di aplikasi KonMik: Webtoon, DoujinDesu, SoftKomik, KomikIndo, MangaDex.",
    url: "https://konmik.konkon.id/extensions",
  },
};

export default function ExtensionsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 pt-8">
        <Extensions />
      </main>
      <Footer />
    </div>
  );
}

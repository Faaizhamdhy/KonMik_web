import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Extensions from "@/components/Extensions";
import { getLatestVersion } from "@/lib/version";

export const metadata: Metadata = {
  title: "Katalog Ekstensi Modular KonMik - Pasang Sumber Komik Bebas",
  description:
    "Koleksi panduan dan format ekstensi modular JavaScript untuk aplikasi KonMik. Pasang dan kembangkan sumber komik secara mandiri dan fleksibel.",
  openGraph: {
    title: "Katalog Ekstensi Modular KonMik",
    description:
      "Pasang sumber komik tambahan di aplikasi KonMik dengan mudah melalui katalog ekstensi modular JavaScript.",
    url: "https://konmik.konkon.id/extensions",
  },
};

export default async function ExtensionsPage() {
  const version = await getLatestVersion();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar version={version} solid />
      <main className="flex-1 pt-24 sm:pt-28">
        <Extensions />
      </main>
      <Footer version={version} />
    </div>
  );
}

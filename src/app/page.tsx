import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Screenshots from "@/components/Screenshots";
import Extensions from "@/components/Extensions";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { getLatestVersion } from "@/lib/version";

export default async function Home() {
  const version = await getLatestVersion();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar version={version} />

      <main className="flex-1">
        <Hero version={version} />
        <Screenshots />
        <Extensions />
        <Features version={version} />
      </main>

      <Footer version={version} />
    </div>
  );
}

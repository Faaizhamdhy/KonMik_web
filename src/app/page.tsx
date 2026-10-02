import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommunityStats from "@/components/CommunityStats";
import Screenshots from "@/components/Screenshots";
import Extensions from "@/components/Extensions";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { getLatestVersion } from "@/lib/version";
import { getAppStats, getPublicReviews } from "@/lib/stats";

export default async function Home() {
  const [version, stats, reviews] = await Promise.all([
    getLatestVersion(),
    getAppStats(),
    getPublicReviews(),
  ]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar version={version} />

      <main className="flex-1">
        <Hero version={version} />
        <CommunityStats initialStats={stats} initialReviews={reviews} />
        <Screenshots />
        <Extensions />
        <Features version={version} />
      </main>

      <Footer version={version} />
    </div>
  );
}

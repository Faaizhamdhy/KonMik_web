import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Extensions from "@/components/Extensions";
import Features from "@/components/Features";
import Trending from "@/components/Trending";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Extensions />
        <Features />
        <Trending />
      </main>

      <Footer />
    </div>
  );
}

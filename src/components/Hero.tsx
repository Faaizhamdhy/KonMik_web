import { Download, ChevronRight, Sparkles, Smartphone, ShieldCheck, Zap, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://api.konkon.id/static/assets";

export default function Hero() {
  const downloadUrl =
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

  const stats = [
    { icon: Smartphone, label: "Android 7.0+", sub: "ARM64 & 32-bit", color: "text-[#ff7a00]" },
    { icon: ShieldCheck, label: "100% Ad-Free", sub: "Tanpa pop-up", color: "text-emerald-400" },
    { icon: Zap, label: "Citsune AI", sub: "Teman baca cerdas", color: "text-amber-400" },
    { icon: Star, label: "Multi-Source", sub: "Ribuan komik", color: "text-purple-400" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* ── Multi-layer background ── */}
      {/* Top radial glow */}
      <div className="absolute inset-0 -z-20 bg-[#0c0906]" />
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.14)_0%,transparent_65%)]" />
      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0c0906] -z-10 pointer-events-none" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,122,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-20 pb-28 md:pt-28 md:pb-36">
        {/* ── Badge ── */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,122,0,0.3)] bg-[rgba(255,122,0,0.08)] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#ff7a00] backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>KonMik v1.6.2 — Tema Citsune</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#f5ede4]/70 font-normal">Rilis Terbaru</span>
          </div>
        </div>

        {/* ── Headline ── */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto animate-fade-up-delay-1">
          Baca Manga, Manhwa &{" "}
          <br className="hidden sm:block" />
          Webtoon{" "}
          <span className="shimmer-text">Bebas Iklan</span>
        </h1>

        {/* ── Subtitle ── */}
        <p className="text-center text-base sm:text-lg md:text-xl text-[#a89282] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up-delay-2">
          Platform baca komik bertema rubah <strong className="text-[#f5ede4] font-semibold">Citsune</strong>{" "}
          dengan ribuan judul bawaan, ekstensi modular, klan komunitas, dan teman AI cerdas.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-sm sm:max-w-none mx-auto mb-12 animate-fade-up-delay-3">
          <a
            href={downloadUrl}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-base bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_32px_rgba(255,122,0,0.4)] hover:shadow-[0_0_48px_rgba(255,122,0,0.55)] active:scale-[0.97] overflow-hidden"
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]" />
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
            <span>Download KonMik APK</span>
          </a>

          <Link
            href="#screenshots"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-[#f5ede4] text-base bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] hover:bg-[#221a13] transition-all duration-200"
          >
            Preview Aplikasi
            <ChevronRight className="w-4 h-4 text-[#6b5244]" aria-hidden="true" />
          </Link>
        </div>

        {/* ── Stats / Badges ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-16 animate-fade-up-delay-4">
          {stats.map(({ icon: Icon, label, sub, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#18120e] border border-[#2a1d14] text-center"
            >
              <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
              <span className="text-xs font-semibold text-[#f5ede4]">{label}</span>
              <span className="text-[10px] text-[#a89282]">{sub}</span>
            </div>
          ))}
        </div>

        {/* ── Hero Visual: Dual CDN asset card ── */}
        <div className="relative max-w-4xl mx-auto pt-8">
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-[radial-gradient(ellipse,rgba(255,122,0,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-visible">
            {/* Left: Citsune mascot card */}
            <div className="gradient-border p-5 sm:p-6 flex items-center gap-5 group hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-shadow duration-300">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-[rgba(255,122,0,0.4)] shadow-[0_8px_24px_rgba(255,122,0,0.25)] group-hover:scale-105 transition-transform duration-300 bg-[#1a1109] animate-float">
                <Image
                  src={`${CDN}/citsune.jpg`}
                  alt="Citsune Fox AI Mascot"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-[10px] font-bold uppercase tracking-wider mb-2">
                  Maskot Resmi
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#f5ede4] leading-snug mb-1">
                  Temui Citsune!
                </h3>
                <p className="text-xs sm:text-sm text-[#a89282] leading-relaxed">
                  Adik rubahmu yang cerdas — siap rekomendasikan komik, rekap alur, dan menemani baca.
                </p>
              </div>
            </div>

            {/* Right: Pose breaking out of card */}
            {/* overflow-visible on card so character can bleed outside border */}
            <div className="relative rounded-[24px] bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.35)] transition-all duration-300 group pl-28 sm:pl-32 pr-5 sm:pr-6 py-5 sm:py-6 min-h-[120px] sm:min-h-[140px]">
              {/* Ambient glow inside card */}
              <div className="absolute inset-0 rounded-[24px] bg-[radial-gradient(ellipse_at_left,rgba(255,122,0,0.07),transparent_60%)] pointer-events-none" />

              {/* Character — absolutely positioned, overflowing top & bottom outside card */}
              <div className="absolute left-4 sm:left-5 -top-6 bottom-0 w-20 sm:w-24 pointer-events-none select-none">
                {/* Soft ground shadow for floating feel */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-5 bg-[rgba(255,122,0,0.2)] blur-lg rounded-full" />
                <Image
                  src={`${CDN}/CitsunePose1.png`}
                  alt="Citsune Pose"
                  fill
                  unoptimized
                  className="object-contain object-bottom drop-shadow-[0_4px_20px_rgba(255,122,0,0.4)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Feature list */}
              <div className="relative space-y-2.5">
                {[
                  "Multi-sumber dengan ekstensi modular JS",
                  "Reader Ultra HD + scroll berbasis rubah",
                  "Klan, leaderboard, & obrolan komunitas",
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] mt-1.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#a89282]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Download, ChevronRight, Sparkles, Smartphone, ShieldCheck, Zap, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getLatestVersion } from "@/lib/version";

const CDN = "https://api.konkon.id/static/assets";

export default async function Hero({ version: propVersion }: { version?: string } = {}) {
  const version = propVersion ?? (await getLatestVersion());
  const downloadUrl =
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

  const stats = [
    { icon: Smartphone,  label: "Android 7.0+",  sub: "ARM64 & 32-bit",    color: "text-[#ff7a00]"   },
    { icon: ShieldCheck, label: "100% Ad-Free",  sub: "Tanpa pop-up",      color: "text-emerald-400" },
    { icon: Zap,         label: "Citsune AI",    sub: "Teman baca cerdas", color: "text-amber-400"   },
    { icon: Star,        label: "Multi-Source",  sub: "10+ Sumber bawaan", color: "text-purple-400"  },
  ];

  const featurePills = [
    { t: "Ekstensi modular JS",    c: "bg-[#ff7a00]" },
    { t: "Mode Baca Ultra HD",     c: "bg-amber-400" },
    { t: "Klan & leaderboard",     c: "bg-purple-400" },
    { t: "Komunitas aktif",        c: "bg-emerald-400" },
  ];

  return (
    <section className="relative overflow-x-clip w-full">
      {/* ── Background ambient glow ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0c0906]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[850px] h-[350px] sm:h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.14)_0%,transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#0c0906]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,122,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Banner Showcase background ── */}
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden pointer-events-none h-[50%] sm:h-[55%]">
        <Image
          src="/banner-showcase.jpg"
          alt=""
          fill
          unoptimized
          priority
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c0906] via-[#0c0906]/85 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0c0906] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0c0906] to-transparent" />
        <div className="absolute inset-0 bg-[#0c0906]/30 sm:bg-[#0c0906]/20" />
      </div>

      {/* ── Main Unified Hero Container (Compact & Above-the-fold) ── */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-6 pb-12 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
        
        {/* Unified 2-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ── Left Column: Value Proposition, CTA & Stats ── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
            
            {/* Release Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,122,0,0.3)] bg-[rgba(255,122,0,0.08)] px-3.5 py-1 text-xs font-semibold text-[#ff7a00] backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>KonMik v{version}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[#f5ede4]/70 font-normal">Rilis Terbaru</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.14] text-[#f5ede4]">
              Baca Ribuan Manga, Manhwa &{" "}
              <span className="shimmer-text">Komik Bebas Iklan</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#a89282] max-w-xl leading-relaxed">
              Platform baca komik modern tanpa gangguan iklan pop-up, didampingi asisten AI pintar{" "}
              <strong className="text-[#f5ede4] font-semibold">Citsune</strong>,{" "}
              10+ server bawaan, ekstensi modular, dan klan komunitas yang aktif.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
              <a
                href={downloadUrl}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl font-bold text-white text-sm bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_28px_rgba(255,122,0,0.38)] hover:shadow-[0_0_40px_rgba(255,122,0,0.5)] active:scale-[0.98] overflow-hidden"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]" />
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200 relative shrink-0" aria-hidden="true" />
                <span className="relative">Download APK (~31 MB)</span>
              </a>

              <Link
                href="#screenshots"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-[#f5ede4] text-sm bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.35)] hover:bg-[#221a13] transition-all duration-200"
              >
                <span>Preview Aplikasi</span>
                <ChevronRight className="w-4 h-4 text-[#6b5244] shrink-0" aria-hidden="true" />
              </Link>
            </div>

            {/* Compact Stats Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-lg lg:max-w-none pt-2">
              {stats.map(({ icon: Icon, label, sub, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center lg:items-start p-2.5 rounded-xl bg-[#140e0a]/80 border border-[#261910] text-center lg:text-left"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon className={`w-3.5 h-3.5 ${color}`} aria-hidden="true" />
                    <span className="text-xs font-bold text-[#f5ede4]">{label}</span>
                  </div>
                  <span className="text-[10px] text-[#a89282]">{sub}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Column: Compact Citsune Character Showcase ── */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl border border-[rgba(255,122,0,0.28)] bg-gradient-to-b from-[#1c1510] via-[#140e0a] to-[#0e0a07] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(255,122,0,0.08)]">
              
              {/* Inner ambient top accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.4)] to-transparent pointer-events-none" />

              {/* Character stage header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[rgba(255,122,0,0.4)] shadow-[0_0_12px_rgba(255,122,0,0.3)] bg-[#1a1109] shrink-0">
                  <Image
                    src={`${CDN}/citsune.jpg`}
                    alt="Citsune mascot logo"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff7a00]">Asisten AI Resmi</span>
                  <h3 className="text-base font-extrabold text-[#f5ede4]">
                    Temui Citsune!
                  </h3>
                </div>
              </div>

              {/* Character Artwork Stage */}
              <div className="relative h-56 sm:h-64 w-full flex items-end justify-center my-1 select-none pointer-events-none">
                {/* Stage floor glow */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-44 h-8 bg-[rgba(255,122,0,0.3)] blur-xl rounded-full" />
                
                <Image
                  src={`${CDN}/CitsunePose1.png`}
                  alt="Citsune Character"
                  fill
                  unoptimized
                  className="object-contain object-bottom transition-transform duration-300 hover:scale-105"
                  style={{
                    filter: "drop-shadow(0 8px 24px rgba(255, 122, 0, 0.45))",
                  }}
                />
              </div>

              {/* Mini dialogue text */}
              <p className="text-xs text-[#a89282] text-center mb-3.5 leading-relaxed">
                Asisten cerdas yang siap beri rekomendasi komik & rekap alur bab kapan saja!
              </p>

              {/* 4 Feature Pills */}
              <div className="grid grid-cols-2 gap-1.5">
                {featurePills.map(({ t, c }) => (
                  <div key={t} className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-lg bg-[#110d09] border border-[#2a1d14]">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c}`} />
                    <span className="text-[11px] text-[#a89282] truncate font-medium">{t}</span>
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

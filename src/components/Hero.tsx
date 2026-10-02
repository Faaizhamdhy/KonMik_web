import { Download, ChevronRight, Sparkles, Smartphone, ShieldCheck, Zap, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InstallGuideModal from "@/components/InstallGuideModal";
import { getLatestVersion } from "@/lib/version";
import { getAppStats } from "@/lib/stats";

const CDN = "https://api.konkon.id/static/assets";

export default async function Hero({ version: propVersion }: { version?: string } = {}) {
  const version = propVersion ?? (await getLatestVersion());
  const appStats = await getAppStats();
  const downloadUrl =
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

  const stats = [
    {
      icon: Download,
      label: `${(appStats.totalDownload / 1000).toFixed(1)}K+`,
      sub: "Total Download",
      color: "text-[#ff7a00]",
    },
    {
      icon: Star,
      label: `${appStats.avgRating.toFixed(1)} ★`,
      sub: `${appStats.totalRatings} Ulasan`,
      color: "text-amber-400",
    },
    {
      icon: Users,
      label: `${appStats.activeReaders} Online`,
      sub: "Pembaca Aktif",
      color: "text-emerald-400",
    },
    {
      icon: ShieldCheck,
      label: "100% Bebas Iklan",
      sub: "Tanpa pop-up",
      color: "text-purple-400",
    },
  ];

  return (
    <section className="relative overflow-x-clip w-full">
      {/* ── Background layers — strictly clipped inside overflow-hidden to prevent horizontal mobile scrolling ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0c0906]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[900px] h-[450px] sm:h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.15)_0%,transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#0c0906]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,122,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Banner Showcase — full-width background, fades into hero ── */}
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden pointer-events-none h-[52%] sm:h-[55%] md:h-[60%]">
        <Image
          src="/banner-showcase.jpg"
          alt=""
          fill
          unoptimized
          priority
          className="object-cover object-center opacity-30 sm:opacity-30"
        />
        {/* Fade bottom — blend into bg */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c0906] via-[#0c0906]/80 to-transparent" />
        {/* Fade sides */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0c0906] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0c0906] to-transparent" />
        {/* Dark overlay — seimbang antara terlihat & teks terbaca */}
        <div className="absolute inset-0 bg-[#0c0906]/35 sm:bg-[#0c0906]/25" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-14 pb-16 md:pt-20 md:pb-24">

        {/* ── Release Pill Badge ── */}
        <div className="flex justify-center mb-5 sm:mb-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,122,0,0.3)] bg-[rgba(255,122,0,0.08)] px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#ff7a00] backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>KonMik v{version}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-[#f5ede4]/70 font-normal hidden sm:inline">Rilis Terbaru</span>
          </div>
        </div>

        {/* ── Main Headline ── */}
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] mb-4 sm:mb-5 max-w-4xl mx-auto animate-fade-up-delay-1 px-2">
          Baca Ribuan Manga, Manhwa &{" "}
          <br className="hidden sm:block" />
          Komik <span className="shimmer-text">Bebas Iklan</span>
        </h1>

        {/* ── Subtitle (Ringkas & Padat) ── */}
        <p className="text-center text-sm sm:text-base md:text-lg text-[#a89282] mb-7 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up-delay-2 px-2">
          Platform baca komik modern tanpa gangguan iklan, didampingi asisten AI pintar{" "}
          <strong className="text-[#f5ede4] font-semibold">Citsune</strong>,{" "}
          10+ server bawaan, ekstensi modular, dan klan komunitas.
        </p>

        {/* ── Call To Action Buttons ── */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-xs sm:max-w-none mx-auto mb-3.5 sm:mb-4 animate-fade-up-delay-3">
          <a
            href={downloadUrl}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-sm sm:text-base bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_32px_rgba(255,122,0,0.4)] hover:shadow-[0_0_48px_rgba(255,122,0,0.55)] active:scale-[0.97] overflow-hidden"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]" />
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200 relative shrink-0" aria-hidden="true" />
            <span className="relative">Download KonMik APK</span>
          </a>
          <Link
            href="#screenshots"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-semibold text-[#f5ede4] text-sm sm:text-base bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] hover:bg-[#221a13] transition-all duration-200"
          >
            Preview Aplikasi
            <ChevronRight className="w-4 h-4 text-[#6b5244] shrink-0" aria-hidden="true" />
          </Link>
        </div>

        {/* ── Install Guide & Play Protect Helper ── */}
        <div className="flex justify-center mb-8 sm:mb-10 animate-fade-up-delay-3">
          <InstallGuideModal />
        </div>

        {/* ── Stats Badges Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-2xl mx-auto mb-12 sm:mb-16 animate-fade-up-delay-4">
          {stats.map(({ icon: Icon, label, sub, color }) => (
            <Link
              key={label}
              href="#stats"
              className="flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-xl bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.35)] hover:bg-[#201711] transition-all text-center group cursor-pointer"
            >
              <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
              <span className="text-xs font-semibold text-[#f5ede4]">{label}</span>
              <span className="text-[10px] text-[#a89282]">{sub}</span>
            </Link>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            IMMERSIVE CHARACTER SHOWCASE (POPOUT BREAKTHROUGH CARD DI BAWAH)
            Character body breaks through the top border with vivid lighting!
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative max-w-4xl mx-auto pt-12 sm:pt-14">

          {/* ── Background soft stage glow ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,122,0,0.12)_0%,transparent_70%)] pointer-events-none -z-10" />

          {/* ── Main Unified Showcase Card ── */}
          <div className="relative rounded-3xl border border-[rgba(255,122,0,0.3)] bg-gradient-to-b from-[#1c1510] via-[#16100c] to-[#120d09] p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(255,122,0,0.1)]">
            
            {/* Ambient inner card accents */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.5)] to-transparent pointer-events-none" />

            {/* Desktop Layout (Grid with Character Breaking Through Top on the Right) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Text & Features */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[rgba(255,122,0,0.5)] shadow-[0_0_16px_rgba(255,122,0,0.35)] bg-[#1a1109] shrink-0 animate-float">
                    <Image
                      src={`${CDN}/citsune.jpg`}
                      alt="Citsune mascot logo"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff7a00]">Asisten AI Resmi KonMik</span>
                    <h3 className="text-2xl font-extrabold text-[#f5ede4]">
                      Temui Citsune, Teman Bacamu!
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#a89282] leading-relaxed">
                  Butuh rekomendasi komik seru atau rekap alur bab sebelumnya? Citsune siap menemani petualangan membacamu setiap hari.
                </p>

                {/* 4 Feature Pills */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {[
                    { t: "Ekstensi modular JS",        c: "bg-[#ff7a00]" },
                    { t: "Mode Baca Ultra HD",         c: "bg-amber-400" },
                    { t: "Klan & papan peringkat",     c: "bg-purple-400" },
                    { t: "Obrolan komunitas aktif",    c: "bg-emerald-400" },
                  ].map(({ t, c }) => (
                    <div key={t} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#110d09]/80 border border-[#2a1d14]">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c}`} />
                      <span className="text-xs text-[#a89282] font-medium">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href={downloadUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#ff7a00] hover:bg-[#e86e00] transition-all shadow-[0_0_20px_rgba(255,122,0,0.3)] active:scale-[0.98]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download APK &bull; Gratis</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Character BREAKING OUT from top of card */}
              <div className="lg:col-span-5 relative h-[320px] flex items-end justify-center">
                {/* Character standing and bursting out the top border */}
                <div className="absolute -top-24 bottom-0 w-64 xl:w-72 pointer-events-none select-none">
                  {/* Glowing ground stage ellipse under feet */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-44 h-10 bg-[rgba(255,122,0,0.35)] blur-2xl rounded-full" />
                  {/* Character image with rich lighting drop shadow */}
                  <Image
                    src={`${CDN}/CitsunePose1.png`}
                    alt="Citsune Character"
                    fill
                    unoptimized
                    className="object-contain object-bottom transition-transform duration-500 hover:scale-105"
                    style={{
                      filter: "drop-shadow(0 10px 30px rgba(255, 122, 0, 0.55))",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout (Pop-out character bursting out through the top, text strictly underneath) */}
            <div className="lg:hidden relative flex flex-col items-center text-center">
              
              {/* Character stage bursting through top border with natural height flow */}
              <div className="relative -mt-20 sm:-mt-24 w-52 sm:w-60 h-64 sm:h-72 pointer-events-none select-none flex items-end justify-center mb-3">
                {/* Stage floor glow */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-8 bg-[rgba(255,122,0,0.35)] blur-xl rounded-full" />
                <div className="relative w-full h-full">
                  <Image
                    src={`${CDN}/CitsunePose1.png`}
                    alt="Citsune Character"
                    fill
                    unoptimized
                    className="object-contain object-bottom"
                    style={{
                      filter: "drop-shadow(0 10px 24px rgba(255, 122, 0, 0.55))",
                    }}
                  />
                </div>
              </div>

              {/* Text content strictly under the character feet — zero overlapping or covered text */}
              <div className="relative z-10 space-y-3.5 w-full px-2">
                <div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.3)] text-[10px] font-bold uppercase tracking-wider text-[#ff7a00] mb-2.5">
                    Asisten AI Resmi KonMik
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#f5ede4]">
                    Temui Citsune, Teman Bacamu!
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#a89282] max-w-md mx-auto leading-relaxed">
                  Asisten cerdas yang setia menemani petualangan membacamu. Siap beri rekomendasi komik seru dan rekap alur bab kapan saja!
                </p>

                {/* 4 Feature Pills on Mobile */}
                <div className="grid grid-cols-2 gap-2 text-left max-w-sm mx-auto pt-1">
                  {[
                    { t: "Ekstensi modular JS",        c: "bg-[#ff7a00]" },
                    { t: "Mode Baca Ultra HD",         c: "bg-amber-400" },
                    { t: "Klan & leaderboard",         c: "bg-purple-400" },
                    { t: "Komunitas aktif",            c: "bg-emerald-400" },
                  ].map(({ t, c }) => (
                    <div key={t} className="flex items-center gap-2 p-2 rounded-xl bg-[#110d09]/80 border border-[#2a1d14]">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c}`} />
                      <span className="text-[11px] text-[#a89282] truncate font-medium">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href={downloadUrl}
                    className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 rounded-xl text-xs font-bold text-white bg-[#ff7a00] hover:bg-[#e86e00] transition-all shadow-[0_0_20px_rgba(255,122,0,0.3)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download APK v{version} (~31 MB)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

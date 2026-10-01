import { Download, ChevronRight, Sparkles, Smartphone, ShieldCheck, Zap, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://api.konkon.id/static/assets";

export default function Hero() {
  const downloadUrl =
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

  const stats = [
    { icon: Smartphone, label: "Android 7.0+",   sub: "ARM64 & 32-bit",    color: "text-[#ff7a00]"    },
    { icon: ShieldCheck, label: "100% Ad-Free",  sub: "Tanpa pop-up",      color: "text-emerald-400"  },
    { icon: Zap,         label: "Citsune AI",    sub: "Teman baca cerdas", color: "text-amber-400"    },
    { icon: Star,        label: "Multi-Source",  sub: "Ribuan komik",      color: "text-purple-400"   },
  ];

  return (
    /* overflow-visible so character can bleed outside section bounds */
    <section className="relative overflow-visible">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 -z-20 bg-[#0c0906]" />
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.14)_0%,transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0c0906] -z-10 pointer-events-none" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,122,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-20 pb-20 md:pt-28 md:pb-24">
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
          Webtoon <span className="shimmer-text">Bebas Iklan</span>
        </h1>

        {/* ── Subtitle ── */}
        <p className="text-center text-base sm:text-lg md:text-xl text-[#a89282] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up-delay-2">
          Platform baca komik bertema rubah{" "}
          <strong className="text-[#f5ede4] font-semibold">Citsune</strong>{" "}
          dengan ribuan judul bawaan, ekstensi modular, klan komunitas, dan teman AI cerdas.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-sm sm:max-w-none mx-auto mb-12 animate-fade-up-delay-3">
          <a
            href={downloadUrl}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-base bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_32px_rgba(255,122,0,0.4)] hover:shadow-[0_0_48px_rgba(255,122,0,0.55)] active:scale-[0.97] overflow-hidden"
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]" />
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200 relative" aria-hidden="true" />
            <span className="relative">Download KonMik APK</span>
          </a>
          <Link
            href="#screenshots"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-[#f5ede4] text-base bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] hover:bg-[#221a13] transition-all duration-200"
          >
            Preview Aplikasi
            <ChevronRight className="w-4 h-4 text-[#6b5244]" aria-hidden="true" />
          </Link>
        </div>

        {/* ── Stats badges ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-20 animate-fade-up-delay-4">
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

        {/* ══════════════════════════════════════════════════════
            CHARACTER SHOWCASE — Game-style immersive layout
            Character stands FREELY outside/in-front of panel
            ══════════════════════════════════════════════════════ */}
        <div className="relative max-w-4xl mx-auto">

          {/* ── Ambient stage glow behind everything ── */}
          <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* ── Main info panel (glass card) ──
               Uses lg:ml-48 to leave space for character on the left on desktop.
               On mobile, character shows centered above panel. */}
          <div className="relative lg:ml-44 xl:ml-52 rounded-3xl border border-[rgba(255,122,0,0.18)] bg-[#18120e]/90 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Panel inner decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,122,0,0.07),transparent_55%)] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.4)] to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.15)] to-transparent" />

            <div className="relative p-6 sm:p-8">
              {/* Citsune avatar + name row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[rgba(255,122,0,0.5)] shadow-[0_0_16px_rgba(255,122,0,0.3)] bg-[#1a1109] shrink-0 animate-float">
                  <Image
                    src={`${CDN}/citsune.jpg`}
                    alt="Citsune mascot"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#ff7a00]">Maskot Resmi KonMik</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#f5ede4] leading-tight">
                    Temui Citsune, Adik Rubahmu!
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#a89282] leading-relaxed mb-6">
                Butuh rekomendasi komik? Mau rekap alur bab sebelumnya? Citsune hadir langsung di dalam
                aplikasi — cerdas, imut, dan selalu siap menemani petualangan membacamu.
              </p>

              {/* Feature bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {[
                  { t: "Ekstensi sumber modular JS",      c: "text-[#ff7a00]"   },
                  { t: "Reader Ultra HD bertema rubah",   c: "text-amber-400"   },
                  { t: "Klan & papan peringkat aktif",    c: "text-purple-400"  },
                  { t: "Obrolan komunitas dalam-app",     c: "text-emerald-400" },
                ].map(({ t, c }) => (
                  <div key={t} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#110d09] border border-[#2a1d14]">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c === "text-[#ff7a00]" ? "bg-[#ff7a00]" : c === "text-amber-400" ? "bg-amber-400" : c === "text-purple-400" ? "bg-purple-400" : "bg-emerald-400"}`} />
                    <span className="text-xs text-[#a89282]">{t}</span>
                  </div>
                ))}
              </div>

              {/* CTA inside panel */}
              <a
                href={downloadUrl}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_20px_rgba(255,122,0,0.3)] hover:shadow-[0_0_32px_rgba(255,122,0,0.5)] active:scale-[0.97] overflow-hidden"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]" />
                <Download className="w-4 h-4 relative" aria-hidden="true" />
                <span className="relative">Download APK Gratis</span>
              </a>
            </div>
          </div>

          {/* ══ CHARACTER — Free-standing, NO container, NO border ══
               Desktop: absolute left-0, tall, overlapping panel's left edge
               Mobile:  relative, centered above panel, shown above with negative margin */}

          {/* Mobile version: shown above panel */}
          <div className="lg:hidden flex justify-center -mb-8 relative z-10">
            <div className="relative w-44 h-64 pointer-events-none select-none">
              {/* Stage floor glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-[rgba(255,122,0,0.3)] blur-2xl rounded-full" />
              {/* Character light cone from above */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-[linear-gradient(to_bottom,rgba(255,122,0,0.08),transparent_80%)] rounded-full blur-xl" />
              <Image
                src={`${CDN}/CitsunePose1.png`}
                alt="Citsune character"
                fill
                unoptimized
                className="object-contain object-bottom drop-shadow-[0_0_32px_rgba(255,122,0,0.6)]"
                style={{ filter: "drop-shadow(0 0 24px rgba(255,122,0,0.5))" }}
              />
            </div>
          </div>

          {/* Desktop version: absolute, bleeds LEFT outside panel */}
          <div
            className="hidden lg:block absolute left-0 -top-14 bottom-0 w-48 xl:w-56 pointer-events-none select-none z-10"
          >
            {/* Stage floor ellipse glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[rgba(255,122,0,0.35)] blur-2xl rounded-full" />
            {/* Character light cone */}
            <div className="absolute inset-x-4 top-0 h-3/4 bg-[linear-gradient(to_bottom,rgba(255,122,0,0.06),transparent)] blur-lg rounded-full" />
            <Image
              src={`${CDN}/CitsunePose1.png`}
              alt="Citsune character"
              fill
              unoptimized
              className="object-contain object-bottom transition-transform duration-700 hover:scale-105"
              style={{ filter: "drop-shadow(0 4px 32px rgba(255,122,0,0.55))" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

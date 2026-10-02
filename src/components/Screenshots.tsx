"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles, Eye, Trophy, BookOpen, Bot, User, BookMarked,
  Smartphone, ChevronLeft, ChevronRight, Pause, Play,
} from "lucide-react";

interface ScreenshotItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  icon: typeof Sparkles;
  accent: string;
  highlights: [string, string];
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "home",
    title: "Beranda Interaktif",
    tagline: "Eksplorasi Ribuan Komik Tanpa Batas",
    desc: "Pintu gerbang utama untuk menemukan update terbaru, judul trending terpanas, filter genre lengkap, serta navigasi intuitif yang cepat dan responsif.",
    image: "/screenshots/ss_home.jpg",
    icon: Sparkles,
    accent: "#ff7a00",
    highlights: [
      "Rekomendasi judul harian & update komik terkini",
      "Navigasi intuitif yang cepat & ringan",
    ],
  },
  {
    id: "detail",
    title: "Detail Komik",
    tagline: "Informasi Lengkap & Ganti Sumber Instan",
    desc: "Lihat sinopsis, rating, dan ratusan bab. Pindah server sumber baca secara instan jika ada bab macet, tandai progres baca otomatis, dan unduh chapter untuk dibaca nanti.",
    image: "/screenshots/ss_detail.jpg",
    icon: BookMarked,
    accent: "#f59e0b",
    highlights: [
      "Pindah server sumber komik 1-klik tanpa repot",
      "Tandai bab selesai & simpan ke folder kustom",
    ],
  },
  {
    id: "reader",
    title: "Mode Baca Ultra HD",
    tagline: "Pengalaman Membaca Mulus Tanpa Jeda",
    desc: "Nikmati transisi bab otomatis (Infinite Scroll) tanpa jeda loading, mode gulir vertikal atau Manga horizontal (RTL/LTR), invert color ramah mata malam, serta indikator jam & baterai.",
    image: "/screenshots/ss_reader.jpg",
    icon: Smartphone,
    accent: "#a855f7",
    highlights: [
      "Infinite scroll mengalir mulus tanpa loading antar-bab",
      "100% bebas pop-up iklan & terintegrasi DoH Cloudflare",
    ],
  },
  {
    id: "citsune",
    title: "Asisten AI Citsune",
    tagline: "Teman Cerdas Pendamping Bacamu",
    desc: "Karakter AI interaktif yang selalu setia menemani petualanganmu. Minta rekomendasi komik seru sesuai suasana hatimu, tanyakan rekap alur bab cerita sebelumnya, atau sekadar ngobrol santai.",
    image: "/screenshots/ss_citsune.jpg",
    icon: Bot,
    accent: "#34d399",
    highlights: [
      "Rekomendasi komik pintar berbasis minat & mood",
      "Rekap jalan cerita bab sebelumnya dalam sekejap",
    ],
  },
  {
    id: "collection",
    title: "Koleksi & Offline",
    tagline: "Rak Pribadi Rapi & Bebas Kuota",
    desc: "Kelompokkan manga favorit ke dalam folder custom, sinkronisasi otomatis riwayat baca ke akun cloud, serta nikmati chapter yang sudah diunduh kapan saja tanpa koneksi internet (dukungan CBZ).",
    image: "/screenshots/ss_collection.jpg",
    icon: BookOpen,
    accent: "#60a5fa",
    highlights: [
      "Sinkronisasi riwayat & bookmark otomatis ke cloud",
      "Mode baca offline & dukungan file format CBZ",
    ],
  },
  {
    id: "leaderboard",
    title: "Papan Peringkat",
    tagline: "Adu Dedikasi & Kembangkan Klanmu",
    desc: "Pamerkan jam terbang dan total bab yang kamu selesaikan di tangga Leaderboard mingguan, bulanan, dan sepanjang masa. Pertahankan streak harian dan donasikan poin untuk menaikkan reputasi klan.",
    image: "/screenshots/ss_leaderboard.jpg",
    icon: Trophy,
    accent: "#fbbf24",
    highlights: [
      "Leaderboard jam terbang & total bab terbaca",
      "Sistem level klan & persaingan streak harian",
    ],
  },
  {
    id: "profile",
    title: "Profil & Gacha",
    tagline: "Ekspresikan Identitas Komunitasmu",
    desc: "Raih KonPoin gratis setiap kali kamu membaca komik. Putar gacha untuk mengoleksi border avatar animasi bercahaya, badge kehormatan, dan kustomisasi banner profil yang memukau.",
    image: "/screenshots/ss_profile.jpg",
    icon: User,
    accent: "#ec4899",
    highlights: [
      "Koleksi border avatar animasi bercahaya & glow",
      "KonPoin gratis otomatis dari setiap bab bacaan",
    ],
  },
];

const INTERVAL = 4500;

export default function Screenshots() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const goNext = useCallback(() => {
    setActive((p) => (p + 1) % SCREENSHOTS.length);
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    setActive((p) => (p - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
    setProgress(0);
  }, []);

  // Autoplay with smooth progress
  useEffect(() => {
    if (!playing || hovered) return;
    const step = 50;
    const inc = (step / INTERVAL) * 100;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % SCREENSHOTS.length);
          return 0;
        }
        return p + inc;
      });
    }, step);
    return () => clearInterval(id);
  }, [playing, hovered]);

  const current = SCREENSHOTS[active];

  return (
    <section
      id="screenshots"
      className="py-24 relative overflow-hidden section-glow"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#110d09] -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.3)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.15)] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            Tampilan Nyata Aplikasi
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#f5ede4]">
            Antarmuka Cantik &{" "}
            <span className="shimmer-text">Pengalaman Mulus</span>
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed">
            Jelajahi antarmuka modern dan fitur-fitur unggulan KonMik yang dirancang khusus untuk kenyamanan membaca manga & manhwa.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-5xl mx-auto mb-10">
          {SCREENSHOTS.map((item, idx) => {
            const Icon = item.icon;
            const isCur = idx === active;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(idx); setProgress(0); }}
                style={isCur ? { boxShadow: `0 0 16px ${item.accent}55` } : {}}
                className={`relative overflow-hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isCur
                    ? "bg-[#ff7a00] text-white scale-105"
                    : "bg-[#18120e] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] hover:border-[rgba(255,122,0,0.3)]"
                }`}
                aria-pressed={isCur}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isCur ? "text-white" : "text-[#ff7a00]"}`} aria-hidden="true" />
                <span className="hidden sm:inline">{item.title}</span>
                {/* Progress bar */}
                {isCur && playing && !hovered && (
                  <span
                    className="absolute bottom-0 left-0 h-0.5 bg-white/60 transition-none"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase */}
        <div className="glass-card rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[240px] sm:w-[280px] aspect-[9/19.5] rounded-[40px] p-[10px] bg-gradient-to-b from-[#3d2918] via-[#1e150f] to-[#0e0a07] shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(255,122,0,0.08)] border-[3px] border-[#4a3426] hover:scale-[1.02] transition-transform duration-500">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1a1410]" />
                  <div className="w-8 h-1 rounded-full bg-[#2a1e16]" />
                </div>
                {/* Screen */}
                <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black">
                  <Image
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 640px) 240px, 280px"
                    className="object-cover object-top transition-opacity duration-500 animate-in fade-in"
                    priority
                  />
                </div>
                {/* Phone bottom button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#3d2918] rounded-full" />
              </div>
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              {/* Title badge + play toggle */}
              <div className="flex items-center justify-between gap-3">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    background: `${current.accent}18`,
                    borderColor: `${current.accent}40`,
                    color: current.accent,
                  }}
                >
                  <current.icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {current.title}
                </div>

                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#18120e] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] text-xs font-medium transition-all hover:border-[rgba(255,122,0,0.3)]"
                  title={playing ? "Jeda" : "Putar otomatis"}
                >
                  {playing ? (
                    <><Pause className="w-3 h-3 text-[#ff7a00]" aria-hidden="true" /><span>{hovered ? "Pause (hover)" : "Auto"}</span></>
                  ) : (
                    <><Play className="w-3 h-3 text-emerald-400" aria-hidden="true" /><span>Play</span></>
                  )}
                </button>
              </div>

              {/* Tagline + desc */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f5ede4] mb-3 leading-snug">
                  {current.tagline}
                </h3>
                <p className="text-[#a89282] text-sm sm:text-base leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Highlight pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.highlights.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#110d09] border border-[#2a1d14]"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: current.accent }}
                    />
                    <span className="text-xs text-[#a89282]">{t}</span>
                  </div>
                ))}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-3 border-t border-[#2a1d14]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    aria-label="Screenshot sebelumnya"
                    className="p-2.5 rounded-xl bg-[#18120e] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] hover:border-[rgba(255,122,0,0.3)] transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Screenshot berikutnya"
                    className="p-2.5 rounded-xl bg-[#18120e] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] hover:border-[rgba(255,122,0,0.3)] transition-all active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Screenshot navigation">
                  {SCREENSHOTS.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => { setActive(i); setProgress(0); }}
                      className={`rounded-full transition-all duration-200 ${
                        i === active ? "w-5 h-1.5 bg-[#ff7a00]" : "w-1.5 h-1.5 bg-[#3d2918] hover:bg-[#6b5244]"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <span className="text-xs font-mono text-[#6b5244]">
                  {active + 1}/{SCREENSHOTS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "reader",
    title: "Mode Baca Ultra HD",
    tagline: "Pengalaman Membaca Terbaik",
    desc: "Mendukung resolusi Ultra HD, progress status baterai, estimasi waktu baca, kontrol scroll bertelinga rubah, dan asisten mini Citsune yang setia menemani.",
    image: "/screenshots/ss_reader.jpg",
    icon: Smartphone,
    accent: "#ff7a00",
  },
  {
    id: "detail",
    title: "Detail Komik",
    tagline: "Informasi Lengkap & Multi-Source",
    desc: "Lengkap dengan rating, total bab, ganti sumber komik secara instan, unduh chapter, pelacak progres membaca, dan tombol Mulai Membaca bertelinga rubah.",
    image: "/screenshots/ss_detail.jpg",
    icon: BookMarked,
    accent: "#f59e0b",
  },
  {
    id: "home",
    title: "Beranda Interaktif",
    tagline: "Navigasi Rubah Menggemaskan",
    desc: "Dilengkapi navigasi bertelinga rubah khas Citsune, filter genre, carousel komik terpopuler, dan mini audio player chapter.",
    image: "/screenshots/ss_home.jpg",
    icon: Sparkles,
    accent: "#a78bfa",
  },
  {
    id: "citsune",
    title: "Citsune AI",
    tagline: "Teman Baca Cerdas Pribadimu",
    desc: "Ngobrol santai dengan adik rubah Citsune untuk minta rekomendasi komik seru, rekap alur cerita bab sebelumnya, atau roasting menit bacamu.",
    image: "/screenshots/ss_citsune.jpg",
    icon: Bot,
    accent: "#34d399",
  },
  {
    id: "collection",
    title: "Koleksi & Rak",
    tagline: "Manajemen Bacaan Rapi & Fleksibel",
    desc: "Kelompokkan komik ke dalam grup/rak custom, sinkronisasi otomatis ke cloud, lacak riwayat baca, dan unduh chapter untuk dibaca offline.",
    image: "/screenshots/ss_collection.jpg",
    icon: BookOpen,
    accent: "#60a5fa",
  },
  {
    id: "leaderboard",
    title: "Papan Peringkat",
    tagline: "Bersaing dengan Seluruh Pembaca",
    desc: "Pamerkan jam terbang dan jumlah bab yang kamu selesaikan. Raih peringkat teratas mingguan, bulanan, atau selamanya dengan border avatar bercahaya.",
    image: "/screenshots/ss_leaderboard.jpg",
    icon: Trophy,
    accent: "#fbbf24",
  },
  {
    id: "profile",
    title: "Profil & Gacha",
    tagline: "Ekspresikan Identitas Komunitasmu",
    desc: "Gunakan KonPoin hasil membaca untuk gacha border avatar spesial, gelar bangsawan, badge komunitas, dan kustomisasi profil yang memukau.",
    image: "/screenshots/ss_profile.jpg",
    icon: User,
    accent: "#f472b6",
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
            Lihat fitur-fitur unggulan KonMik dengan UI bertema rubah Citsune yang dirancang untuk pecinta manga & manhwa.
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
                {[
                  "Warna oranye rubah ramah di mata untuk membaca malam",
                  "Aplikasi ringan, responsif, tanpa iklan pop-up",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#110d09] border border-[#2a1d14]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] shrink-0" />
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

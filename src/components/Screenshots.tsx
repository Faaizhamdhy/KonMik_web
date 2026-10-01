"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Eye,
  Trophy,
  BookOpen,
  Bot,
  User,
  BookMarked,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

interface ScreenshotItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  icon: typeof Sparkles;
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "reader",
    title: "Mode Baca Ultra HD",
    tagline: "Pengalaman Membaca Terbaik dengan Floating Citsune",
    desc: "Mendukung resolusi Ultra HD, progress status baterai, estimasi waktu baca, kontrol scroll bertelinga rubah, dan asisten mini Citsune yang setia menemani.",
    image: "/screenshots/ss_reader.jpg",
    icon: Smartphone,
  },
  {
    id: "detail",
    title: "Detail & Info Komik",
    tagline: "Informasi Lengkap, Sinopsis & Multi-Source",
    desc: "Lengkap dengan rating, total bab, ganti sumber komik secara instan, unduh chapter, pelacak progres membaca, dan tombol Mulai Membaca bertelinga rubah.",
    image: "/screenshots/ss_detail.jpg",
    icon: BookMarked,
  },
  {
    id: "home",
    title: "Beranda Interaktif",
    tagline: "Navigasi Rubah yang Menggemaskan",
    desc: "Dilengkapi navigasi bertelinga rubah khas Citsune, filter genre (Action, Manhwa, Manga), carousel komik terpopuler, dan mini audio player chapter.",
    image: "/screenshots/ss_home.jpg",
    icon: Sparkles,
  },
  {
    id: "citsune",
    title: "Citsune AI Companion",
    tagline: "Teman Baca Cerdas Pribadimu",
    desc: "Ngobrol santai dengan adik rubah Citsune untuk minta rekomendasi komik seru, rekap alur cerita bab sebelumnya, atau roasting menit bacamu.",
    image: "/screenshots/ss_citsune.jpg",
    icon: Bot,
  },
  {
    id: "collection",
    title: "Koleksi & Rak Bookmark",
    tagline: "Manajemen Bacaan Rapi & Fleksibel",
    desc: "Kelompokkan komik ke dalam grup/rak custom, sinkronisasi otomatis ke cloud, lacak riwayat baca, dan unduh chapter untuk dibaca offline.",
    image: "/screenshots/ss_collection.jpg",
    icon: BookOpen,
  },
  {
    id: "leaderboard",
    title: "Papan Peringkat",
    tagline: "Bersaing dengan Seluruh Pembaca",
    desc: "Pamerkan jam terbang dan jumlah bab yang kamu selesaikan. Raih peringkat teratas mingguan, bulanan, atau selamanya dengan border avatar bercahaya.",
    image: "/screenshots/ss_leaderboard.jpg",
    icon: Trophy,
  },
  {
    id: "profile",
    title: "Profil & Border Gacha",
    tagline: "Ekspresikan Identitas Komunitasmu",
    desc: "Gunakan KonPoin (KP) hasil membaca untuk gacha border avatar spesial, gelar bangsawan, badge komunitas, dan kustomisasi profil yang memukau.",
    image: "/screenshots/ss_profile.jpg",
    icon: User,
  },
];

const AUTOPLAY_INTERVAL = 4000; // 4 detik per slide

export default function Screenshots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const active = SCREENSHOTS[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SCREENSHOTS.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
    setProgress(0);
  };

  // Autoplay timer dengan progress bar mulus
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const stepMs = 50;
    const progressIncrement = (stepMs / AUTOPLAY_INTERVAL) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % SCREENSHOTS.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  return (
    <section
      id="screenshots"
      className="py-24 relative overflow-hidden bg-card/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Eye className="w-4 h-4" />
            <span>Tampilan Nyata Aplikasi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Antarmuka Cantik & Pengalaman Membaca Mulus
          </h2>
          <p className="text-foreground/75 text-base md:text-lg leading-relaxed">
            Lihat langsung fitur-fitur unggulan KonMik dengan antarmuka bertema rubah Citsune yang dirancang khusus untuk pecinta manga dan manhwa.
          </p>
        </div>

        {/* Feature Nav Tabs with Active Progress Bar */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap max-w-5xl mx-auto mb-10">
          {SCREENSHOTS.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setProgress(0);
                }}
                className={`relative overflow-hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isCurrent
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(255,122,0,0.35)] scale-105"
                    : "bg-card border border-border text-foreground/70 hover:bg-border/40 hover:text-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? "text-white" : "text-primary"}`} />
                <span>{item.title}</span>

                {/* Progress bar line for current active tab */}
                {isCurrent && isPlaying && !isHovered && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-white/70 transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Showcase Main Display */}
        <div className="max-w-5xl mx-auto bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Phone Mockup Frame */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] rounded-[42px] p-3 bg-gradient-to-b from-[#35251b] via-[#211711] to-[#120d0a] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-4 border-[#4a3426] transition-transform duration-500 hover:scale-[1.02]">
                {/* Phone speaker / camera notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1410] mr-2"></div>
                  <div className="w-10 h-1 rounded-full bg-[#2a1e16]"></div>
                </div>

                {/* Screenshot inside phone frame */}
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black">
                  <Image
                    key={active.id}
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover object-top transition-opacity duration-500 animate-in fade-in"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Information & Controls */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold w-fit">
                  <active.icon className="w-3.5 h-3.5" />
                  <span>{active.title}</span>
                </div>

                {/* Autoplay Pause/Play Toggle Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background border border-border text-foreground/60 hover:text-foreground text-xs font-medium transition-colors"
                  title={isPlaying ? "Jeda rotasi otomatis" : "Mulai rotasi otomatis"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-primary" />
                      <span>{isHovered ? "Dijeda (Hover)" : "Otomatis"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-green-400" />
                      <span>Mulai Otomatis</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-snug">
                  {active.tagline}
                </h3>
                <p className="text-foreground/75 text-base sm:text-lg leading-relaxed">
                  {active.desc}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-background/60 border border-border flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  <span className="text-xs sm:text-sm text-foreground/80">
                    Kombinasi warna oranye rubah ramah di mata untuk membaca malam hari
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-background/60 border border-border flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                  <span className="text-xs sm:text-sm text-foreground/80">
                    Aplikasi ringan, responsif, dan tanpa iklan pop-up yang mengganggu
                  </span>
                </div>
              </div>

              {/* Navigation Controls & Progress Dots */}
              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-xl bg-background border border-border hover:bg-border/40 text-foreground transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-xl bg-background border border-border hover:bg-border/40 text-foreground transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {SCREENSHOTS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setActiveIndex(dotIdx);
                        setProgress(0);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        dotIdx === activeIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-foreground/20 hover:bg-foreground/40"
                      }`}
                      aria-label={`Ke slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <span className="text-sm font-mono font-semibold text-foreground/50">
                  {activeIndex + 1} / {SCREENSHOTS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

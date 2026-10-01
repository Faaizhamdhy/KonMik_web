"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, Trophy, BookOpen, Bot, User, ChevronLeft, ChevronRight } from "lucide-react";

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
    id: "home",
    title: "Beranda Interaktif",
    tagline: "Navigasi Rubah yang Menggemaskan",
    desc: "Dilengkapi navigasi bertelinga rubah, rekomendasi komik terpopuler, carousel chapter terbaru, dan mini player chapter.",
    image: "/screenshots/ss_home.jpg",
    icon: Sparkles,
  },
  {
    id: "citsune",
    title: "Citsune AI Companion",
    tagline: "Teman Baca Cerdas Pribadimu",
    desc: "Ngobrol santai dengan adik rubah Citsune untuk minta rekomendasi komik seru, rekap alur cerita, atau roasting menit bacamu.",
    image: "/screenshots/ss_citsune.jpg",
    icon: Bot,
  },
  {
    id: "collection",
    title: "Koleksi & Rak Bookmark",
    tagline: "Manajemen Bacaan Tanpa Batas",
    desc: "Kelompokkan komik ke dalam grup/rak custom, sinkronisasi otomatis ke cloud, lacak riwayat baca, dan unduh chapter untuk offline.",
    image: "/screenshots/ss_collection.jpg",
    icon: BookOpen,
  },
  {
    id: "leaderboard",
    title: "Papan Peringkat",
    tagline: "Bersaing dengan Seluruh Pembaca",
    desc: "Pamerkan jam terbang dan jumlah bab yang kamu selesaikan. Raih peringkat teratas mingguan, bulanan, atau selamanya.",
    image: "/screenshots/ss_leaderboard.jpg",
    icon: Trophy,
  },
  {
    id: "profile",
    title: "Profil & Border Gacha",
    tagline: "Ekspresikan Identitas Komunitasmu",
    desc: "Gunakan KonPoin (KP) hasil membaca untuk gacha border avatar spesial, gelar bangsawan, badge komunitas, dan kustomisasi profil.",
    image: "/screenshots/ss_profile.jpg",
    icon: User,
  },
];

export default function Screenshots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SCREENSHOTS[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  };

  return (
    <section id="screenshots" className="py-24 relative overflow-hidden bg-card/40">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Eye className="w-4 h-4" />
            <span>Tampilan Nyata Aplikasi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Dirancang Khusus untuk Kenyamanan Membaca
          </h2>
          <p className="text-foreground/75 text-base md:text-lg leading-relaxed">
            Intip pengalaman membaca komik modern dengan antarmuka bertema rubah Citsune yang bersih, halus, dan memanjakan mata.
          </p>
        </div>

        {/* Feature Nav Tabs */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap max-w-4xl mx-auto mb-12">
          {SCREENSHOTS.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isCurrent
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(255,122,0,0.35)] scale-105"
                    : "bg-card border border-border text-foreground/70 hover:bg-border/40 hover:text-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? "text-white" : "text-primary"}`} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Main Display */}
        <div className="max-w-5xl mx-auto bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Phone Mockup Frame */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] rounded-[42px] p-3 bg-gradient-to-b from-[#35251b] via-[#211711] to-[#120d0a] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-4 border-[#4a3426]">
                {/* Phone speaker / camera notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1410] mr-2"></div>
                  <div className="w-10 h-1 rounded-full bg-[#2a1e16]"></div>
                </div>

                {/* Screenshot inside phone frame */}
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover object-top transition-all duration-500"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Information & Navigation */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold w-fit">
                <active.icon className="w-3.5 h-3.5" />
                <span>{active.title}</span>
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
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs sm:text-sm text-foreground/80">
                    Kombinasi warna oranye rubah ramah di mata untuk membaca malam hari
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-background/60 border border-border flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs sm:text-sm text-foreground/80">
                    Aplikasi ringan, responsif, dan tanpa iklan pop-up yang mengganggu
                  </span>
                </div>
              </div>

              {/* Next/Prev Navigation Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-xl bg-background border border-border hover:bg-border/40 text-foreground transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-semibold text-foreground/60">
                  {activeIndex + 1} / {SCREENSHOTS.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-xl bg-background border border-border hover:bg-border/40 text-foreground transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

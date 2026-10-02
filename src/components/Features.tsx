"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Smartphone,
  Layers,
  Puzzle,
  Download,
  Bot,
  Gem,
  Shield,
  Trophy,
  MessagesSquare,
  Sparkles,
  BookOpen,
  Eye,
  CheckCircle2,
  Users,
} from "lucide-react";
import DiscordIcon from "./DiscordIcon";
import WhatsAppIcon from "./WhatsAppIcon";

type CategoryKey = "all" | "reader" | "sources" | "community";

interface CategoryTab {
  id: CategoryKey;
  label: string;
  count: number;
}

const CATEGORIES: CategoryTab[] = [
  { id: "all", label: "Semua Fitur", count: 12 },
  { id: "reader", label: "Pengalaman Baca", count: 4 },
  { id: "sources", label: "Server & Ekstensi", count: 4 },
  { id: "community", label: "AI & Komunitas", count: 4 },
];

const FEATURES = [
  {
    id: "ad-free",
    category: "reader" as const,
    badge: "100% Bersih",
    title: "Bebas Iklan Pop-up",
    tagline: "Fokus Sepenuhnya ke Cerita",
    desc: "Membaca komik dengan tenang tanpa jeda iklan video, pop-up menjebak, atau banner yang menutupi panel cerita.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(52,211,153,0.12)]",
    badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "doh-bypass",
    category: "sources" as const,
    badge: "Bypass DoH",
    title: "Anti-Blokir ISP Bawaan",
    tagline: "Buka Komik Lancar Tanpa VPN",
    desc: "Terintegrasi Cloudflare DNS-over-HTTPS (DoH) otomatis di dalam aplikasi. Semua server & gambar komik terbuka tanpa takut Internet Positif.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20 hover:border-amber-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(251,191,36,0.12)]",
    badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "reader-hd",
    category: "reader" as const,
    badge: "Ultra HD",
    title: "Infinite Scroll & Mode Baca",
    tagline: "Transisi Bab Mengalir Mulus",
    desc: "Perpindahan bab mengalir tanpa jeda bolak-balik (seamless infinite scroll). Mendukung format gulir vertikal, Manga horizontal (RTL/LTR), dan potong gambar panjang.",
    icon: Smartphone,
    color: "text-[#ff7a00]",
    bg: "bg-[#ff7a00]/10",
    border: "border-[#ff7a00]/25 hover:border-[#ff7a00]/50",
    glow: "hover:shadow-[0_8px_32px_rgba(255,122,0,0.16)]",
    badgeBg: "bg-[#ff7a00]/15 text-[#ff9e3b] border-[#ff7a00]/30",
  },
  {
    id: "multi-source",
    category: "sources" as const,
    badge: "10+ Server",
    title: "Multi-Source & Switch 1-Klik",
    tagline: "Dukungan Multi-Sumber Fleksibel",
    desc: "Terhubung ke Shinigami, Komikindo, Kiryuu, MangaDex, Ainz, Ikiru, Luvyaa, dan lainnya. Pindah server seketika jika ada bab yang bermasalah.",
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    id: "extensions",
    category: "sources" as const,
    badge: "Modular JS",
    title: "Katalog Ekstensi Modular",
    tagline: "Pasang Sumber Tambahan Bebas",
    desc: "Pasang ekstensi scraper baru hanya dengan salin link Gist atau 1-klik deep-link. Fleksibel, aman, dan dapat diperbarui sewaktu-waktu.",
    icon: Puzzle,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20 hover:border-purple-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]",
    badgeBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "offline-cbz",
    category: "reader" as const,
    badge: "Hemat Kuota",
    title: "Unduh Offline & Format CBZ",
    tagline: "Baca Kapan Saja Tanpa Internet",
    desc: "Unduh bab komik di latar belakang untuk dinikmati saat offline. Dilengkapi fitur import dan export format arsip komik `.cbz`.",
    icon: Download,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(34,211,238,0.12)]",
    badgeBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "citsune-ai",
    category: "community" as const,
    badge: "AI Companion",
    title: "Asisten Cerdas Citsune AI",
    tagline: "Teman Cerdas Pendamping Baca",
    desc: "Minta rekomendasi komik seru sesuai mood harianmu, atau minta ringkasan rekap cerita bab sebelumnya secara cerdas dalam hitungan detik.",
    icon: Bot,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(52,211,153,0.12)]",
    badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "konpoin-gacha",
    category: "community" as const,
    badge: "Gamifikasi",
    title: "KonPoin & Gacha Avatar",
    tagline: "Reward Nyata Setiap Membaca",
    desc: "Kumpulkan KonPoin gratis setiap selesai membaca chapter. Gunakan poin untuk gacha border avatar profil animasi bercahaya dan stiker eksklusif.",
    icon: Gem,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20 hover:border-pink-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(236,72,153,0.12)]",
    badgeBg: "bg-pink-500/15 text-pink-300 border-pink-500/30",
  },
  {
    id: "clan-system",
    category: "community" as const,
    badge: "Klan & Guild",
    title: "Sistem Klan & Peringkat",
    tagline: "Bangun Dinasti Bersama Teman",
    desc: "Buat atau gabung ke klan favorit. Donasikan poin untuk menaikkan level klan dan bersaing di tangga peringkat klan teratas se-Indonesia.",
    icon: Shield,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    id: "leaderboard-streak",
    category: "community" as const,
    badge: "Kompetisi",
    title: "Leaderboard & Streak Harian",
    tagline: "Pamerkan Jam Terbang Membacamu",
    desc: "Tembus jajaran pembaca elit berdasarkan jumlah bab selesai. Rawat streak membaca setiap hari untuk melipatgandakan reward bonus poin.",
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(234,179,8,0.12)]",
    badgeBg: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  },
  {
    id: "chat-comments",
    category: "community" as const,
    badge: "Interaksi Sosial",
    title: "Obrolan Global & Diskusi Bab",
    tagline: "Diskusi Teori Antar Penikmat Komik",
    desc: "Komentari momen seru di tiap babak komik, nongkrong di Global Chat room, atau temukan teman baca baru lewat sistem matchmaking minat komik.",
    icon: MessagesSquare,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20 hover:border-violet-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
    badgeBg: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  {
    id: "creator-hub",
    category: "sources" as const,
    badge: "Karya Lokal",
    title: "Creator Hub & Originals",
    tagline: "Panggung Bagi Komikus Mandiri",
    desc: "Wadah spesial bagi komikus dan kreator independen untuk mengunggah chapter komik buatan sendiri langsung ke hadapan ribuan pembaca KonMik.",
    icon: Sparkles,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20 hover:border-rose-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(244,63,94,0.12)]",
    badgeBg: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
];

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: "100% Bebas Iklan Pop-up", sub: "Baca nyaman tanpa distraksi" },
  { icon: Zap, label: "Bypass DoH Bawaan", sub: "Semua server komik tanpa VPN" },
  { icon: Layers, label: "10+ Server & Ekstensi JS", sub: "Katalog luas modular & dinamis" },
  { icon: Bot, label: "Asisten Cerdas Citsune", sub: "Rekomendasi & rekap alur bab" },
];

export default function Features({ version = "1.6.2" }: { version?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const displayedFeatures =
    selectedCategory === "all"
      ? FEATURES
      : FEATURES.filter((f) => f.category === selectedCategory);

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0c0906] -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.2)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.1)] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Fitur Lengkap Aplikasi
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-[#f5ede4]">
            Segala yang Kamu Butuhkan,{" "}
            <span className="shimmer-text">Semua Ada di KonMik</span>
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed">
            Dari kenyamanan membaca Ultra HD tanpa iklan, bypass internet positif, ekstensi modular, hingga asisten AI Citsune dan komunitas klan yang seru.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-2xl mx-auto mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#ff7a00] text-white shadow-[0_0_20px_rgba(255,122,0,0.35)] scale-105"
                    : "bg-[#18120e] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] hover:border-[rgba(255,122,0,0.3)]"
                }`}
                aria-pressed={isActive}
              >
                <span>{cat.label}</span>
                <span
                  className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#2a1d14] text-[#a89282]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16">
          {displayedFeatures.map(
            ({ id, title, tagline, desc, icon: Icon, color, bg, border, glow, badge, badgeBg }) => (
              <div
                key={id}
                className={`group p-6 rounded-2xl bg-[#18120e] border transition-all duration-300 flex flex-col justify-between cursor-default ${border} ${glow}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${badgeBg}`}
                    >
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#f5ede4] mb-1 group-hover:text-[#ff7a00] transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs font-semibold text-[#6b5244] mb-3">
                    {tagline}
                  </p>
                  <p className="text-sm text-[#a89282] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
          {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#18120e] border border-[#2a1d14]"
            >
              <div className="w-9 h-9 rounded-xl bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#ff7a00]" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-[#f5ede4] truncate">{label}</p>
                <p className="text-[11px] text-[#a89282] truncate">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e150f] to-[#110d09] border border-[#2a1d14] p-8 sm:p-12 text-center">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,0,0.1),transparent_65%)] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.4)] to-transparent" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.3)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Users className="w-3.5 h-3.5" />
            Komunitas Resmi Pembaca
          </div>

          <h3 className="relative text-2xl sm:text-3xl font-extrabold text-[#f5ede4] mb-3">
            Siap Bergabung Bersama Ribuan Pembaca KonMik?
          </h3>
          <p className="relative text-sm text-[#a89282] mb-8 max-w-xl mx-auto leading-relaxed">
            Dapatkan info rilis komik tercepat, rekomendasi judul terbaru, obrolan santai, dan interaksi langsung bersama developer dan komunitas kami.
          </p>

          {/* Community Buttons */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto mb-6">
            <a
              href="https://discord.gg/YtuBhqtbvM"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-white text-sm bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-200 shadow-[0_0_24px_rgba(88,101,242,0.35)] hover:shadow-[0_0_35px_rgba(88,101,242,0.5)] active:scale-[0.98]"
            >
              <DiscordIcon className="w-5 h-5 shrink-0" />
              <span>Join Discord KonMik</span>
            </a>

            <a
              href="https://chat.whatsapp.com/C0yDtiNTcmV05s4jQwPXNA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-white text-sm bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-200 shadow-[0_0_24px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Join WhatsApp Komunitas</span>
            </a>
          </div>

          <div className="relative pt-2">
            <a
              href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#a89282] hover:text-[#ff7a00] transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>Atau Download Langsung APK KonMik v{version} (Gratis & Bebas Iklan) &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

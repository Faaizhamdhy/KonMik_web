"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Share2,
  Check,
  ExternalLink,
  Clock,
  BookOpen,
  Sparkles,
  Flame,
  Trophy,
  Coins,
  Bookmark,
  MessageSquare,
  Calendar,
  Smartphone,
  Users,
  Heart,
  Swords,
  Star,
  Zap,
  Info,
  Download,
  Layers,
  Award,
  Compass,
  Shield,
} from "lucide-react";
import { FullUserProfile } from "@/lib/user-profile";
import { getBorderInfo, getBannerEffectInfo, getRoleBadgeInfo } from "@/lib/borders";

interface ProfileClientProps {
  profile: FullUserProfile;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "manga" | "social" | "clan">("overview");

  const border = getBorderInfo(profile.equippedBorder);
  const bannerEffect = getBannerEffectInfo(profile.equippedBannerEffect);
  const roleBadge = getRoleBadgeInfo(profile.role);

  // Format numbers to Indonesian format
  const formatNum = (num: number) => num.toLocaleString("id-ID");
  const formatHours = (minutes: number) => (minutes / 60).toFixed(1);

  // Copy Profile Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Open in KonMik mobile app deep link
  const handleOpenApp = () => {
    const deepLink = `konmik://user/${encodeURIComponent(profile.username)}`;
    window.location.href = deepLink;
    setTimeout(() => {
      // Fallback hint after 1.5s if app didn't intercept
    }, 1500);
  };

  // Calculate highest reading day for chart height scaling
  const maxWeeklyMinutes = Math.max(
    ...profile.weeklyMinutes.map((w) => w.minutes),
    60
  );

  return (
    <div className="w-full">
      {/* ═════════════════════════════════════════════════════════════════════
          1. HERO HEADER: BANNER + AVATAR + IDENTITY
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden bg-[#120d09] border border-[#2a1d14] shadow-2xl mb-8">
        {/* Banner Area */}
        <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden bg-[#1a110a]">
          {profile.bannerUrl ? (
            <img
              src={profile.bannerUrl}
              alt="Banner"
              className="w-full h-full object-cover object-center select-none"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#20150e] via-[#2d1b11] to-[#1a0f08]" />
          )}

          {/* Banner Effect Overlay */}
          {bannerEffect && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 animate-pulse"
              style={{ background: bannerEffect.gradientCss }}
            />
          )}

          {/* Banner Dark Vignette Gradients */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#120d09] via-[#120d09]/70 to-transparent" />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Top-Right Banner Effect Badge */}
          {bannerEffect && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md border border-white/20 text-[#f5ede4] shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#ff7a00]" />
                {bannerEffect.name}
              </span>
            </div>
          )}
        </div>

        {/* Profile Identity Bar */}
        <div className="relative px-5 sm:px-8 pb-6 sm:pb-8 pt-0 -mt-16 sm:-mt-20 z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Avatar & Main Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Avatar with Equipped Border */}
              <div className="relative shrink-0 group">
                <div
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: border ? border.gradientCss : "linear-gradient(135deg, #2a1d14, #422d20)",
                    boxShadow: border ? border.glowCss : "0 0 15px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="w-full h-full rounded-[20px] overflow-hidden bg-[#140e0a] relative">
                    {profile.profileUrl ? (
                      <img
                        src={profile.profileUrl}
                        alt={profile.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-[#ff7a00] bg-[#1a110a]">
                        {profile.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Rarity Tag over Avatar */}
                {border && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0c0906] border border-white/20 text-[#ff7a00] shadow-md">
                    {border.rarity}
                  </span>
                )}
              </div>

              {/* Name, Username, Role, Clan Tag */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate max-w-sm sm:max-w-md drop-shadow-sm"
                    style={{
                      color: profile.customNameColor || "#f5ede4",
                    }}
                  >
                    {profile.displayName}
                  </h1>

                  {/* Role Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold border ${roleBadge.borderClass} ${roleBadge.badgeClass}`}
                  >
                    <span>{roleBadge.icon}</span>
                    <span>{roleBadge.label}</span>
                  </span>

                  {/* Clan Tag Pill */}
                  {profile.clan && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border"
                      style={{
                        borderColor: profile.clan.color_hex || "#5AC8FA",
                        backgroundColor: `${profile.clan.color_hex || "#5AC8FA"}15`,
                        color: profile.clan.color_hex || "#5AC8FA",
                      }}
                      title={`Klan: ${profile.clan.name} (Peringkat #${profile.clan.rank})`}
                    >
                      <Shield className="w-3 h-3" />
                      <span>[{profile.clan.tag}]</span>
                    </span>
                  )}
                </div>

                {/* Handle & TikTok badge */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-[#a89282]">
                  <span className="font-mono text-[#d8c3b2]">@{profile.username}</span>
                  {profile.isTiktokCreator && (
                    <a
                      href={`https://www.tiktok.com/@${profile.tiktokUsername || profile.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#FE2C55]/15 text-[#FE2C55] border border-[#FE2C55]/30 hover:bg-[#FE2C55]/25 transition-colors"
                    >
                      <span>Creator TikTok</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {profile.createdAt && (
                    <span className="flex items-center gap-1 text-[11px] text-[#786355]">
                      <Calendar className="w-3 h-3" />
                      Bergabung {profile.createdAt.split(" ")[0]}
                    </span>
                  )}
                </div>

                {/* Selected & Custom Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1.5">
                  {profile.customTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold border shadow-sm cursor-help"
                      style={{
                        backgroundColor: `${tag.color_hex}18`,
                        borderColor: `${tag.color_hex}40`,
                        color: tag.color_hex,
                      }}
                      title={tag.description || tag.tag_name}
                    >
                      <span>{tag.emoji}</span>
                      <span>{tag.tag_name}</span>
                      {tag.version_text && (
                        <span className="text-[10px] opacity-75 font-mono">({tag.version_text})</span>
                      )}
                    </span>
                  ))}

                  {profile.selectedTags
                    .filter((st) => !profile.customTags.some((ct) => `${ct.emoji} ${ct.tag_name}` === st))
                    .map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-[#1e1510] border border-[#2a1d14] text-[#d8c3b2]"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: App Deep link, Copy Link */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleOpenApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_20px_rgba(255,122,0,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Buka di Aplikasi</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#f5ede4] bg-[#1a110a] hover:bg-[#251810] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all duration-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#ff7a00]" />
                    <span>Bagikan Profil</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          2. KEY STATS CARDS (8-METRIC GRID)
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {/* Total Waktu Baca */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <Clock className="w-4 h-4 text-[#ff7a00]" />
            <span>Waktu Membaca</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {formatNum(profile.minutes)}{" "}
            <span className="text-xs font-normal text-[#a89282]">menit</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">
            &asymp; {formatHours(profile.minutes)} Jam
          </div>
        </div>

        {/* Bab Dibaca */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Bab Dibaca</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {formatNum(profile.chapters)}{" "}
            <span className="text-xs font-normal text-[#a89282]">chapter</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">
            Dari {formatNum(profile.comics)} Komik
          </div>
        </div>

        {/* Streak Membaca */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Streak Aktif</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {profile.streak} <span className="text-xs font-normal text-[#a89282]">hari</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">
            Rekor Tertinggi: {profile.maxStreak} Hari
          </div>
        </div>

        {/* Peringkat Global */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>Leaderboard</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {profile.globalRank ? (
              <>
                #{profile.globalRank}{" "}
                <span className="text-xs font-normal text-emerald-400">Global</span>
              </>
            ) : (
              <span className="text-sm font-normal text-[#786355]">Top 100+</span>
            )}
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">
            Papan Peringkat Pembaca
          </div>
        </div>

        {/* KonPoin */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>KonPoin</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {formatNum(profile.konpoin)}{" "}
            <span className="text-xs font-normal text-amber-400">KP</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">Mata Uang Komunitas</div>
        </div>

        {/* Rekor 1 Hari */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Rekor Harian</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {formatNum(profile.maxDailyMinutes)}{" "}
            <span className="text-xs font-normal text-[#a89282]">menit</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">
            &asymp; {formatHours(profile.maxDailyMinutes)} Jam dalam 1 hari
          </div>
        </div>

        {/* Total Bookmark */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <Bookmark className="w-4 h-4 text-purple-400" />
            <span>Koleksi Bookmark</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {formatNum(profile.totalBookmarks)}{" "}
            <span className="text-xs font-normal text-[#a89282]">judul</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">Komik Disimpan</div>
        </div>

        {/* Total Komentar */}
        <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all">
          <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Komentar Komunitas</span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            {formatNum(profile.totalComments)}{" "}
            <span className="text-xs font-normal text-[#a89282]">ulasan</span>
          </div>
          <div className="text-[11px] text-[#786355] mt-0.5">Interaksi Komik</div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          3. TAB NAVIGATION (Overview, Manga Favorit, Klan & Relasi)
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 border-b border-[#2a1d14] pb-2 mb-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "overview"
              ? "bg-[#ff7a00] text-white shadow-md"
              : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
          }`}
        >
          Ringkasan & Analitik
        </button>

        {profile.topMangas.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("manga")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === "manga"
                ? "bg-[#ff7a00] text-white shadow-md"
                : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
            }`}
          >
            Manga Teratas ({profile.topMangas.length})
          </button>
        )}

        {profile.relationships.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab("social")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === "social"
                ? "bg-[#ff7a00] text-white shadow-md"
                : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
            }`}
          >
            Hubungan ({profile.relationships.length})
          </button>
        )}

        {profile.clan && (
          <button
            type="button"
            onClick={() => setActiveTab("clan")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === "clan"
                ? "bg-[#ff7a00] text-white shadow-md"
                : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
            }`}
          >
            Klan [{profile.clan.tag}]
          </button>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          4. TAB CONTENT: OVERVIEW
          ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Grid 2 Kolom: Aktivitas 7 Hari + Ritual Waktu Baca */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Reading Activity Chart */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#ff7a00]" />
                  <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                    Aktivitas Membaca 7 Hari Terakhir
                  </h3>
                </div>
                <span className="text-[11px] text-[#786355]">
                  Bulan ini: {formatNum(profile.thisMonthMinutes)} mnt
                </span>
              </div>

              {profile.weeklyMinutes.length > 0 ? (
                <div className="space-y-3">
                  <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2 border-b border-[#22160e]">
                    {profile.weeklyMinutes.map((w, i) => {
                      const heightPercent = Math.min(
                        100,
                        Math.max(10, Math.round((w.minutes / maxWeeklyMinutes) * 100))
                      );
                      const dayLabel = new Date(w.date).toLocaleDateString("id-ID", {
                        weekday: "narrow",
                      });
                      const isToday = i === profile.weeklyMinutes.length - 1;

                      return (
                        <div key={w.date} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          {/* Tooltip on Hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-black/90 text-[#f5ede4] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap -mb-1">
                            {w.minutes}m
                          </div>

                          {/* Bar */}
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 ${
                              isToday
                                ? "bg-gradient-to-t from-[#ff7a00] to-[#ffaa44] shadow-[0_0_12px_rgba(255,122,0,0.5)]"
                                : "bg-[#251810] group-hover:bg-[#ff7a00]/70"
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />

                          {/* Day Label */}
                          <span
                            className={`text-[10px] font-bold ${
                              isToday ? "text-[#ff7a00]" : "text-[#786355]"
                            }`}
                          >
                            {dayLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#786355] pt-1">
                    <span>Hari ini: <strong className="text-[#f5ede4]">{profile.todayMinutes} menit</strong></span>
                    <span>Rata-rata: <strong className="text-[#f5ede4]">{Math.round(profile.minutes / Math.max(profile.streak, 1))} mnt/hari</strong></span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#786355] py-8 text-center">
                  Belum ada log aktivitas bacaan mingguan.
                </p>
              )}
            </div>

            {/* Time of Day Distribution */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                  Waktu Membaca Favorit
                </h3>
              </div>

              <div className="space-y-3.5">
                {[
                  { label: "Malam (21:00 - 06:00)", icon: "🌙", pct: profile.readingTimeDistribution.malam, col: "bg-indigo-500" },
                  { label: "Pagi (06:00 - 12:00)", icon: "🌅", pct: profile.readingTimeDistribution.pagi, col: "bg-amber-500" },
                  { label: "Siang (12:00 - 18:00)", icon: "☀️", pct: profile.readingTimeDistribution.siang, col: "bg-orange-500" },
                  { label: "Sore (18:00 - 21:00)", icon: "🌆", pct: profile.readingTimeDistribution.sore, col: "bg-rose-500" },
                ].map(({ label, icon, pct, col }) => (
                  <div key={label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#a89282] flex items-center gap-1.5">
                        <span>{icon}</span>
                        <span>{label}</span>
                      </span>
                      <span className="font-bold text-[#f5ede4] font-mono">{pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#1e1510] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${col}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Genres Preferences */}
          {profile.topGenres.length > 0 && (
            <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-[#ff7a00]" />
                <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                  Genre Paling Banyak Dibaca
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {profile.topGenres.slice(0, 10).map((g, idx) => (
                  <div
                    key={g.genre}
                    className="p-3 rounded-2xl bg-[#1a110a] border border-[#2a1d14] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-extrabold text-[#f5ede4] truncate">{g.genre}</span>
                      <span className="text-[10px] text-[#ff7a00] font-mono">#{idx + 1}</span>
                    </div>
                    <div className="text-xs text-[#a89282]">
                      <strong className="text-[#f5ede4]">{g.count}</strong> komik dibaca
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Border Showcase & Cosmetics Collection */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                  Etalase Border Avatar
                </h3>
              </div>
              <span className="text-xs text-[#a89282]">
                Total Dimiliki: <strong className="text-[#ff7a00]">{profile.ownedBordersCount}</strong> Border
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.showcaseBorders.map((bId) => {
                const b = getBorderInfo(bId);
                if (!b) return null;

                return (
                  <div
                    key={bId}
                    className="p-4 rounded-2xl bg-[#1a110a] border border-[#2a1d14] flex items-center gap-3.5 hover:border-[#ff7a00]/40 transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl p-0.5 shrink-0"
                      style={{
                        background: b.gradientCss,
                        boxShadow: b.glowCss,
                      }}
                    >
                      <div className="w-full h-full rounded-[14px] bg-[#140e0a] flex items-center justify-center text-xs font-bold text-[#ff7a00]">
                        ★
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-[#f5ede4] truncate">{b.name}</div>
                      <span className="text-[10px] font-bold text-[#ff7a00] uppercase tracking-wider">
                        {b.rarity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements Grid */}
          {profile.achievements.length > 0 && (
            <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                    Prestasi & Pencapaian ({profile.achievements.length})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {profile.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#18110b] border border-[#2a1d14] flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="text-xl shrink-0">{ach.split(" ")[0]}</span>
                    <span className="text-xs font-bold text-[#f5ede4] truncate">
                      {ach.split(" ").slice(1).join(" ") || ach}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          5. TAB CONTENT: MANGA FAVORIT
          ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === "manga" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#f5ede4]">
              Manga & Komik Paling Sering Dibaca
            </h3>
            <span className="text-xs text-[#a89282]">
              {profile.topMangas.length} Judul Teratas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {profile.topMangas.map((manga, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all flex flex-col justify-between"
              >
                {/* Cover Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1f150e]">
                  {manga.cover_url ? (
                    <img
                      src={manga.cover_url}
                      alt={manga.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#786355]">
                      No Cover
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Rank Badge */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#0c0906]/90 border border-white/20 text-[#ff7a00]">
                    #{i + 1}
                  </span>

                  {/* Chapter badge */}
                  {manga.chapter_str && (
                    <span className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ff7a00]/90 text-white truncate text-center backdrop-blur-sm">
                      {manga.chapter_str}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="p-3">
                  <h4 className="text-xs font-bold text-[#f5ede4] line-clamp-2 leading-snug group-hover:text-[#ff7a00] transition-colors">
                    {manga.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          6. TAB CONTENT: SOCIAL & RELATIONSHIPS
          ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === "social" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#f5ede4]">
              Koneksi & Hubungan Akun
            </h3>
            <span className="text-xs text-[#a89282]">
              {profile.relationships.length} Terhubung
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.relationships.map((rel) => {
              const relLabel = (() => {
                switch (rel.relation_type) {
                  case "lovers":
                    return { text: "Pasangan", icon: "❤️", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" };
                  case "bestie":
                    return { text: "Sahabat", icon: "⭐", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
                  case "rival":
                    return { text: "Rival", icon: "⚔️", color: "text-red-400 border-red-500/30 bg-red-500/10" };
                  default:
                    return { text: "Rekan", icon: "🤝", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" };
                }
              })();

              return (
                <Link
                  key={rel.id}
                  href={`/u/${encodeURIComponent(rel.user)}`}
                  className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#22160e] border border-[#ff7a00]/30 shrink-0">
                      {rel.profile_url ? (
                        <img
                          src={rel.profile_url}
                          alt={rel.display_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-[#ff7a00]">
                          {rel.display_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="text-sm font-bold truncate group-hover:text-[#ff7a00] transition-colors"
                        style={{ color: rel.custom_name_color || "#f5ede4" }}
                      >
                        {rel.display_name}
                      </h4>
                      <p className="text-xs text-[#786355] truncate font-mono">@{rel.user}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border shrink-0 ${relLabel.color}`}
                  >
                    <span>{relLabel.icon}</span>
                    <span>{relLabel.text}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          7. TAB CONTENT: CLAN
          ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === "clan" && profile.clan && (
        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22160e] pb-5">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold border-2"
                style={{
                  borderColor: profile.clan.color_hex || "#5AC8FA",
                  backgroundColor: `${profile.clan.color_hex || "#5AC8FA"}20`,
                  color: profile.clan.color_hex || "#5AC8FA",
                }}
              >
                [{profile.clan.tag}]
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#f5ede4]">{profile.clan.name}</h3>
                <div className="flex items-center gap-2 text-xs text-[#a89282] mt-0.5">
                  <span>Level {profile.clan.level}</span>
                  <span>&bull;</span>
                  <span className="text-[#ff7a00] font-bold">Peringkat #{profile.clan.rank} Clan</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#1a110a] border border-[#2a1d14] text-xs">
                <span className="text-[#a89282] block text-[10px]">Total Bank KP</span>
                <strong className="text-amber-400 font-extrabold">{formatNum(profile.clan.total_kp)} KP</strong>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#1a110a] border border-[#2a1d14] text-xs">
                <span className="text-[#a89282] block text-[10px]">Total Menit Membaca</span>
                <strong className="text-[#f5ede4] font-extrabold">{formatNum(profile.clan.total_reading_minutes)} mnt</strong>
              </div>
            </div>
          </div>

          {/* Clan Pinned Announcement */}
          {profile.clan.announcements && profile.clan.announcements.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#1a110a] border border-[#ff7a00]/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff7a00]">
                <span>📌 Pengumuman Klan Pilihan:</span>
                <span className="text-[#f5ede4]">{profile.clan.announcements[0].title}</span>
              </div>
              <p className="text-xs text-[#d8c3b2] leading-relaxed">
                &ldquo;{profile.clan.announcements[0].content}&rdquo;
              </p>
              <div className="text-[10px] text-[#786355]">
                Oleh {profile.clan.announcements[0].author_display_name || "Ketua"} &bull;{" "}
                {profile.clan.announcements[0].created_at}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          8. FOOTER CALLOUT: DOWNLOAD KONMIK APP
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1b1009] via-[#24140b] to-[#160c07] border border-[#ff7a00]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#f5ede4]">
            Ingin Membaca Komik & Berteman dengan @{profile.username}?
          </h3>
          <p className="text-xs sm:text-sm text-[#a89282] max-w-xl">
            Download aplikasi KonMik Android sekarang — nikmati maraton ribuan manga, manhwa bebas iklan,
            berkenalan di obrolan komunitas, dan kustomisasi profil avatar sesukamu!
          </p>
        </div>

        <a
          href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm bg-[#ff7a00] hover:bg-[#e86e00] transition-all shadow-[0_0_24px_rgba(255,122,0,0.4)] active:scale-[0.98] shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Aplikasi KonMik</span>
        </a>
      </div>
    </div>
  );
}

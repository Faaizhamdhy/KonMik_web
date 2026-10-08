"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Clock,
  BookOpen,
  Flame,
  Trophy,
  Zap,
  Sparkles,
  Shield,
  Smartphone,
  Share2,
  Check,
  Search,
  ExternalLink,
  Layers,
  Award,
  Bookmark,
  MessageSquare,
  Calendar,
  Users,
  Compass,
  Download,
  AlertCircle,
  Cpu,
  Radio,
} from "lucide-react";
import { FullUserProfile } from "@/lib/user-profile";
import { getBorderInfo, getRoleBadgeInfo } from "@/lib/borders";

interface MatrixClientProps {
  initialProfile: FullUserProfile | null;
  initialUsername: string;
  initialToken: string;
  initialSessionStatus: {
    valid: boolean;
    checked: boolean;
    message: string;
  };
}

export default function MatrixClient({
  initialProfile,
  initialUsername,
  initialToken,
  initialSessionStatus,
}: MatrixClientProps) {
  const [profile, setProfile] = useState<FullUserProfile | null>(initialProfile);
  const [username, setUsername] = useState<string>(initialUsername);
  const [token, setToken] = useState<string>(initialToken);
  const [sessionStatus, setSessionStatus] = useState(initialSessionStatus);
  const [activeTab, setActiveTab] = useState<"telemetry" | "economy" | "collection" | "social">("telemetry");
  const [copied, setCopied] = useState(false);
  const [searchUsername, setSearchUsername] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync / Persist to LocalStorage on client
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (username) {
      localStorage.setItem("konmik_matrix_user", username);
      if (token) localStorage.setItem("konmik_matrix_token", token);
    } else {
      // Try restoring last saved user
      const savedUser = localStorage.getItem("konmik_matrix_user");
      const savedToken = localStorage.getItem("konmik_matrix_token") || "";
      if (savedUser) {
        setUsername(savedUser);
        setToken(savedToken);
        loadUser(savedUser, savedToken);
      }
    }
  }, []);

  const loadUser = async (targetUser: string, targetToken = "") => {
    if (!targetUser.trim()) return;
    setLoading(true);
    try {
      // 1. Fetch profile metrics
      const res = await fetch(`/api/stats?user=${encodeURIComponent(targetUser.trim())}`);
      // Also fallback to direct client fetch if custom route not present
      const profileRes = await fetch(`https://api.konkon.id/stats/${encodeURIComponent(targetUser.trim())}`, {
        headers: { "User-Agent": "KonMikWeb/1.0" },
      });

      if (profileRes.ok) {
        // Reload page with query params for complete server-rendered aggregation
        window.location.href = `/matrix?u=${encodeURIComponent(targetUser.trim())}${
          targetToken ? `&token=${encodeURIComponent(targetToken.trim())}` : ""
        }`;
      } else {
        alert("Pengguna tidak ditemukan di server KonMik.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      loadUser(searchUsername.trim(), token);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenApp = () => {
    if (!profile) return;
    const encodedUser = encodeURIComponent(profile.username);
    const isAndroid = typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);

    if (isAndroid) {
      // Android Intent URI: Chrome Android invokes com.konmik directly
      const intentUrl = `intent://profile?u=${encodedUser}#Intent;scheme=konmik;package=com.konmik;end`;
      window.location.href = intentUrl;
      setTimeout(() => {
        window.location.href = `konmik://profile?u=${encodedUser}`;
      }, 500);
    } else {
      window.location.href = `konmik://profile?u=${encodedUser}`;
    }
  };

  const formatNum = (num: number) => num.toLocaleString("id-ID");
  const formatHours = (minutes: number) => (minutes / 60).toFixed(1);

  const border = profile ? getBorderInfo(profile.equippedBorder) : null;
  const roleBadge = profile ? getRoleBadgeInfo(profile.role) : null;

  // Calculate highest reading day for chart height scaling
  const maxWeeklyMinutes = profile
    ? Math.max(...profile.weeklyMinutes.map((w) => w.minutes), 60)
    : 60;

  return (
    <div className="w-full">
      {/* ═════════════════════════════════════════════════════════════════════
          TOP TELEMETRY SYSTEM HUD STRIP
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#100a06] border border-[#2a1d14] text-xs mb-6 font-mono">
        <div className="flex items-center gap-2.5 text-[#a89282]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-[#f5ede4]">MATRIX TELEMETRI ONLINE</span>
          <span className="text-[#5a4233] hidden sm:inline">|</span>
          <span className="text-[#a89282] hidden sm:inline">NODE: api.konkon.id</span>
        </div>

        <div className="flex items-center gap-3">
          {sessionStatus.checked ? (
            sessionStatus.valid ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Check className="w-3 h-3" />
                <span>Sesi Terverifikasi</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <AlertCircle className="w-3 h-3" />
                <span>Sesi Tamu</span>
              </span>
            )
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/5 text-[#a89282] border border-white/10">
              <Radio className="w-3 h-3 text-[#ff7a00]" />
              <span>Mode Penampil</span>
            </span>
          )}

          {profile && (
            <Link
              href={`/u/${encodeURIComponent(profile.username)}`}
              className="inline-flex items-center gap-1 text-[#ff7a00] hover:text-[#e86e00] text-[11px] font-bold transition-colors"
            >
              <span>Profil Publik</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          EMPTY STATE / SWITCH ACCOUNT MODAL
          ═════════════════════════════════════════════════════════════════════ */}
      {!profile && !loading && (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#120d09] border border-[#2a1d14] text-center max-w-xl mx-auto shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#ff7a00]/15 border border-[#ff7a00]/30 mx-auto flex items-center justify-center text-[#ff7a00]">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#f5ede4]">
              Masuk ke Matrix Akun KonMik
            </h2>
            <p className="text-xs sm:text-sm text-[#a89282]">
              Buka menu <strong className="text-[#f5ede4]">Profil &gt; Matrix Akun</strong> di aplikasi KonMik Android, atau ketikkan username Anda di bawah untuk memuat telemetri akun.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              placeholder="Ketik username Anda (cth: aizen)..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#1a110a] border border-[#2a1d14] text-sm text-[#f5ede4] placeholder-[#786355] focus:outline-none focus:border-[#ff7a00]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#ff7a00] hover:bg-[#e86e00] font-bold text-sm text-white transition-all shadow-[0_0_15px_rgba(255,122,0,0.3)] shrink-0 cursor-pointer"
            >
              Buka Matrix
            </button>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════
          PROFILE MATRIX MAIN HUD
          ═════════════════════════════════════════════════════════════════════ */}
      {profile && (
        <>
          {/* 1. HERO IDENTITY CARD */}
          <div className="relative rounded-3xl overflow-hidden bg-[#100a06] border border-[#2a1d14] shadow-2xl mb-8">
            {/* Edge-to-edge backdrop banner */}
            <div className="absolute inset-x-0 top-0 h-56 sm:h-72 w-full overflow-hidden select-none pointer-events-none">
              {profile.bannerUrl ? (
                <img
                  src={profile.bannerUrl}
                  alt="Banner"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[#2a170c] via-[#1a0f08] to-[#100a06]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#100a06]/65 to-[#100a06]" />
            </div>

            {/* Profile Identity Content */}
            <div className="relative z-10 pt-24 sm:pt-36 px-5 sm:px-8 pb-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                {/* Avatar & Identitas */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6 text-center sm:text-left">
                  {/* Circular Avatar with Glowing Border Ring */}
                  <div className="relative shrink-0 flex flex-col items-center group">
                    <div
                      className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 sm:p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xl"
                      style={{
                        background: border ? border.gradientCss : "linear-gradient(135deg, #3d2a1d, #251810)",
                        boxShadow: border ? border.glowCss : "0 0 20px rgba(0,0,0,0.6)",
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#140e0a] border-2 border-[#100a06] relative shadow-inner">
                        {profile.profileUrl ? (
                          <img
                            src={profile.profileUrl}
                            alt={profile.displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-[#ff7a00] bg-[#1a110a]">
                            {profile.displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Border Chip */}
                    {border && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#140e0a]/90 backdrop-blur-md border border-white/15 text-[#d8c3b2] shadow-md">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: border.colors[0] || "#ff7a00" }}
                        />
                        <span className="truncate max-w-[130px]">{border.name}</span>
                        <span className="text-[10px] text-[#ff7a00] font-extrabold">({border.rarity})</span>
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2 min-w-0 pb-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <h1
                        className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate max-w-sm sm:max-w-md drop-shadow-md"
                        style={{ color: profile.customNameColor || "#f5ede4" }}
                      >
                        {profile.displayName}
                      </h1>

                      {roleBadge && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold border ${roleBadge.borderClass} ${roleBadge.badgeClass}`}
                        >
                          <span>{roleBadge.icon}</span>
                          <span>{roleBadge.label}</span>
                        </span>
                      )}

                      {/* Clan Badge with CDN Icon */}
                      {profile.clan && (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border shadow-sm"
                          style={{
                            borderColor: profile.clan.color_hex ? `${profile.clan.color_hex}60` : "#ff7a0060",
                            backgroundColor: profile.clan.color_hex ? `${profile.clan.color_hex}15` : "#ff7a0015",
                            color: profile.clan.color_hex || "#ff7a00",
                          }}
                        >
                          {profile.clan.icon_id ? (
                            <img
                              src={`https://api.konkon.id/static/assets/icon/clan/${profile.clan.icon_id}.png`}
                              alt={profile.clan.tag}
                              className="w-3.5 h-3.5 object-contain shrink-0"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Shield className="w-3 h-3 shrink-0" />
                          )}
                          <span>[{profile.clan.tag.toUpperCase()}]</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-[#a89282]">
                      <span className="font-mono text-[#d8c3b2]">@{profile.username}</span>
                      {profile.createdAt && (
                        <span className="flex items-center gap-1 text-[11px] text-[#786355]">
                          <Calendar className="w-3 h-3" />
                          Bergabung {profile.createdAt.split(" ")[0]}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-[#a89282] border border-white/5">
                        STATUS: AKTIF
                      </span>
                    </div>

                    {/* Tags */}
                    {profile.customTags.length > 0 && (
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                        {profile.customTags.map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold border shadow-sm"
                            style={{
                              backgroundColor: `${tag.color_hex}18`,
                              borderColor: `${tag.color_hex}40`,
                              color: tag.color_hex,
                            }}
                          >
                            <span>{tag.emoji}</span>
                            <span>{tag.tag_name}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
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
                        <span>Bagikan Matrix</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              2. MATRIX MODULE TABS
              ═════════════════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-2 border-b border-[#2a1d14] pb-2 mb-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("telemetry")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "telemetry"
                  ? "bg-[#ff7a00] text-white shadow-md"
                  : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Telemetri Bacaan</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("economy")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "economy"
                  ? "bg-[#ff7a00] text-white shadow-md"
                  : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
              }`}
            >
              <img
                src="https://api.konkon.id/static/assets/konpoin.png"
                alt="KP"
                className="w-4 h-4 object-contain inline-block"
              />
              <span>Ekonomi & Aset KP</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("collection")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "collection"
                  ? "bg-[#ff7a00] text-white shadow-md"
                  : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Koleksi & Kosmetik</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("social")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeTab === "social"
                  ? "bg-[#ff7a00] text-white shadow-md"
                  : "text-[#a89282] hover:text-[#f5ede4] hover:bg-[#1a110a]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Klan & Ekosistem Sosial</span>
            </button>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              TAB 1: TELEMETRI BACAAN
              ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "telemetry" && (
            <div className="space-y-6">
              {/* Telemetry 6-Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* Total Waktu */}
                <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff7a00]" />
                    <span>Waktu Membaca</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#f5ede4]">
                    {formatNum(profile.minutes)} <span className="text-xs text-[#a89282]">mnt</span>
                  </div>
                  <div className="text-[11px] text-[#786355] mt-0.5">
                    &asymp; {formatHours(profile.minutes)} Jam
                  </div>
                </div>

                {/* Bab Dibaca */}
                <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bab Selesai</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#f5ede4]">
                    {formatNum(profile.chapters)} <span className="text-xs text-[#a89282]">bab</span>
                  </div>
                  <div className="text-[11px] text-[#786355] mt-0.5">
                    {formatNum(profile.comics)} Komik
                  </div>
                </div>

                {/* Streak Aktif */}
                <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
                    <Flame className="w-3.5 h-3.5 text-rose-500" />
                    <span>Streak Aktif</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#f5ede4]">
                    {profile.streak} <span className="text-xs text-[#a89282]">hari</span>
                  </div>
                  <div className="text-[11px] text-[#786355] mt-0.5">
                    Rekor: {profile.maxStreak} Hari
                  </div>
                </div>

                {/* Rekor 1 Hari */}
                <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Rekor Harian</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#f5ede4]">
                    {formatNum(profile.maxDailyMinutes)} <span className="text-xs text-[#a89282]">mnt</span>
                  </div>
                  <div className="text-[11px] text-[#786355] mt-0.5">
                    &asymp; {formatHours(profile.maxDailyMinutes)} Jam
                  </div>
                </div>

                {/* Hari Ini */}
                <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hari Ini</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#f5ede4]">
                    {formatNum(profile.todayMinutes)} <span className="text-xs text-[#a89282]">mnt</span>
                  </div>
                  <div className="text-[11px] text-[#786355] mt-0.5">
                    Bulan Ini: {formatNum(profile.thisMonthMinutes)} m
                  </div>
                </div>

                {/* Global Rank */}
                <div className="p-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center gap-2 text-xs text-[#a89282] mb-1">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Leaderboard</span>
                  </div>
                  <div className="text-lg font-extrabold text-[#f5ede4]">
                    {profile.globalRank ? `#${profile.globalRank}` : "Top 100+"}
                  </div>
                  <div className="text-[11px] text-[#786355] mt-0.5">Peringkat Global</div>
                </div>
              </div>

              {/* 7-Day Activity & Ritual Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 7-Day Bar Chart */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#ff7a00]" />
                      <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                        Aktivitas 7 Hari Terakhir
                      </h3>
                    </div>
                    <span className="text-xs text-[#a89282] font-mono">
                      Rekor: {maxWeeklyMinutes} mnt/hari
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 items-end h-44 pt-4 border-b border-[#22160e] pb-2">
                    {profile.weeklyMinutes.map((w, idx) => {
                      const heightPercent = Math.max(
                        (w.minutes / maxWeeklyMinutes) * 100,
                        6
                      );
                      const isTopDay = w.minutes === maxWeeklyMinutes && w.minutes > 0;
                      const dayLabel = new Date(w.date).toLocaleDateString("id-ID", {
                        weekday: "short",
                      });

                      return (
                        <div key={idx} className="flex flex-col items-center h-full justify-end group">
                          <span className="text-[10px] font-mono text-[#a89282] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {w.minutes}m
                          </span>
                          <div className="w-full max-w-[28px] bg-[#1f150e] rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                            <div
                              className={`w-full rounded-t-lg transition-all duration-500 ${
                                isTopDay
                                  ? "bg-gradient-to-t from-[#ff7a00] to-[#ffaa40] shadow-[0_0_12px_rgba(255,122,0,0.5)]"
                                  : w.minutes > 0
                                  ? "bg-[#ff7a00]/70 group-hover:bg-[#ff7a00]"
                                  : "bg-[#2a1d14]"
                              }`}
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <span
                            className={`text-[11px] font-mono mt-2 ${
                              isTopDay ? "text-[#ff7a00] font-bold" : "text-[#786355]"
                            }`}
                          >
                            {dayLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ritual Jam Baca */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <h3 className="font-bold text-sm sm:text-base text-[#f5ede4]">
                        Ritual Jam Membaca
                      </h3>
                    </div>
                    <span className="text-xs text-[#a89282]">Distribusi Waktu</span>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      {
                        label: "Pagi",
                        time: "06:00 - 12:00",
                        pct: profile.readingTimeDistribution.pagi,
                        color: "from-amber-400 to-orange-400",
                      },
                      {
                        label: "Siang",
                        time: "12:00 - 15:00",
                        pct: profile.readingTimeDistribution.siang,
                        color: "from-yellow-400 to-amber-500",
                      },
                      {
                        label: "Sore",
                        time: "15:00 - 18:00",
                        pct: profile.readingTimeDistribution.sore,
                        color: "from-orange-500 to-rose-500",
                      },
                      {
                        label: "Malam",
                        time: "18:00 - 06:00",
                        pct: profile.readingTimeDistribution.malam,
                        color: "from-indigo-400 to-purple-500",
                      },
                    ].map((slot) => (
                      <div key={slot.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#f5ede4]">
                            {slot.label}{" "}
                            <span className="text-[10px] text-[#786355] font-normal">
                              ({slot.time})
                            </span>
                          </span>
                          <span className="font-mono text-[#ff7a00] font-bold">
                            {slot.pct}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#1e1510] overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${slot.color}`}
                            style={{ width: `${Math.max(slot.pct, 2)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              TAB 2: EKONOMI & ASET KP
              ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "economy" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Saldo KonPoin Utama */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c120a] to-[#120a06] border border-[#ff7a00]/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a89282] uppercase tracking-wider">
                      Saldo Resmi Akun
                    </span>
                    <img
                      src="https://api.konkon.id/static/assets/konpoin.png"
                      alt="KP"
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#f5ede4]">
                      {formatNum(profile.konpoin)}{" "}
                      <span className="text-base font-normal text-amber-400">KP</span>
                    </div>
                    <p className="text-xs text-[#a89282] mt-1">
                      Mata uang resmi komunitas pembaca KonMik.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#2a1d14] flex items-center justify-between text-xs text-[#786355]">
                    <span>Nilai Tukar Ekosistem</span>
                    <span className="text-amber-400 font-mono font-bold">1 KP = 1 Loyalitas</span>
                  </div>
                </div>

                {/* Booster Multiplier */}
                <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Zap className="w-4 h-4" />
                    <span>BOOSTER MEMBACA</span>
                  </div>

                  <div className="text-2xl font-extrabold text-[#f5ede4]">
                    {profile.role === "premium" ? "2x Booster Aktif" : "1x Standar"}
                  </div>

                  <p className="text-xs text-[#a89282] leading-relaxed">
                    {profile.role === "premium"
                      ? "Akun Anda menikmati bonus 2x lipat KonPoin dari membaca komik harian (hingga 200 KP/hari) & streak."
                      : "Akun standar memperoleh 1x KonPoin normal. Dapatkan paket Premium di aplikasi untuk melipatgandakan perolehan KP."}
                  </p>
                </div>

                {/* Hadiah Leaderboard */}
                <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span>DISTRIBUSI LEADERBOARD</span>
                  </div>

                  <div className="text-2xl font-extrabold text-[#f5ede4]">
                    {profile.globalRank ? `Peringkat #${profile.globalRank}` : "Peserta Aktif"}
                  </div>

                  <p className="text-xs text-[#a89282] leading-relaxed">
                    Top 99 pembaca teratas di akhir bulan mendapatkan hadiah fantastis ratusan hingga ribuan KonPoin langsung ke saldo akun.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              TAB 3: KOLEKSI & KOSMETIK
              ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "collection" && (
            <div className="space-y-6">
              {/* Equipped Border Preview */}
              <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full p-1.5 shrink-0 flex items-center justify-center shadow-lg"
                    style={{
                      background: border ? border.gradientCss : "linear-gradient(135deg, #3d2a1d, #251810)",
                      boxShadow: border ? border.glowCss : "none",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#140e0a] border border-[#100a06] flex items-center justify-center text-sm font-bold text-[#ff7a00]">
                      ★
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#a89282] uppercase tracking-wider block">
                      Border Avatar Terpasang
                    </span>
                    <h3 className="text-lg font-extrabold text-[#f5ede4]">
                      {border ? border.name : "Border Standar"}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-extrabold text-[#ff7a00]">
                        {border ? border.rarity : "Common"}
                      </span>
                      <span className="text-[#5a4233]">&bull;</span>
                      <span className="text-[#a89282]">
                        Total Koleksi: <strong>{profile.ownedBordersCount}</strong> Border
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#a89282] sm:text-right max-w-xs">
                  {border?.effectLabels && border.effectLabels.length > 0 ? (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-[#ff7a00] block">Buff Kosmetik:</span>
                      {border.effectLabels.map((eff, i) => (
                        <div key={i} className="text-[#d8c3b2]">&bull; {eff}</div>
                      ))}
                    </div>
                  ) : (
                    <span>Kelola & ganti border sesukamu melalui menu Gacha Border di aplikasi KonMik.</span>
                  )}
                </div>
              </div>

              {/* Achievements Grid */}
              {profile.achievements.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <h3 className="font-bold text-base text-[#f5ede4]">
                        Lencana & Pencapaian ({profile.achievements.length})
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {profile.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#18110b] border border-[#2a1d14] flex items-center gap-2.5 shadow-sm"
                      >
                        <span className="text-2xl shrink-0">{ach.split(" ")[0]}</span>
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

          {/* ═════════════════════════════════════════════════════════════════
              TAB 4: KLAN & EKOSISTEM SOSIAL
              ═════════════════════════════════════════════════════════════════ */}
          {activeTab === "social" && (
            <div className="space-y-6">
              {/* Clan Card */}
              {profile.clan ? (
                <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22160e] pb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center p-2.5 shrink-0 border-2"
                        style={{
                          borderColor: profile.clan.color_hex || "#ff7a00",
                          backgroundColor: `${profile.clan.color_hex || "#ff7a00"}18`,
                        }}
                      >
                        {profile.clan.icon_id ? (
                          <img
                            src={`https://api.konkon.id/static/assets/icon/clan/${profile.clan.icon_id}.png`}
                            alt={profile.clan.name}
                            className="w-11 h-11 object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <Shield
                            className="w-8 h-8"
                            style={{ color: profile.clan.color_hex || "#ff7a00" }}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#f5ede4]">{profile.clan.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#a89282] mt-0.5">
                          <span>Level {profile.clan.level}</span>
                          <span>&bull;</span>
                          <span className="text-[#ff7a00] font-bold">Peringkat #{profile.clan.rank || "-"} Klan</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 rounded-xl bg-[#1a110a] border border-[#2a1d14] text-xs">
                        <span className="text-[#a89282] block text-[10px]">Total Bank KP</span>
                        <span className="inline-flex items-center gap-1.5 text-amber-400 font-extrabold">
                          <img
                            src="https://api.konkon.id/static/assets/konpoin.png"
                            alt="KP"
                            className="w-3.5 h-3.5 object-contain inline-block"
                          />
                          <span>{formatNum(profile.clan.total_kp)} KP</span>
                        </span>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-[#1a110a] border border-[#2a1d14] text-xs">
                        <span className="text-[#a89282] block text-[10px]">Total Menit Membaca</span>
                        <strong className="text-[#f5ede4] font-extrabold">{formatNum(profile.clan.total_reading_minutes)} mnt</strong>
                      </div>
                    </div>
                  </div>

                  {profile.clan.announcements && profile.clan.announcements.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#1a110a] border border-[#ff7a00]/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#ff7a00]">
                        <span>📌 Pengumuman Klan:</span>
                        <span className="text-[#f5ede4]">{profile.clan.announcements[0].title}</span>
                      </div>
                      <p className="text-xs text-[#d8c3b2] leading-relaxed">
                        &ldquo;{profile.clan.announcements[0].content}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] text-center text-xs text-[#a89282]">
                  Belum bergabung dengan klan. Temukan atau dirikan klan Anda di menu Klan aplikasi KonMik.
                </div>
              )}

              {/* Relationships */}
              {profile.relationships.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base text-[#f5ede4]">
                      Koneksi Relasi ({profile.relationships.length})
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.relationships.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/u/${encodeURIComponent(rel.user)}`}
                        className="p-4 rounded-2xl bg-[#1a110a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#22160e] border border-[#ff7a00]/30 shrink-0">
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
                            <h4 className="text-xs font-bold truncate group-hover:text-[#ff7a00] transition-colors">
                              {rel.display_name}
                            </h4>
                            <p className="text-[11px] text-[#786355] truncate font-mono">@{rel.user}</p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg border bg-white/5 border-white/10 text-[#d8c3b2]">
                          {rel.relation_type}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

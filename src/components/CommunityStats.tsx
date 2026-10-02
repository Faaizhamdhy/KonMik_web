"use client";

import { useState, useEffect } from "react";
import {
  Download,
  Star,
  Users,
  Sparkles,
  CheckCircle2,
  Heart,
  Activity,
  Smile,
  Zap,
} from "lucide-react";
import { AppStats } from "@/lib/stats";

export default function CommunityStats({
  initialStats,
}: {
  initialStats?: AppStats;
}) {
  const [stats, setStats] = useState<AppStats>(
    initialStats ?? {
      totalDownload: 4000,
      activeReaders: 22,
      avgRating: 4.8,
      totalRatings: 28,
    }
  );

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved user rating from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("konmik_user_rating");
      if (saved) {
        setUserRating(parseInt(saved, 10));
      }
    } catch {
      // ignore
    }
  }, []);

  // Poll live stats every 30 seconds
  useEffect(() => {
    const fetchLatestStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data: AppStats = await res.json();
          setStats((prev) => ({
            ...prev,
            totalDownload: data.totalDownload || prev.totalDownload,
            activeReaders: data.activeReaders || prev.activeReaders,
            avgRating: data.avgRating || prev.avgRating,
            totalRatings: data.totalRatings || prev.totalRatings,
          }));
        }
      } catch {
        // silent fail
      }
    };

    const interval = setInterval(fetchLatestStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRatingClick = async (starValue: number) => {
    if (submitting) return;
    setSubmitting(true);
    setUserRating(starValue);

    try {
      localStorage.setItem("konmik_user_rating", starValue.toString());
    } catch {
      // ignore
    }

    try {
      const res = await fetch("/api/submit-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: starValue }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.avg) {
          setStats((prev) => ({
            ...prev,
            avgRating: data.avg,
            totalRatings: data.total || prev.totalRatings + 1,
          }));
        }
        setToastMessage(`Terima kasih! Kamu memberi ${starValue} bintang ⭐`);
      } else {
        setToastMessage(`Terima kasih atas penilaian ${starValue} bintangmu! ⭐`);
      }
    } catch {
      setToastMessage(`Terima kasih atas penilaian ${starValue} bintangmu! ⭐`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const formatDownload = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M+";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K+";
    return n.toString();
  };

  const activeStarDisplay = hoverRating ?? userRating ?? Math.round(stats.avgRating);

  return (
    <section id="stats" className="py-20 relative overflow-hidden section-glow">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0c0906] -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.25)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.15)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,122,0,0.06),transparent_65%)] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            Statistik & Komunitas Live
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#f5ede4]">
            Dipercaya & Dinikmati Oleh{" "}
            <span className="shimmer-text">Ribuan Pembaca</span>
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed">
            Data metrik langsung dari pengguna aplikasi dan komunitas KonMik yang terus bertumbuh setiap harinya.
          </p>
        </div>

        {/* 3 Core Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          
          {/* Card 1: Total Downloads Tracker */}
          <div className="group relative p-6 rounded-3xl bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(255,122,0,0.12)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.25)] flex items-center justify-center text-[#ff7a00] group-hover:scale-110 transition-transform duration-200">
                <Download className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Tracker
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#f5ede4] mb-1 font-mono tracking-tight">
                {formatDownload(stats.totalDownload)}
              </div>
              <p className="text-xs font-bold text-[#ff7a00] uppercase tracking-wider mb-2">
                Total Download APK
              </p>
              <p className="text-xs text-[#a89282] leading-relaxed">
                Diunduh dari rilis GitHub Releases resmi KonMik di seluruh Indonesia.
              </p>
            </div>
          </div>

          {/* Card 2: Interactive Community Rating */}
          <div className="group relative p-6 rounded-3xl bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(245,158,11,0.4)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(245,158,11,0.12)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/12 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-200">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {stats.totalRatings} Ulasan
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#f5ede4] font-mono tracking-tight">
                  {stats.avgRating.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-amber-400">/ 5.0</span>
              </div>

              {/* Star Rating Widget */}
              <div
                className="flex items-center gap-1 mb-2 pt-0.5"
                onMouseLeave={() => setHoverRating(null)}
              >
                {[1, 2, 3, 4, 5].map((val) => {
                  const isFilled = val <= activeStarDisplay;
                  return (
                    <button
                      key={val}
                      type="button"
                      disabled={submitting}
                      onClick={() => handleRatingClick(val)}
                      onMouseEnter={() => setHoverRating(val)}
                      className="p-0.5 text-lg transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      aria-label={`Beri nilai ${val} bintang`}
                    >
                      <Star
                        className={`w-4 h-4 transition-colors ${
                          isFilled
                            ? "text-amber-400 fill-amber-400"
                            : "text-[#3d2918] fill-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-[#a89282] leading-tight">
                {userRating
                  ? `Nilai Anda: ${userRating} ★ (Tersimpan)`
                  : "Klik bintang di atas untuk memberi penilaian!"}
              </p>
            </div>
          </div>

          {/* Card 3: Active Readers Real-time Ping */}
          <div className="group relative p-6 rounded-3xl bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(52,211,153,0.4)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(52,211,153,0.12)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-200">
                <Users className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Online Sekarang
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#f5ede4] mb-1 font-mono tracking-tight flex items-baseline gap-2">
                <span>{stats.activeReaders}</span>
                <span className="text-xs font-semibold text-[#a89282]">pembaca</span>
              </div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Pembaca Aktif (Ping API)
              </p>
              <p className="text-xs text-[#a89282] leading-relaxed">
                Terhubung real-time dari heartbeat ping server aplikasi backend KonMik (api.konkon.id).
              </p>
            </div>
          </div>

        </div>

        {/* Rating Toast Notification */}
        {toastMessage && (
          <div className="max-w-md mx-auto mb-10 p-3.5 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-amber-500 text-white font-bold text-xs sm:text-sm text-center shadow-[0_8px_30px_rgba(255,122,0,0.35)] animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-white" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 3 Satisfaction & Quality Progress Meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
            <div className="flex justify-between items-center mb-2.5">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#f5ede4]">
                <Smile className="w-4 h-4 text-emerald-400" />
                Kepuasan Pembaca
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">98%</span>
            </div>
            <div className="h-2 bg-[#22160e] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[98%]" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
            <div className="flex justify-between items-center mb-2.5">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#f5ede4]">
                <Zap className="w-4 h-4 text-[#ff7a00]" />
                Kecepatan & Responsif
              </span>
              <span className="text-xs sm:text-sm font-black text-[#ff7a00] font-mono">96%</span>
            </div>
            <div className="h-2 bg-[#22160e] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ff7a00] to-amber-400 rounded-full w-[96%]" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#140e0a] border border-[#2a1d14]">
            <div className="flex justify-between items-center mb-2.5">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#f5ede4]">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                100% Bebas Iklan Pop-up
              </span>
              <span className="text-xs sm:text-sm font-black text-blue-400 font-mono">100%</span>
            </div>
            <div className="h-2 bg-[#22160e] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full w-[100%]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

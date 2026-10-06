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
  MessageSquare,
  Quote,
  Smartphone,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import { AppStats, UserReview } from "@/lib/stats";

export default function CommunityStats({
  initialStats,
  initialReviews,
}: {
  initialStats?: AppStats;
  initialReviews?: UserReview[];
}) {
  const [stats, setStats] = useState<AppStats>(
    initialStats ?? {
      totalDownload: 4000,
      activeReaders: 22,
      avgRating: 4.8,
      totalRatings: 28,
    }
  );
  const [reviews, setReviews] = useState<UserReview[]>(initialReviews ?? []);

  // Filter & Pagination State
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleReviewExpand = (reviewKey: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewKey]: !prev[reviewKey],
    }));
  };

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

  // Poll live stats and reviews every 30 seconds
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

    const fetchLatestReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setReviews(data);
          }
        }
      } catch {
        // silent fail
      }
    };

    const interval = setInterval(() => {
      fetchLatestStats();
      fetchLatestReviews();
    }, 30000);
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

  // Filter reviews by selected rating
  const filteredReviews = selectedRating === null
    ? reviews
    : reviews.filter((r) => Math.round(r.rating) === selectedRating);

  const INITIAL_LIMIT = 4;
  const displayedReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, INITIAL_LIMIT);

  // Rating counts for filter chips
  const ratingCounts = {
    all: reviews.length,
    5: reviews.filter((r) => Math.round(r.rating) === 5).length,
    4: reviews.filter((r) => Math.round(r.rating) === 4).length,
    3: reviews.filter((r) => Math.round(r.rating) === 3).length,
    2: reviews.filter((r) => Math.round(r.rating) === 2).length,
    1: reviews.filter((r) => Math.round(r.rating) === 1).length,
  };

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
            Komunitas Pembaca Aktif
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
                Total Unduhan
              </p>
              <p className="text-xs text-[#a89282] leading-relaxed">
                Telah diunduh dan dinikmati oleh ribuan pecinta komik di seluruh Indonesia.
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
                Sedang Membaca
              </p>
              <p className="text-xs text-[#a89282] leading-relaxed">
                Jumlah pembaca yang sedang asyik menikmati komik di aplikasi KonMik saat ini.
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

        {/* Community Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#251912]">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-3">
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                Ulasan Pembaca Komunitas
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f5ede4] tracking-tight mb-3">
                Apa Kata Pengguna Aplikasi KonMik?
              </h3>
              <p className="text-[#a89282] text-sm sm:text-base leading-relaxed">
                Ulasan dan rating asli yang dikirim langsung oleh para pembaca terdaftar melalui menu ulasan di aplikasi KonMik.
              </p>
            </div>

            {/* Filter Rating Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
              <button
                type="button"
                onClick={() => {
                  setSelectedRating(null);
                  setShowAllReviews(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRating === null
                    ? "bg-[#ff7a00] text-white shadow-[0_2px_14px_rgba(255,122,0,0.35)] scale-105"
                    : "bg-[#140e0a] text-[#a89282] border border-[#2a1d14] hover:border-[#ff7a00]/40 hover:text-[#f5ede4]"
                }`}
              >
                <span>Semua Ulasan</span>
                <span className="px-1.5 py-0.5 rounded-full bg-black/25 text-[10px] font-mono">
                  {ratingCounts.all}
                </span>
              </button>

              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
                if (count === 0 && selectedRating !== stars) return null;
                const isSelected = selectedRating === stars;
                return (
                  <button
                    key={stars}
                    type="button"
                    onClick={() => {
                      setSelectedRating(isSelected ? null : stars);
                      setShowAllReviews(false);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#ff7a00] text-white shadow-[0_2px_14px_rgba(255,122,0,0.35)] scale-105"
                        : "bg-[#140e0a] text-[#a89282] border border-[#2a1d14] hover:border-[#ff7a00]/40 hover:text-[#f5ede4]"
                    }`}
                  >
                    <span className="text-amber-400">★</span>
                    <span>{stars} Bintang</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-black/25 text-[10px] font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Empty State when Filter has 0 reviews */}
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-[#140e0a] border border-[#2a1d14] max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/20 flex items-center justify-center text-[#ff7a00] mx-auto mb-3">
                  <Star className="w-6 h-6 text-[#ff7a00]/60" />
                </div>
                <h4 className="text-base font-bold text-[#f5ede4] mb-1">
                  Belum Ada Ulasan {selectedRating} Bintang
                </h4>
                <p className="text-xs text-[#a89282] mb-4">
                  Belum ada pembaca yang memberikan rating ini. Jadilah yang pertama memberikan ulasan!
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedRating(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#251912] hover:bg-[#2f1f17] text-xs font-semibold text-[#f5ede4] border border-[#ff7a00]/30 transition-all cursor-pointer"
                >
                  Tampilkan Semua Ulasan
                </button>
              </div>
            ) : (
              <>
                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
                  {displayedReviews.map((rev, idx) => {
                    const cardKey = `${rev.username}-${idx}`;
                    const isExpanded = !!expandedReviews[cardKey];
                    const isLong = (rev.review_text || "").length > 110;

                    return (
                      <div
                        key={cardKey}
                        className="group relative p-5 rounded-2xl bg-[#140e0a] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(255,122,0,0.08)] flex flex-col justify-between"
                      >
                        {/* Card Header: Avatar, Name, Handle, Stars */}
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Profile Picture with letter fallback */}
                              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-[#ff7a00]/30 bg-[#251912] flex items-center justify-center shrink-0 shadow-sm">
                                <span className="text-sm font-bold text-[#ff7a00] select-none">
                                  {(rev.display_name || rev.username || "K").charAt(0).toUpperCase()}
                                </span>
                                {rev.profile_url ? (
                                  <img
                                    src={rev.profile_url}
                                    alt={rev.display_name || rev.username}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLElement).style.display = "none";
                                    }}
                                  />
                                ) : null}
                              </div>

                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-[#f5ede4] truncate leading-tight group-hover:text-[#ff7a00] transition-colors">
                                  {rev.display_name || rev.username}
                                </h4>
                                <p className="text-xs text-[#8d7768] truncate font-mono">
                                  @{rev.username}
                                </p>
                              </div>
                            </div>

                            <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ff7a00]/10 text-[#ff7a00] border border-[#ff7a00]/25 shrink-0 capitalize">
                              {rev.role || "Reader"}
                            </span>
                          </div>

                          {/* Star Rating Display */}
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= rev.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-[#3d2918] fill-transparent"
                                }`}
                              />
                            ))}
                            <span className="text-xs font-semibold text-amber-400 ml-1 font-mono">
                              {rev.rating}.0
                            </span>
                          </div>

                          {/* Review Text */}
                          <div className="relative">
                            <Quote className="w-5 h-5 text-[#ff7a00]/20 mb-1 -scale-x-100" />
                            <p
                              className={`text-[#d8c3b2] text-xs sm:text-sm leading-relaxed italic transition-all duration-200 ${
                                isLong && !isExpanded ? "line-clamp-4 cursor-pointer" : ""
                              } ${isLong && isExpanded ? "cursor-pointer whitespace-pre-line" : ""}`}
                              onClick={isLong ? () => toggleReviewExpand(cardKey) : undefined}
                              title={
                                isLong
                                  ? isExpanded
                                    ? "Klik untuk memperkecil ulasan"
                                    : "Klik untuk melihat ulasan selengkapnya"
                                  : undefined
                              }
                            >
                              &ldquo;{rev.review_text}&rdquo;
                            </p>
                            {isLong && (
                              <button
                                type="button"
                                onClick={() => toggleReviewExpand(cardKey)}
                                className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#ff7a00] hover:text-[#ff9433] transition-colors cursor-pointer select-none"
                              >
                                <span>{isExpanded ? "Tutup selengkapnya" : "Lihat selengkapnya"}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Card Footer: Device tag & Date */}
                        <div className="mt-4 pt-3 border-t border-[#22160e] flex items-center justify-between text-[11px] text-[#8d7768]">
                          <span className="inline-flex items-center gap-1.5 font-medium">
                            <Smartphone className="w-3.5 h-3.5 text-[#ff7a00]" />
                            Aplikasi KonMik
                          </span>
                          <span className="text-[#715c4f]">{rev.date || "Terverifikasi"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show All / Show Less Toggle Button */}
                {filteredReviews.length > INITIAL_LIMIT && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#140e0a] border border-[#ff7a00]/30 hover:border-[#ff7a00] text-[#f5ede4] hover:text-[#ff7a00] font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      {showAllReviews ? (
                        <>
                          <ChevronUp className="w-4 h-4 text-[#ff7a00]" />
                          <span>Tampilkan Lebih Sedikit (4 Ulasan)</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 text-[#ff7a00]" />
                          <span>Lihat Semua Ulasan ({filteredReviews.length})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Bottom Callout: How to leave a review */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1c120a] to-[#140e0a] border border-[#ff7a00]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-[#ff7a00]/15 border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#f5ede4]">
                    Ingin Menulis Ulasan & Rating Anda Sendiri?
                  </h4>
                  <p className="text-xs text-[#a89282] mt-0.5">
                    Masuk ke akun KonMik di aplikasi mobile. Form ulasan dan rating tersedia di bagian paling bawah halaman Home!
                  </p>
                </div>
              </div>
              <a
                href="#download"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff7a00] hover:bg-[#e06b00] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_16px_rgba(255,122,0,0.3)] shrink-0"
              >
                <Download className="w-4 h-4" />
                Unduh Aplikasi
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

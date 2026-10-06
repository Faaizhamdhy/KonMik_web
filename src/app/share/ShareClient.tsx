"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, ExternalLink, ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { DOWNLOAD_URL_MAIN, DOWNLOAD_URL_ARM32 } from "@/lib/version";

interface ShareClientProps {
  title: string;
  cover: string;
  source: string;
  id: string;
  endpoint: string;
  version?: string;
}

export default function ShareClient({
  title,
  cover,
  source,
  id,
  endpoint,
  version = "1.6.2",
}: ShareClientProps) {
  const [deepLink, setDeepLink] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const appLink = "konmik://share" + search;
      setDeepLink(appLink);

      // Attempt automatic redirect on mobile devices to open KonMik app directly
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = appLink;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0906] text-[#f5ede4] flex flex-col items-center justify-center p-4 selection:bg-[#ff7a00] selection:text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(255,122,0,0.12)] via-[#0c0906] to-[#0c0906] pointer-events-none" />

      <div className="w-full max-w-md bg-[#18120e]/95 backdrop-blur-xl border border-[#2a1d14] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center relative overflow-hidden">
        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.3)] text-[#ff7a00] text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rekomendasi Komik &bull; KonMik</span>
        </div>

        {/* Cover Image */}
        <div className="relative mx-auto w-44 sm:w-48 h-60 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#3d2918] mb-6 bg-[#1a1109]">
          {cover && !imageError ? (
            <Image
              src={cover}
              alt={title}
              fill
              unoptimized
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#6b5244] p-4">
              <BookOpen className="w-12 h-12 mb-2 stroke-[1.5]" />
              <span className="text-xs">Gambar Komik</span>
            </div>
          )}
          {source && (
            <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white uppercase tracking-wider border border-[rgba(255,122,0,0.3)]">
              {source}
            </div>
          )}
        </div>

        {/* Comic Info */}
        <h1 className="text-lg sm:text-xl font-extrabold leading-snug mb-2 line-clamp-2 text-[#f5ede4]">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#a89282] mb-6 leading-relaxed">
          Buka langsung di aplikasi KonMik untuk membaca bab lengkap dengan mode Ultra HD tanpa iklan mengganggu.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={deepLink || "#"}
            className="w-full py-3.5 px-4 bg-[#ff7a00] hover:bg-[#e86e00] text-white font-bold rounded-xl transition-all shadow-[0_0_24px_rgba(255,122,0,0.35)] hover:shadow-[0_0_35px_rgba(255,122,0,0.5)] flex items-center justify-center gap-2 active:scale-[0.98] text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka di Aplikasi KonMik</span>
          </a>

          <a
            href={DOWNLOAD_URL_MAIN}
            className="w-full py-3 px-4 bg-[#110d09] hover:bg-[#221a13] border border-[#2a1d14] text-[#f5ede4] font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <Download className="w-4 h-4 text-[#ff7a00]" />
            <span>Download APK Utama (v{version} &bull; 64-bit)</span>
          </a>

          <a
            href={DOWNLOAD_URL_ARM32}
            className="w-full py-2.5 px-4 bg-[#110d09]/70 hover:bg-[#221a13] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#ff7a00]" />
            <span>Download Versi ARM 32-bit (HP Lama)</span>
          </a>

          <Link
            href="/"
            className="mt-2 text-xs text-[#a89282] hover:text-[#ff7a00] transition-colors flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kunjungi Beranda Web</span>
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-xs text-[#6b5244] text-center">
        KonMik &copy; {new Date().getFullYear()} &bull; Platform Komik Bebas Iklan
      </footer>
    </div>
  );
}

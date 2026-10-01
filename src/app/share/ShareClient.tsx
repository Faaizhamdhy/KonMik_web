"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, ExternalLink, ArrowLeft, BookOpen, Sparkles } from "lucide-react";

interface ShareClientProps {
  title: string;
  cover: string;
  source: string;
  id: string;
  endpoint: string;
}

export default function ShareClient({
  title,
  cover,
  source,
  id,
  endpoint,
}: ShareClientProps) {
  const [deepLink, setDeepLink] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const appLink = "konmik://share" + search;
      setDeepLink(appLink);

      // Attempt automatic redirect on mobile devices
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = appLink;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background pointer-events-none"></div>

      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rekomendasi Komik KonMik</span>
        </div>

        {/* Cover Image */}
        <div className="relative mx-auto w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-border/60 mb-6 bg-slate-800">
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
            <div className="w-full h-full flex flex-col items-center justify-center text-foreground/40 p-4">
              <BookOpen className="w-12 h-12 mb-2 stroke-[1.5]" />
              <span className="text-xs">Gambar Komik</span>
            </div>
          )}
          {source && (
            <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white uppercase tracking-wider border border-white/10">
              {source}
            </div>
          )}
        </div>

        {/* Comic Info */}
        <h1 className="text-xl sm:text-2xl font-bold leading-snug mb-2 line-clamp-2 text-foreground">
          {title}
        </h1>
        <p className="text-sm text-foreground/60 mb-6">
          Buka langsung di aplikasi KonMik untuk membaca tanpa iklan mengganggu dan fitur lengkap lainnya.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={deepLink || "#"}
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ExternalLink className="w-4 h-4" />
            Buka di Aplikasi KonMik
          </a>

          <a
            href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
            className="w-full py-3 px-4 bg-slate-800/80 hover:bg-slate-700/80 border border-border text-foreground font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Download className="w-4 h-4 text-primary" />
            Belum Punya? Download APK (v1.6.2)
          </a>

          <Link
            href="/"
            className="mt-2 text-xs text-foreground/50 hover:text-foreground/80 transition-colors flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda Web
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-xs text-foreground/40 text-center">
        KonMik &copy; {new Date().getFullYear()} &bull; Platform Komik Bebas Iklan
      </footer>
    </div>
  );
}

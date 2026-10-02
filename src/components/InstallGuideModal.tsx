"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ShieldAlert,
  X,
  CheckCircle2,
  Download,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function InstallGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-[#120d09] border border-[#ff7a00]/30 shadow-[0_20px_70px_rgba(0,0,0,0.95)] p-5 sm:p-7 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(255,122,0,0.12),transparent_70%)] pointer-events-none -z-0" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#251912] relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff7a00]/15 border border-[#ff7a00]/35 flex items-center justify-center text-[#ff7a00] shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#f5ede4]">
                Panduan Mengatasi Play Protect
              </h3>
              <p className="text-xs text-[#a89282]">
                Cara melewati pesan &ldquo;Aplikasi Diblokir&rdquo; di HP Android
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-[#22160e] text-[#a89282] hover:text-white hover:bg-[#2d1c12] transition-colors cursor-pointer shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body with Two Visual Cards */}
        <div className="overflow-y-auto pr-1 py-4 space-y-6 relative z-10 text-[#d8c3b2]">
          {/* Why message appears */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#22150d] border border-[#ff7a00]/30 flex items-start gap-3 text-xs sm:text-sm">
            <Info className="w-5 h-5 text-[#ff7a00] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#f5ede4] block">
                Mengapa Google Play Protect Memunculkan Peringatan Ini?
              </strong>
              <p className="text-[#a89282] leading-relaxed">
                Pesan ini adalah peringatan otomatis Android untuk semua aplikasi APK luar (sideloading) yang tidak dipublikasikan ke Play Store berbayar.
                Aplikasi KonMik <span className="text-emerald-400 font-semibold">100% aman, bersih dari virus, dan bebas iklan</span>.
              </p>
            </div>
          </div>

          {/* 2 Step Cards with exact user screenshots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Step 1 Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#19110b] border border-[#2a1d14] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ff7a00]/20 text-[#ff7a00] border border-[#ff7a00]/30">
                    Langkah 1
                  </span>
                  <span className="text-[11px] text-[#8d7768]">Buka Pilihan Tersembunyi</span>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#2a1d14] bg-black/60 mb-4 shadow-md">
                  <img
                    src="/images/guide/step1_card.jpg"
                    alt="Langkah 1 Play Protect"
                    className="w-full h-auto object-contain block mx-auto"
                  />
                </div>

                <h4 className="text-sm sm:text-base font-bold text-[#f5ede4] mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff7a00]" />
                  <span>Ketuk &ldquo;Detail selengkapnya ∨&rdquo;</span>
                </h4>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Pada jendela hitam Play Protect, ketuk tulisan teks berpanah bawah <strong className="text-[#ff7a00]">&ldquo;Detail selengkapnya ∨&rdquo;</strong> (lingkaran oranye) untuk membuka pilihan instalasi tersembunyi.
                </p>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#19110b] border border-[#2a1d14] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Langkah 2
                  </span>
                  <span className="text-[11px] text-red-400 font-bold">⚠️ Jangan Klik Oke!</span>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#2a1d14] bg-black/60 mb-4 shadow-md">
                  <img
                    src="/images/guide/step2_card.jpg"
                    alt="Langkah 2 Play Protect"
                    className="w-full h-auto object-contain block mx-auto"
                  />
                </div>

                <h4 className="text-sm sm:text-base font-bold text-[#f5ede4] mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Ketuk &ldquo;Tetap instal&rdquo;</span>
                </h4>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Ketuk tulisan teks <strong className="text-emerald-400">&ldquo;Tetap instal&rdquo;</strong> (lingkaran hijau).
                  <br />
                  <strong className="text-red-400 font-bold">PENTING:</strong> Jangan klik tombol biru <em>&ldquo;Oke&rdquo;</em> karena akan membatalkan instalasi aplikasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#251912] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 shrink-0">
          <span className="text-[11px] text-[#786355] text-center sm:text-left">
            Aplikasi KonMik aman &bull; 100% bebas iklan &bull; Tidak meminta izin berbahaya
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#22160e] hover:bg-[#2d1c12] text-[#f5ede4] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <a
              href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
              onClick={() => setIsOpen(false)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a00] hover:bg-[#e06b00] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,122,0,0.35)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh APK Sekarang</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger Button with anchor scroll to #panduan */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#ff7a00] bg-[#ff7a00]/10 border border-[#ff7a00]/30 hover:bg-[#ff7a00]/20 hover:border-[#ff7a00]/50 transition-all cursor-pointer backdrop-blur-sm group shadow-sm active:scale-95"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-[#ff7a00] group-hover:scale-110 transition-transform" />
          <span>Panduan Mengatasi &ldquo;Aplikasi Diblokir Play Protect&rdquo;</span>
        </button>
      </div>

      {/* Render via Portal so it NEVER gets clipped or hidden by parent overflow */}
      {isOpen && mounted && createPortal(modalContent, document.body)}
    </>
  );
}

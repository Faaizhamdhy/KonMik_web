"use client";

import { useState } from "react";
import {
  ShieldAlert,
  X,
  CheckCircle2,
  Download,
  AlertTriangle,
  ChevronDown,
  Smartphone,
  Info,
  ExternalLink,
} from "lucide-react";

export default function InstallGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#ff7a00] bg-[#ff7a00]/10 border border-[#ff7a00]/30 hover:bg-[#ff7a00]/20 hover:border-[#ff7a00]/50 transition-all cursor-pointer backdrop-blur-sm group"
      >
        <ShieldAlert className="w-3.5 h-3.5 text-[#ff7a00] group-hover:scale-110 transition-transform" />
        <span>Panduan Mengatasi &ldquo;Aplikasi Diblokir Play Protect&rdquo;</span>
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-[#140e0a] border border-[#ff7a00]/30 shadow-[0_16px_60px_rgba(0,0,0,0.85)] p-5 sm:p-7 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(circle,rgba(255,122,0,0.12),transparent_70%)] pointer-events-none -z-0" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#251912] relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff7a00]/15 border border-[#ff7a00]/35 flex items-center justify-center text-[#ff7a00] shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f5ede4]">
                    Panduan Instalasi & Play Protect
                  </h3>
                  <p className="text-xs text-[#a89282]">
                    Cara mudah melewati peringatan &ldquo;Aplikasi Diblokir&rdquo; di HP Android
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-[#22160e] text-[#a89282] hover:text-white hover:bg-[#2d1c12] transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto pr-1 py-4 space-y-4 text-xs sm:text-sm text-[#d8c3b2] relative z-10">
              {/* Important Alert Notice */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#251810] border border-[#ff7a00]/35 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#ff7a00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f5ede4] font-semibold block mb-0.5">
                    Kenapa Google Play Protect Menampilkan Peringatan Ini?
                  </strong>
                  <span className="text-[#a89282] text-xs leading-relaxed">
                    Aplikasi KonMik adalah aplikasi mandiri (sideloading) bebas iklan yang tidak diunggah ke Google Play Store berbayar.
                    Play Protect secara otomatis memunculkan pesan proteksi pada semua aplikasi baru dari developer luar. 
                    Aplikasi KonMik <strong className="text-emerald-400">100% aman, bersih, dan bebas virus/malware</strong>.
                  </span>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3 pt-1">
                {/* Step 1 */}
                <div className="p-3.5 rounded-2xl bg-[#1b120c] border border-[#2a1d14] flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#ff7a00] text-black font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5ede4] mb-0.5">
                      Download File KonMik.apk
                    </h4>
                    <p className="text-xs text-[#a89282] leading-relaxed">
                      Klik tombol <strong>Download APK</strong>. Jika browser Chrome menampilkan pesan peringatan <em>&ldquo;File ini mungkin berbahaya&rdquo;</em>, pilih opsi <strong>&ldquo;Tetap Download&rdquo;</strong> (Download anyway).
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-2xl bg-[#1b120c] border border-[#2a1d14] flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#ff7a00] text-black font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5ede4] mb-0.5">
                      Buka File & Tekan Instal
                    </h4>
                    <p className="text-xs text-[#a89282] leading-relaxed">
                      Tarik bilah notifikasi HP Anda atau buka folder <strong>Download</strong> di Pengelola File (File Manager), lalu ketuk file <strong>KonMik.apk</strong> dan pilih <strong>Instal</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 3 & 4 (The Critical Bypass Step) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2a160d] to-[#1e110a] border-2 border-[#ff7a00] shadow-[0_0_24px_rgba(255,122,0,0.15)] flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#ff7a00] text-black font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5">
                      <span>Saat Muncul Jendela Play Protect:</span>
                    </h4>
                    <p className="text-xs text-[#f5ede4] leading-relaxed">
                      Muncul jendela hitam bertuliskan: <br />
                      <strong className="text-red-300">&ldquo;Aplikasi diblokir untuk melindungi perangkat Anda&rdquo;</strong>
                    </p>

                    {/* Visual Warning Box */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1.5 font-mono">
                      <div className="text-red-400 font-bold flex items-center gap-1">
                        ⚠️ JANGAN TEKAN TOMBOL BIRU &ldquo;OKE&rdquo;!
                      </div>
                      <div className="text-[#a89282]">
                        (Menekan tombol &ldquo;Oke&rdquo; akan membatalkan proses instalasi)
                      </div>
                    </div>

                    <div className="pt-1 text-xs text-[#f5ede4] space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00]" />
                        <span>1. Ketuk tulisan <strong className="text-[#ff7a00] underline">&ldquo;Detail selengkapnya ∨&rdquo;</strong> di bawah pesan.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00]" />
                        <span>2. Setelah menu terbuka, ketuk tulisan <strong className="text-emerald-400 underline">&ldquo;Tetap instal&rdquo;</strong> (Install anyway).</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 rounded-2xl bg-[#1b120c] border border-[#2a1d14] flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f5ede4] mb-0.5">
                      Selesai! Nikmati Baca Komik Bebas Iklan
                    </h4>
                    <p className="text-xs text-[#a89282] leading-relaxed">
                      Aplikasi KonMik berhasil terpasang di HP Anda. Buka aplikasi, pilih tema favorit, dan selamat membaca ribuan manga & manhwa sepuasnya!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#251912] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <span className="text-[11px] text-[#786355] text-center sm:text-left">
                Verifikasi SHA-256 tersedia di repository publik GitHub
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
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a00] hover:bg-[#e06b00] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,122,0,0.35)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

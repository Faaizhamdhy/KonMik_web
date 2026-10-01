"use client";

import { useState } from "react";
import {
  Puzzle,
  Download,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Lock,
  MessageCircle,
  X,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";

export default function Extensions() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQr, setActiveQr] = useState<{ name: string; url: string } | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const webtoonUrl =
    "https://gist.githubusercontent.com/Faaizhamdhy/ef1a3bc0bad4dfa24ceeaf8a0eb1af9b/raw/01647278aeffb3805bd7d264114cd465d5f2d477/webtoon.js";

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="extensions" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Puzzle className="w-4 h-4" />
            <span>Katalog Ekstensi Tambahan</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Ekstensi Modular KonMik
          </h2>
          <p className="text-foreground/75 text-base md:text-lg leading-relaxed">
            Pasang sumber komik tambahan di luar sumber bawaan aplikasi melalui modul JavaScript yang fleksibel.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-card border border-primary/40 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Cara Pasang Ekstensi di Aplikasi</span>
            </button>
          </div>
        </div>

        {/* Guide Box (Expandable) */}
        {showGuide && (
          <div className="max-w-4xl mx-auto mb-12 p-6 rounded-3xl bg-card border border-primary/40 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base md:text-lg text-foreground">
                  Cara Memasang Ekstensi di Aplikasi KonMik
                </h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-foreground/40 hover:text-foreground p-1"
                aria-label="Tutup Panduan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-foreground/80">
              <div className="p-4 rounded-2xl bg-background/60 border border-border">
                <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-center leading-6 mb-2">
                  1
                </span>
                <p className="font-semibold text-foreground mb-1">
                  1-Click Pasang di HP
                </p>
                <p className="text-foreground/60 text-xs leading-relaxed">
                  Buka website ini dari browser HP Anda, lalu klik tombol{" "}
                  <strong>Pasang di KonMik</strong>. Aplikasi otomatis terbuka dan memasang ekstensi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-background/60 border border-border">
                <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-center leading-6 mb-2">
                  2
                </span>
                <p className="font-semibold text-foreground mb-1">
                  Scan QR Code via PC
                </p>
                <p className="text-foreground/60 text-xs leading-relaxed">
                  Jika membuka dari laptop/PC, klik tombol <strong>QR Code</strong>, lalu scan barcode menggunakan kamera atau fitur Scanner di KonMik.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-background/60 border border-border">
                <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-center leading-6 mb-2">
                  3
                </span>
                <p className="font-semibold text-foreground mb-1">
                  Salin URL Manual
                </p>
                <p className="text-foreground/60 text-xs leading-relaxed">
                  Klik <strong>Salin Link</strong> ➡️ Masuk menu Profile ➡️ Source Settings ➡️ Ikon (+) ➡️ Tempelkan link Gist lalu Simpan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Extensions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Card 1: Line Webtoon (Public) */}
          <div className="bg-card border border-border/80 hover:border-primary/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(255,122,0,0.12)] flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-[#00DC64] flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover:scale-105">
                    W
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      Line Webtoon
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-foreground/50 mt-0.5">
                      <span className="font-mono">v1.0.0</span>
                      <span>&bull;</span>
                      <span>KonMik Community</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Publik
                </span>
              </div>

              <p className="text-sm text-foreground/75 leading-relaxed mb-6">
                Koleksi manhwa & webtoon resmi dan populer dengan scroll vertikal mulus, cerita romansa, drama, aksi, komedi, dan fantasi terlengkap.
              </p>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-background border border-border text-foreground/70">
                  Tipe: <strong>Webtoon & Manhwa</strong>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-background border border-border text-foreground/70">
                  Bahasa: <strong>Indonesia</strong>
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-5 border-t border-border/60">
              <a
                href={`konmik://extension/install?url=${encodeURIComponent(webtoonUrl)}`}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(255,122,0,0.3)] flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Pasang di KonMik</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => copyUrl("webtoon", webtoonUrl)}
                  className="py-2.5 px-3 rounded-xl bg-background hover:bg-border/40 border border-border text-foreground/80 hover:text-foreground text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedId === "webtoon" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400 font-semibold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Link Gist</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setActiveQr({
                      name: "Line Webtoon",
                      url: `konmik://extension/install?url=${encodeURIComponent(webtoonUrl)}`,
                    })
                  }
                  className="py-2.5 px-3 rounded-xl bg-background hover:bg-border/40 border border-border text-foreground/80 hover:text-foreground text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan QR Code</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: DoujinDesu (Private) */}
          <div className="bg-card border border-border/80 hover:border-pink-500/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(236,72,153,0.12)] flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover:scale-105">
                    D
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground group-hover:text-pink-400 transition-colors flex items-center gap-1.5">
                      DoujinDesu
                      <Lock className="w-3.5 h-3.5 text-pink-400" />
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-foreground/50 mt-0.5">
                      <span className="font-mono">v1.2.0</span>
                      <span>&bull;</span>
                      <span>Private Community</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-500/15 text-pink-400 border border-pink-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Private (18+)
                </span>
              </div>

              <p className="text-sm text-foreground/75 leading-relaxed mb-6">
                Koleksi manga dan doujinshi dengan filter kategori terlengkap. Ekstensi ini bersifat **eksklusif dan terproteksi**, akses link instalasi hanya diberikan melalui persetujuan admin.
              </p>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-background border border-border text-foreground/70">
                  Tipe: <strong>Manga & Doujin</strong>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-background border border-border text-foreground/70">
                  Status: <strong>Akses Khusus</strong>
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-5 border-t border-border/60">
              <button
                onClick={() => setShowAdminModal(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Minta Akses ke Admin</span>
              </button>

              <p className="text-[11px] text-center text-foreground/50 pt-1">
                Diperlukan verifikasi umur & komunitas untuk mendapatkan link ekstensi ini.
              </p>
            </div>
          </div>
        </div>

        {/* Hardcoded Notice Banner */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-card/60 border border-border flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">
              Sumber Komik Lain Sudah Terpasang Bawaan (Built-in)!
            </h4>
            <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
              Anda tidak perlu mencari ekstensi lain secara manual. Sumber komik populer seperti{" "}
              <strong className="text-foreground">KomikIndo</strong>,{" "}
              <strong className="text-foreground">Shinigami</strong>,{" "}
              <strong className="text-foreground">SoftKomik</strong>,{" "}
              <strong className="text-foreground">Komikcast</strong>, dan berbagai katalog lainnya sudah diintegrasikan langsung di dalam aplikasi KonMik dan siap dibaca tanpa setup tambahan.
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {activeQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveQr(null)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground p-1 rounded-full bg-background border border-border"
              aria-label="Tutup Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider">
                Scan via HP
              </span>
              <h3 className="font-bold text-xl mt-2 text-foreground">
                {activeQr.name}
              </h3>
              <p className="text-xs text-foreground/60 mt-1">
                Scan barcode ini menggunakan kamera atau pemindai di aplikasi KonMik.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl mx-auto w-56 h-56 flex items-center justify-center shadow-lg border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  activeQr.url
                )}`}
                alt={`QR Code ${activeQr.name}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={() => copyUrl("modal", webtoonUrl)}
                className="w-full py-2.5 px-4 bg-background border border-border hover:bg-border/40 text-foreground text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedId === "modal" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Link Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin URL Ekstensi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Request Modal for DoujinDesu */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground p-1 rounded-full bg-background border border-border"
              aria-label="Tutup Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-pink-500/15 text-pink-400 mx-auto flex items-center justify-center mb-4">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="font-bold text-xl text-foreground mb-2">
              Akses Ekstensi DoujinDesu (Private)
            </h3>
            <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6">
              Ekstensi ini memuat konten dewasa (18+) dan dibatasi secara privat. Untuk mendapatkan tautan script instalasi resmi, silakan hubungi admin komunitas KonMik di Discord atau Telegram.
            </p>

            <div className="space-y-3">
              <a
                href="https://discord.gg/CgJbZkv89U"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Hubungi Admin di Discord</span>
              </a>

              <button
                onClick={() => setShowAdminModal(false)}
                className="w-full py-2.5 px-4 bg-background border border-border hover:bg-border/40 text-foreground/80 text-xs font-medium rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

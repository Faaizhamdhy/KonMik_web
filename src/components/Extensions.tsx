"use client";

import { useState } from "react";
import {
  Puzzle, Download, Copy, Check, ShieldCheck, Lock,
  MessageCircle, X, HelpCircle, Layers, Sparkles, ChevronDown,
  Code2, ExternalLink, FileCode, BookOpen,
} from "lucide-react";
import GithubIcon from "./GithubIcon";

const WEBTOON_URL =
  "https://gist.githubusercontent.com/Faaizhamdhy/ef1a3bc0bad4dfa24ceeaf8a0eb1af9b/raw/01647278aeffb3805bd7d264114cd465d5f2d477/webtoon.js";

const BUILTIN_SOURCES = [
  "Shinigami",
  "Kiryuu",
  "Komikindo",
  "Ikiru",
  "Komiknesia",
  "Ainz Scans",
  "VoraToon",
  "MangaDex",
];

export default function Extensions() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showDevDoc, setShowDevDoc] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<string | null>(null);

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleInstallClick = (e: React.MouseEvent, url: string) => {
    const deepLink = `konmik://extension/install?url=${encodeURIComponent(url)}`;
    window.location.href = deepLink;
    setInstallPrompt("Membuka aplikasi KonMik... Jika tidak terbuka, silakan gunakan 'Salin Link Gist' dan pasang via menu Explore.");
    setTimeout(() => {
      setInstallPrompt(null);
    }, 5000);
  };

  return (
    <section id="extensions" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#110d09] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,122,0,0.06),transparent_65%)] -z-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.2)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.1)] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Puzzle className="w-3.5 h-3.5" aria-hidden="true" />
            Katalog Ekstensi
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#f5ede4]">
            Ekstensi{" "}
            <span className="shimmer-text">Modular</span> KonMik
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed mb-5">
            Pasang sumber komik tambahan melalui modul JavaScript yang fleksibel — satu klik langsung terpasang.
          </p>

          <button
            onClick={() => setShowGuide((g) => !g)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18120e] border border-[rgba(255,122,0,0.3)] text-[#ff7a00] text-xs font-semibold hover:bg-[rgba(255,122,0,0.08)] transition-all duration-200"
            aria-expanded={showGuide}
          >
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Petunjuk Pemasangan
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${showGuide ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Guide Panel */}
        <div
          className={`max-w-4xl mx-auto mb-12 overflow-hidden transition-all duration-300 ease-in-out ${
            showGuide ? "max-h-[550px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-5 sm:p-6 rounded-3xl bg-[#18120e] border border-[rgba(255,122,0,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-[#ff7a00]">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span className="font-bold text-sm text-[#f5ede4]">Cara Memasang Ekstensi di KonMik</span>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-[#6b5244] hover:text-[#a89282] p-1 rounded-lg hover:bg-[#221a13] transition-all"
                aria-label="Tutup panduan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,122,0,0.15)] text-[#ff7a00] font-bold text-xs flex items-center justify-center mb-3">
                  1
                </div>
                <p className="font-semibold text-sm text-[#f5ede4] mb-1.5">
                  1-Click Pasang di HP
                </p>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Buka website ini dari browser HP Anda, lalu tekan tombol <strong className="text-[#f5ede4]">Pasang di KonMik</strong>. Aplikasi otomatis terbuka dan langsung memasang ekstensi ke daftar sumber.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,122,0,0.15)] text-[#ff7a00] font-bold text-xs flex items-center justify-center mb-3">
                  2
                </div>
                <p className="font-semibold text-sm text-[#f5ede4] mb-1.5">
                  Manual via Menu Explore
                </p>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  1. Salin link ekstensi via tombol <strong>Salin Link Gist</strong>.<br />
                  2. Buka aplikasi KonMik, masuk ke halaman <strong>Explore / Jelajah</strong>.<br />
                  3. Di bagian header atas, tap ikon <strong>Source Settings</strong> (ikon bola dunia sumber aktif).<br />
                  4. Tap tombol <strong>(+) Pasang Baru / Tambah Ekstensi</strong>.<br />
                  5. Masukkan link URL lalu simpan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Extension Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {/* ── Card 1: Line Webtoon ── */}
          <div className="group relative flex flex-col bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,122,0,0.1)]">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.04),transparent_60%)] pointer-events-none" />

            {/* Card header */}
            <div className="flex items-start justify-between gap-3 mb-5 relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00DC64] flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform duration-200 shrink-0">
                  W
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#f5ede4] group-hover:text-[#ff7a00] transition-colors flex items-center gap-1.5">
                    Line Webtoon
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b5244] mt-0.5">
                    <span className="font-mono">v1.0.0</span>
                    <span>·</span>
                    <span>KonMik Community</span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/12 text-emerald-400 border border-emerald-500/25 shrink-0">
                Publik
              </span>
            </div>

            <p className="text-sm text-[#a89282] leading-relaxed mb-5 relative">
              Koleksi manhwa & webtoon resmi dan populer dengan scroll vertikal mulus — romansa, drama, aksi, komedi, dan fantasi terlengkap.
            </p>

            <div className="flex flex-wrap gap-2 mb-6 relative">
              {["Webtoon & Manhwa", "Bahasa Indonesia"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-[#110d09] border border-[#2a1d14] text-[#a89282]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto relative space-y-2.5">
              <a
                href={`konmik://extension/install?url=${encodeURIComponent(WEBTOON_URL)}`}
                onClick={(e) => handleInstallClick(e, WEBTOON_URL)}
                className="group/btn w-full py-3.5 px-4 bg-[#ff7a00] hover:bg-[#e86e00] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,122,0,0.25)] hover:shadow-[0_0_32px_rgba(255,122,0,0.4)] flex items-center justify-center gap-2 text-sm active:scale-[0.98] overflow-hidden relative"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
                <Download className="w-4 h-4 relative" aria-hidden="true" />
                <span className="relative">Pasang di KonMik</span>
              </a>

              {installPrompt && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-tight text-center animate-in fade-in duration-200">
                  {installPrompt}
                </div>
              )}

              <button
                onClick={() => copyUrl("webtoon", WEBTOON_URL)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#110d09] hover:bg-[#1e1510] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.25)] text-[#a89282] hover:text-[#f5ede4] text-xs font-medium transition-all flex items-center justify-center gap-1.5"
              >
                {copiedId === "webtoon" ? (
                  <><Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /><span className="text-emerald-400 font-semibold">Link Berhasil Disalin!</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5" aria-hidden="true" /><span>Salin Link Gist Ekstensi</span></>
                )}
              </button>
            </div>
          </div>

          {/* ── Card 2: DoujinDesu ── */}
          <div className="group relative flex flex-col bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(236,72,153,0.4)] rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(236,72,153,0.1)]">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.04),transparent_60%)] pointer-events-none" />

            <div className="flex items-start justify-between gap-3 mb-5 relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform duration-200 shrink-0">
                  D
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#f5ede4] group-hover:text-pink-400 transition-colors flex items-center gap-1.5">
                    DoujinDesu
                    <Lock className="w-3.5 h-3.5 text-pink-400 shrink-0" aria-hidden="true" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b5244] mt-0.5">
                    <span className="font-mono">v1.2.0</span>
                    <span>·</span>
                    <span>Private Community</span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-500/12 text-pink-400 border border-pink-500/25 flex items-center gap-1 shrink-0">
                <Lock className="w-2.5 h-2.5" aria-hidden="true" />
                18+ Private
              </span>
            </div>

            <p className="text-sm text-[#a89282] leading-relaxed mb-5 relative">
              Koleksi manga dan doujinshi dengan filter kategori terlengkap. Eksklusif & terproteksi — link instalasi hanya melalui persetujuan admin komunitas.
            </p>

            <div className="flex flex-wrap gap-2 mb-6 relative">
              {["Manga & Doujin", "Akses Khusus"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-[#110d09] border border-[#2a1d14] text-[#a89282]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto relative space-y-2.5">
              <button
                onClick={() => setShowAdminModal(true)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.25)] hover:shadow-[0_0_32px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Minta Akses ke Admin
              </button>
              <p className="text-[10px] text-center text-[#6b5244]">
                Diperlukan verifikasi umur & komunitas untuk mendapatkan link ekstensi ini.
              </p>
            </div>
          </div>
        </div>

        {/* Built-in sources notice */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-[#18120e] border border-[#2a1d14] flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[rgba(255,122,0,0.1)] flex items-center justify-center shrink-0 mt-0.5">
            <Layers className="w-5 h-5 text-[#ff7a00]" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-[#f5ede4] mb-1.5">
              Sumber Komik Sudah Terpasang Bawaan (Built-in)!
            </h4>
            <p className="text-xs sm:text-sm text-[#a89282] leading-relaxed">
              Tidak perlu mencari ekstensi manual.{" "}
              {BUILTIN_SOURCES.map((s, i) => (
                <span key={s}>
                  <strong className="text-[#f5ede4] font-semibold">{s}</strong>
                  {i < BUILTIN_SOURCES.length - 1 ? ", " : ""}
                </span>
              ))}
              {" "}dan berbagai katalog lainnya sudah terintegrasi langsung di dalam KonMik — siap dibaca tanpa setup tambahan.
            </p>
          </div>
        </div>

        {/* Developer Guide Callout: Cara Pembuatan Gist Extension */}
        <div className="max-w-4xl mx-auto mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1c1510] to-[#140e0a] border border-[rgba(255,122,0,0.25)] shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.3)] text-[#ff7a00] flex items-center justify-center shrink-0 mt-0.5">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f5ede4] mb-1 flex flex-wrap items-center gap-2">
                  <span>Ingin Buat Ekstensi Komik Sendiri?</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ff7a00]/20 text-[#ff7a00] border border-[#ff7a00]/30">
                    Developer & Komunitas
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-[#a89282] leading-relaxed max-w-xl">
                  KonMik menggunakan engine JavaScript ringan. Siapa saja dapat menyusun ekstensi menggunakan GitHub Gist publik dan membagikannya ke pembaca lain.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setShowDevDoc(!showDevDoc)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#18120e] hover:bg-[#221a13] text-[#f5ede4] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.3)] transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#ff7a00]" />
                <span>{showDevDoc ? "Tutup Panduan" : "Panduan Format JS"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDevDoc ? "rotate-180" : ""}`} />
              </button>

              <a
                href="https://gist.github.com/Faaizhamdhy/ef1a3bc0bad4dfa24ceeaf8a0eb1af9b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#ff7a00] hover:bg-[#e86e00] text-white transition-all shadow-[0_0_15px_rgba(255,122,0,0.3)]"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Template Gist Resmi</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

              <a
                href="https://github.com/Faaizhamdhy/KonMik-Release"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#18120e] hover:bg-[#221a13] text-[#a89282] hover:text-[#f5ede4] border border-[#2a1d14] transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repo Publik</span>
              </a>
            </div>
          </div>

          {/* Expandable Developer Documentation Drawer */}
          {showDevDoc && (
            <div className="mt-6 pt-5 border-t border-[#2a1d14] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <h5 className="font-bold text-sm text-[#f5ede4] flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#ff7a00]" />
                Spesifikasi Format File Ekstensi JavaScript (.js)
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                  <p className="font-bold text-[#ff7a00] mb-2">1. Header Metadata Wajib (Komentar Paling Atas)</p>
                  <pre className="p-2.5 rounded-xl bg-black/60 font-mono text-[11px] text-[#a89282] overflow-x-auto leading-relaxed">
{`// ID: ext_namasource
// NAME: Nama Sumber Komik
// VERSION: 1.0.0
// COLOR: #00D564
// ICON: https://domain.com/favicon.ico
// REFERER: https://domain.com/`}
                  </pre>
                  <p className="text-[10px] text-[#6b5244] mt-2">
                    *ID wajib diawali dengan prefix <code className="text-[#a89282]">ext_</code> tanpa spasi.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                  <p className="font-bold text-[#ff7a00] mb-2">2. Kontrak Objek KonmikExtension</p>
                  <pre className="p-2.5 rounded-xl bg-black/60 font-mono text-[11px] text-[#a89282] overflow-x-auto leading-relaxed">
{`const KonmikExtension = {
  // Ambil list komik (halaman, query cari, filter)
  async getList(page, query, filters) { ... },
  
  // Ambil detail komik & chapter
  async getDetail(slug) { ... },
  
  // Ambil daftar URL gambar chapter
  async getChapterImages(chapterId) { ... }
};`}
                  </pre>
                  <p className="text-[10px] text-[#6b5244] mt-2">
                    *Buka <a href="https://gist.github.com/Faaizhamdhy/ef1a3bc0bad4dfa24ceeaf8a0eb1af9b" target="_blank" rel="noopener noreferrer" className="text-[#ff7a00] hover:underline">Gist Webtoon Resmi</a> untuk contoh implementasi lengkap.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Admin Modal ── */}
      {showAdminModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAdminModal(false)}
        >
          <div className="bg-[#18120e] border border-[#2a1d14] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative shadow-[0_24px_64px_rgba(0,0,0,0.6)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#6b5244] hover:text-[#a89282] bg-[#110d09] hover:bg-[#1e1510] rounded-full border border-[#2a1d14] transition-all"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-pink-500/12 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-pink-400" aria-hidden="true" />
            </div>

            <h3 className="font-bold text-xl text-[#f5ede4] mb-2">
              Akses Ekstensi DoujinDesu
            </h3>
            <p className="text-sm text-[#a89282] leading-relaxed mb-6">
              Ekstensi ini memuat konten dewasa (18+) dan dibatasi secara privat. Untuk mendapatkan tautan script instalasi resmi, silakan hubungi admin komunitas KonMik di Discord.
            </p>

            <div className="space-y-2.5">
              <a
                href="https://discord.gg/CgJbZkv89U"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md"
              >
                Hubungi Admin di Discord
              </a>
              <button
                onClick={() => setShowAdminModal(false)}
                className="w-full py-2.5 px-4 bg-[#110d09] border border-[#2a1d14] hover:bg-[#1e1510] text-[#a89282] text-xs font-medium rounded-xl transition-all"
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

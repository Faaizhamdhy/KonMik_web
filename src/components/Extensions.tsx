"use client";

import { useState } from "react";
import {
  Puzzle,
  Download,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
  Layers,
  Sparkles,
  ChevronDown,
  Code2,
  ExternalLink,
  FileCode,
  BookOpen,
  X,
  Globe2,
} from "lucide-react";
import GithubIcon from "./GithubIcon";

const BUILTIN_SOURCES = [
  "Shinigami",
  "Kiryuu",
  "Komikindo",
  "Ikiru",
  "Komiknesia",
  "Ainz Scans",
  "VoraToon",
  "MangaDex",
  "Luvyaa",
  "KonMik Originals",
];

export default function Extensions() {
  const [showGuide, setShowGuide] = useState(false);
  const [showDevDoc, setShowDevDoc] = useState(false);

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
            Ekosistem Ekstensi
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#f5ede4]">
            Ekstensi{" "}
            <span className="shimmer-text">Modular</span> JavaScript
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed mb-5">
            Arsitektur scraper fleksibel berbasis modul JavaScript — bebas pasang sumber tambahan atau kembangkan scraper komik kustom sendiri.
          </p>

          <button
            onClick={() => setShowGuide((g) => !g)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18120e] border border-[rgba(255,122,0,0.3)] text-[#ff7a00] text-xs font-semibold hover:bg-[rgba(255,122,0,0.08)] transition-all duration-200 cursor-pointer"
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
                <span className="font-bold text-sm text-[#f5ede4]">Cara Memasang Ekstensi di Aplikasi KonMik</span>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-[#6b5244] hover:text-[#a89282] p-1 rounded-lg hover:bg-[#221a13] transition-all cursor-pointer"
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
                  Salin Tautan Script (.js)
                </p>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Dapatkan tautan file JavaScript mentah (*raw link*) dari repositori ekstensi komunitas GitHub atau GitHub Gist yang Anda percaya.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,122,0,0.15)] text-[#ff7a00] font-bold text-xs flex items-center justify-center mb-3">
                  2
                </div>
                <p className="font-semibold text-sm text-[#f5ede4] mb-1.5">
                  Input di Menu Jelajah Aplikasi
                </p>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Buka aplikasi KonMik &rarr; masuk ke menu <strong>Explore (Jelajah)</strong> &rarr; tap ikon <strong>Source Settings</strong> di pojok atas &rarr; pilih <strong>(+) Tambah Ekstensi</strong> &rarr; tempelkan link URL lalu simpan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two Core Architecture Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {/* Card 1: Built-in Sources */}
          <div className="group relative flex flex-col bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,122,0,0.1)]">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.04),transparent_60%)] pointer-events-none" />

            <div className="flex items-start justify-between gap-3 mb-5 relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(255,122,0,0.12)] border border-[rgba(255,122,0,0.3)] flex items-center justify-center text-[#ff7a00] font-black text-xl shadow-lg group-hover:scale-105 transition-transform duration-200 shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#f5ede4] group-hover:text-[#ff7a00] transition-colors flex items-center gap-1.5">
                    10+ Server Bawaan
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b5244] mt-0.5">
                    <span>Langsung Siap Baca</span>
                    <span>·</span>
                    <span>Tanpa Setup</span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/12 text-emerald-400 border border-emerald-500/25 shrink-0">
                Terintegrasi
              </span>
            </div>

            <p className="text-sm text-[#a89282] leading-relaxed mb-5 relative">
              KonMik sudah dilengkapi berbagai server komik terpopuler siap pakai dengan integrasi DoH otomatis, pencarian terpadu, dan kemampuan ganti sumber baca instan.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6 relative">
              {BUILTIN_SOURCES.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-[#110d09] border border-[#2a1d14] text-[#a89282]">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-auto relative">
              <a
                href="#screenshots"
                className="w-full py-3 px-4 rounded-xl bg-[#110d09] hover:bg-[#1e1510] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.3)] text-[#f5ede4] text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Lihat Tampilan di Aplikasi</span>
                <Sparkles className="w-3.5 h-3.5 text-[#ff7a00]" />
              </a>
            </div>
          </div>

          {/* Card 2: Open Source Community Extensions */}
          <div className="group relative flex flex-col bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(59,130,246,0.4)] rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(59,130,246,0.1)]">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.04),transparent_60%)] pointer-events-none" />

            <div className="flex items-start justify-between gap-3 mb-5 relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/12 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-xl shadow-lg group-hover:scale-105 transition-transform duration-200 shrink-0">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#f5ede4] group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    Repo Komunitas Terbuka
                    <Puzzle className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b5244] mt-0.5">
                    <span className="font-mono">GitHub Open Source</span>
                    <span>·</span>
                    <span>JavaScript</span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/12 text-blue-400 border border-blue-500/25 shrink-0">
                Komunitas
              </span>
            </div>

            <p className="text-sm text-[#a89282] leading-relaxed mb-5 relative">
              Kunjungi repositori resmi komunitas di GitHub untuk menemukan modul ekstensi tambahan, berkontribusi scraper baru, atau melaporkan perbaikan parser sumber komik.
            </p>

            <div className="flex flex-wrap gap-2 mb-6 relative">
              {["Modul JavaScript", "GitHub Open Source", "Ekspansi Bebas"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-[#110d09] border border-[#2a1d14] text-[#a89282]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto relative space-y-2">
              <a
                href="https://github.com/Faaizhamdhy/KonMIk-Extension-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#ff7a00] hover:bg-[#e86e00] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,122,0,0.25)] flex items-center justify-center gap-2 text-xs active:scale-[0.98]"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Buka Repo KonMIk-Extension</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>

        {/* Developer Guide Callout: Cara Pembuatan Ekstensi */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1c1510] to-[#140e0a] border border-[rgba(255,122,0,0.25)] shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
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
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#18120e] hover:bg-[#221a13] text-[#f5ede4] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.3)] transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#ff7a00]" />
                <span>{showDevDoc ? "Tutup Panduan" : "Panduan Format JS"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDevDoc ? "rotate-180" : ""}`} />
              </button>

              <a
                href="https://github.com/Faaizhamdhy/KonMIk-Extension-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#18120e] hover:bg-[#221a13] text-[#a89282] hover:text-[#f5ede4] border border-[#2a1d14] transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
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
// COLOR: #FF7A00
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
                    *Lihat <a href="https://github.com/Faaizhamdhy/KonMIk-Extension-" target="_blank" rel="noopener noreferrer" className="text-[#ff7a00] hover:underline">Repo KonMIk-Extension</a> untuk contoh implementasi lengkap.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

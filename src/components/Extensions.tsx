"use client";

import { useState } from "react";
import {
  Puzzle,
  Download,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Search,
  BookOpen,
  X,
  HelpCircle,
} from "lucide-react";

export interface ExtensionItem {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  type: string;
  lang: string;
  isAdult?: boolean;
  isOfficial?: boolean;
  rawUrl: string;
  color: string;
}

const EXTENSIONS: ExtensionItem[] = [
  {
    id: "ext_softkomik",
    name: "SoftKomik",
    version: "v1.0.5",
    author: "KonMik Team",
    description:
      "Manga, Manhwa, & Manhua Bahasa Indonesia terlengkap langsung dari sumber SoftKomik dengan dukungan chapter penuh dan reader cepat.",
    type: "Manga & Manhwa",
    lang: "ID",
    isOfficial: true,
    rawUrl:
      "https://gist.githubusercontent.com/Faaizhamdhy/d6e08208f08da9efaae9cf82a5785e92/raw/softkomik.js",
    color: "#8B5CF6",
  },
  {
    id: "ext_webtoon",
    name: "Line Webtoon",
    version: "v1.0.0",
    author: "KonMik Community",
    description:
      "Koleksi manhwa & webtoon resmi dan populer dengan scroll vertikal mulus, cerita romansa, drama, fantasi dan aksi.",
    type: "Webtoon",
    lang: "ID",
    isOfficial: false,
    rawUrl:
      "https://raw.githubusercontent.com/Faaizhamdhy/KonMik/main/extensions/webtoon.js",
    color: "#00DC64",
  },
  {
    id: "ext_doujindesu",
    name: "DoujinDesu",
    version: "v1.2.0",
    author: "KonMik Community",
    description:
      "Katalog manga, manhwa, dan doujinshi dengan filter kategori dan chapter terbaru terlengkap.",
    type: "Manga & Doujin",
    lang: "ID",
    isAdult: true,
    rawUrl:
      "https://raw.githubusercontent.com/Faaizhamdhy/KonMik/main/extensions/doujindesu.js",
    color: "#EC4899",
  },
  {
    id: "ext_komikindo",
    name: "KomikIndo",
    version: "v1.1.0",
    author: "KonMik Team",
    description:
      "Salah satu penyedia manga terbesar di Indonesia. Ribuan judul Shonen, Seinen, Isekai dengan update harian.",
    type: "Manga",
    lang: "ID",
    isOfficial: true,
    rawUrl:
      "https://raw.githubusercontent.com/Faaizhamdhy/KonMik/main/extensions/komikindo.js",
    color: "#3B82F6",
  },
  {
    id: "ext_kiryuu",
    name: "Kiryuu",
    version: "v1.0.4",
    author: "KonMik Community",
    description:
      "Pusat manhwa aksi, kultivasi, dungeon hunter, dan reinkarnasi dengan kecepatan update chapter tercepat.",
    type: "Manhwa / Action",
    lang: "ID",
    isOfficial: false,
    rawUrl:
      "https://raw.githubusercontent.com/Faaizhamdhy/KonMik/main/extensions/kiryuu.js",
    color: "#F97316",
  },
  {
    id: "ext_mangadex",
    name: "MangaDex",
    version: "v1.0.2",
    author: "KonMik Team",
    description:
      "Koneksi langsung ke database MangaDex global. Ribuan rilis scanlation multi-bahasa dengan kualitas gambar original.",
    type: "Manga Global",
    lang: "Multi / EN",
    isOfficial: true,
    rawUrl:
      "https://raw.githubusercontent.com/Faaizhamdhy/KonMik/main/extensions/mangadex.js",
    color: "#FF6740",
  },
];

export default function Extensions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQr, setActiveQr] = useState<ExtensionItem | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredExtensions = EXTENSIONS.filter((ext) => {
    const matchSearch =
      ext.name.toLowerCase().includes(search.toLowerCase()) ||
      ext.description.toLowerCase().includes(search.toLowerCase()) ||
      ext.type.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (filter === "official") return ext.isOfficial;
    if (filter === "adult") return ext.isAdult;
    if (filter === "safe") return !ext.isAdult;
    return true;
  });

  return (
    <section id="extensions" className="py-24 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Puzzle className="w-4 h-4" />
            <span>Katalog Ekstensi Modular</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Bebas Pasang Sumber Komik Favorit
          </h2>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            KonMik menggunakan sistem ekstensi JavaScript modular. Anda bebas menambah, memperbarui, atau menghapus sumber komik sesuai keinginan hanya dalam satu klik.
          </p>
        </div>

        {/* Controls: Search, Filters, Guide Toggle */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              placeholder="Cari ekstensi (Webtoon, SoftKomik, dll)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-foreground/70 hover:bg-border/40"
              }`}
            >
              Semua ({EXTENSIONS.length})
            </button>
            <button
              onClick={() => setFilter("official")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "official"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-foreground/70 hover:bg-border/40"
              }`}
            >
              Resmi
            </button>
            <button
              onClick={() => setFilter("safe")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "safe"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-foreground/70 hover:bg-border/40"
              }`}
            >
              Umum
            </button>
            <button
              onClick={() => setFilter("adult")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "adult"
                  ? "bg-pink-600 text-white shadow-sm"
                  : "bg-card border border-border text-foreground/70 hover:bg-border/40"
              }`}
            >
              18+
            </button>

            <button
              onClick={() => setShowGuide(!showGuide)}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-primary/30 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Cara Pasang</span>
            </button>
          </div>
        </div>

        {/* Guide Box (Expandable) */}
        {showGuide && (
          <div className="max-w-4xl mx-auto mb-10 p-6 rounded-2xl bg-card/90 border border-primary/40 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base md:text-lg">
                  Panduan Pemasangan Ekstensi di Aplikasi KonMik
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
              <div className="p-4 rounded-xl bg-background/60 border border-border/80">
                <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-center leading-6 mb-2">
                  1
                </span>
                <p className="font-semibold text-foreground mb-1">
                  1-Click Install di HP
                </p>
                <p className="text-foreground/60 text-xs">
                  Buka website ini dari browser HP Android Anda, lalu klik tombol{" "}
                  <strong>Pasang di KonMik</strong>. Aplikasi akan otomatis terbuka dan memasang ekstensi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-border/80">
                <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-center leading-6 mb-2">
                  2
                </span>
                <p className="font-semibold text-foreground mb-1">
                  Scan QR Code
                </p>
                <p className="text-foreground/60 text-xs">
                  Jika Anda membuka web dari PC/Laptop, klik tombol <strong>QR Code</strong>, lalu scan kode tersebut dari menu Scanner di dalam aplikasi KonMik.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-border/80">
                <span className="inline-block w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-center leading-6 mb-2">
                  3
                </span>
                <p className="font-semibold text-foreground mb-1">
                  Manual Salin URL
                </p>
                <p className="text-foreground/60 text-xs">
                  Klik <strong>Salin Link</strong> ➡️ Buka KonMik ➡️ Menu Profile ➡️ Source Settings ➡️ Ikon (+) ➡️ Tempel link Gist/Raw lalu Simpan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Extensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredExtensions.map((ext) => {
            const installUrl = `konmik://extension/install?url=${encodeURIComponent(
              ext.rawUrl
            )}`;

            return (
              <div
                key={ext.id}
                className="bg-card border border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.12)] flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon, Name, Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md transition-transform group-hover:scale-105"
                        style={{ backgroundColor: ext.color }}
                      >
                        {ext.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {ext.name}
                          {ext.isOfficial && (
                            <ShieldCheck className="w-4 h-4 text-purple-400" />
                          )}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-foreground/50">
                          <span className="font-mono">{ext.version}</span>
                          <span>&bull;</span>
                          <span>{ext.author}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-background border border-border text-foreground/70">
                        {ext.lang}
                      </span>
                      {ext.isAdult && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> 18+
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-3 leading-relaxed">
                    {ext.description}
                  </p>

                  <div className="mb-6">
                    <span className="inline-block text-xs px-2.5 py-1 rounded-md bg-background/80 text-foreground/60 border border-border/70">
                      Tipe: <strong>{ext.type}</strong>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  {/* Primary 1-Click Install */}
                  <a
                    href={installUrl}
                    className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs md:text-sm active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Pasang di KonMik</span>
                  </a>

                  {/* Secondary Actions: Copy Link & QR */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => copyUrl(ext.id, ext.rawUrl)}
                      className="py-2 px-3 rounded-lg bg-background hover:bg-border/40 border border-border text-foreground/80 hover:text-foreground text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copiedId === ext.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-foreground/60" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setActiveQr(ext)}
                      className="py-2 px-3 rounded-lg bg-background hover:bg-border/40 border border-border text-foreground/80 hover:text-foreground text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5 text-foreground/60" />
                      <span>QR Code</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredExtensions.length === 0 && (
          <div className="text-center py-16 text-foreground/50">
            <p className="text-base">Tidak ada ekstensi yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {activeQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
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
                Scan kode QR ini menggunakan kamera atau pemindai di aplikasi KonMik.
              </p>
            </div>

            {/* QR Image Box */}
            <div className="bg-white p-4 rounded-2xl mx-auto w-56 h-56 flex items-center justify-center shadow-lg border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  `konmik://extension/install?url=${encodeURIComponent(
                    activeQr.rawUrl
                  )}`
                )}`}
                alt={`QR Code ${activeQr.name}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => copyUrl(activeQr.id, activeQr.rawUrl)}
                className="w-full py-2.5 px-4 bg-background border border-border hover:bg-border/40 text-foreground text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedId === activeQr.id ? (
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
    </section>
  );
}

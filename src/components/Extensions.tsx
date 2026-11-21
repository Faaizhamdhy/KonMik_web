"use client";

import { useState, useEffect } from "react";
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
  Book,
  Search,
  Zap,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  Ban,
} from "lucide-react";
import GithubIcon from "./GithubIcon";
import DiscordIcon from "./DiscordIcon";

interface ExtensionItem {
  id: string;
  name: string;
  version: string;
  type: "comic" | "novel";
  typeLabel?: string;
  author: string;
  description: string;
  color: string;
  raw_url?: string;
  rawUrl?: string;
  tags: string[];
  status?: string;
  icon_url?: string;
  icon?: string;
}

const DEFAULT_EXTENSIONS: ExtensionItem[] = [
  {
    id: "ext_westmanga",
    name: "Westmanga",
    version: "1.0.0",
    type: "comic",
    author: "Official Community",
    description: "Koleksi komik manga, manhwa & manhua terlengkap bahasa Indonesia dengan update harian cepat dan stabil.",
    color: "#E67E22",
    raw_url: "https://raw.githubusercontent.com/Faaizhamdhy/KonMIk-Extension-/main/westmanga.js",
    icon_url: "https://v1.westmanga.my/favicon.ico",
    tags: ["Manga", "Manhwa", "Sub Indo", "Populer"],
    status: "aman",
  },
  {
    id: "ext_rosyscans",
    name: "Rosyscans",
    version: "1.0.0",
    type: "comic",
    author: "Rosy Scans",
    description: "Scantrad komik manhwa & manhua aksi romantis berkualitas HD dengan terjemahan bahasa Indonesia rapi.",
    color: "#E91E63",
    raw_url: "https://raw.githubusercontent.com/Faaizhamdhy/KonMIk-Extension-/main/rosyscans.js",
    icon_url: "https://www.google.com/s2/favicons?domain=rosyscans.com&sz=128",
    tags: ["Manhwa", "Action", "Romance", "Sub Indo"],
    status: "aman",
  },
  {
    id: "ext_comicaso",
    name: "Comicaso",
    version: "1.0.0",
    type: "comic",
    author: "Community Scraper",
    description: "Pusat baca komik sub Indo dengan ribuan judul manga terbaru, navigasi chapter mulus, dan layout bersih.",
    color: "#9C27B0",
    raw_url: "https://raw.githubusercontent.com/Faaizhamdhy/KonMIk-Extension-/main/comicaso.js",
    icon_url: "https://www.google.com/s2/favicons?domain=comicaso.com&sz=128",
    tags: ["All Genre", "Manga", "Manhua", "Sub Indo"],
    status: "aman",
  },
  {
    id: "ext_webtoon",
    name: "LINE Webtoon ID",
    version: "1.0.0",
    type: "comic",
    author: "Official Webtoon Scraper",
    description: "Ekstensi scraper resmi LINE Webtoon Indonesia. Gambar full-color jernih dengan update langsung dari sumber resmi.",
    color: "#00D564",
    raw_url: "https://raw.githubusercontent.com/Faaizhamdhy/KonMIk-Extension-/main/webtoon.js",
    icon_url: "https://webtoons-static.pstatic.net/image/favicon/favicon.ico?dt=2017082301",
    tags: ["Webtoon", "Official", "Full Color", "Sub Indo"],
    status: "aman",
  },
  {
    id: "ext_indowebnovel",
    name: "IndoWebNovel",
    version: "1.0.0",
    type: "novel",
    author: "Novel Community",
    description: "Gudang web novel terjemahan bahasa Indonesia terlengkap: Wuxia, Xianxia, Korean Light Novel, dan novel lokal.",
    color: "#3F51B5",
    raw_url: "https://raw.githubusercontent.com/Faaizhamdhy/KonMIk-Extension-/main/indowebnovel.js",
    icon_url: "https://www.google.com/s2/favicons?domain=indowebnovel.id&sz=128",
    tags: ["Web Novel", "Xianxia", "Light Novel", "Sub Indo"],
    status: "aman",
  },
];

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
  const [extensions, setExtensions] = useState<ExtensionItem[]>(DEFAULT_EXTENSIONS);
  const [isLoadingExtensions, setIsLoadingExtensions] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showDevDoc, setShowDevDoc] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "comic" | "novel">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installedIds, setInstalledIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 1. Fetch live community extensions from Backend API (reflecting Admin Panel / Citsune Dashboard real-time)
    setIsLoadingExtensions(true);
    const apiUrl = typeof window !== "undefined" && window.location.hostname.includes("konkon.id")
      ? "https://api.konkon.id/api/community_extensions"
      : "/api/community_extensions";

    fetch(apiUrl, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.status === "success" && Array.isArray(json.data)) {
          setExtensions(json.data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live extensions from API, using fallback:", err);
      })
      .finally(() => {
        setIsLoadingExtensions(false);
      });

    // 2. Listen for callback from KonMik App WebView when an extension is successfully installed
    if (typeof window !== "undefined") {
      (window as any).onExtensionInstalled = (name: string) => {
        const found = extensions.find(
          (e) => e.name.toLowerCase() === name.toLowerCase() || e.id.toLowerCase() === name.toLowerCase()
        );
        if (found) {
          setInstalledIds((prev) => ({ ...prev, [found.id]: true }));
        }
        setInstallingId(null);
      };
    }
  }, []);

  const getExtensionFaviconUrl = (ext: ExtensionItem): string => {
    if (ext.icon_url && ext.icon_url.trim().length > 0) return ext.icon_url.trim();
    if (ext.icon && ext.icon.trim().length > 0) return ext.icon.trim();

    const rawId = (ext.id || "").replace(/^ext_/, "").toLowerCase();
    const cleanName = (ext.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    if (rawId === "webtoon" || cleanName.includes("webtoon")) {
      return "https://webtoons-static.pstatic.net/image/favicon/favicon.ico?dt=2017082301";
    }
    if (rawId === "westmanga" || cleanName.includes("westmanga")) {
      return "https://v1.westmanga.my/favicon.ico";
    }
    if (rawId === "wurmz" || cleanName.includes("wurmz")) {
      return "https://wurmz.net/favicon.ico";
    }
    if (rawId === "indowebnovel" || cleanName.includes("indowebnovel")) {
      return "https://www.google.com/s2/favicons?domain=indowebnovel.id&sz=128";
    }

    const guessedDomain = cleanName.endsWith(".id") || cleanName.endsWith(".com") || cleanName.endsWith(".net") || cleanName.endsWith(".my")
      ? cleanName
      : `${cleanName}.com`;
    return `https://www.google.com/s2/favicons?domain=${guessedDomain}&sz=128`;
  };

  const renderStatusBadge = (status?: string) => {
    const s = (status || "aman").toLowerCase();
    switch (s) {
      case "error":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            Error
          </span>
        );
      case "bahaya":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600/20 text-rose-400 border border-rose-500/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            Bahaya
          </span>
        );
      case "doujin":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/15 text-pink-400 border border-pink-500/30 flex items-center gap-1">
            <Ban className="w-3 h-3 text-pink-400" />
            18+ Doujin
          </span>
        );
      case "maintenance":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Wrench className="w-3 h-3 text-amber-400" />
            Maintenance
          </span>
        );
      case "aman":
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Aman
          </span>
        );
    }
  };

  const handleInstall = (ext: ExtensionItem) => {
    if (ext.status === "bahaya") {
      const ok = window.confirm(`⚠️ PERINGATAN KEAMANAN: Ekstensi "${ext.name}" ditandai BAHAYA / BERMASALAH oleh admin. Apakah Anda yakin tetap ingin memasangnya?`);
      if (!ok) return;
    } else if (ext.status === "error") {
      const ok = window.confirm(`⚠️ PERHATIAN: Parser ekstensi "${ext.name}" saat ini dilaporkan error/rusak. Apakah Anda tetap ingin memasang?`);
      if (!ok) return;
    }

    setInstallingId(ext.id);
    const rawUrl = ext.raw_url || ext.rawUrl || "";

    // Check if running inside KonMik WebView with postMessage channel
    const konmikChannel = typeof window !== "undefined" ? (window as any).KonMikApp : null;

    if (konmikChannel && typeof konmikChannel.postMessage === "function") {
      try {
        konmikChannel.postMessage(
          JSON.stringify({
            action: "install",
            url: rawUrl,
            name: ext.name,
            type: ext.type,
            status: ext.status || "aman",
          })
        );
      } catch (err) {
        console.error("Error sending to KonMikApp channel:", err);
      }
    } else {
      // Fallback deep link for external mobile browsers
      const deepLink = `konmik://extension/install?url=${encodeURIComponent(
        rawUrl
      )}&name=${encodeURIComponent(ext.name)}&type=${ext.type}&status=${encodeURIComponent(ext.status || "aman")}`;
      window.location.href = deepLink;
    }

    // Reset installing status after 3s if no direct ack
    setTimeout(() => {
      setInstallingId((current) => (current === ext.id ? null : current));
    }, 3000);
  };

  const handleCopyLink = (ext: ExtensionItem) => {
    const rawUrl = ext.raw_url || ext.rawUrl || "";
    if (navigator?.clipboard && rawUrl) {
      navigator.clipboard.writeText(rawUrl);
      setCopiedId(ext.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredExtensions = extensions.filter((ext) => {
    const matchesType = activeFilter === "all" || ext.type === activeFilter;
    const matchesSearch =
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ext.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ext.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <section id="extensions" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#110d09] -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse,rgba(255,122,0,0.07),transparent_65%)] -z-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.2)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.1)] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Puzzle className="w-3.5 h-3.5" aria-hidden="true" />
            Ekosistem Komunitas KonMik
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#f5ede4]">
            Katalog Ekstensi <span className="shimmer-text">Komunitas</span>
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed mb-6">
            Jelajahi dan pasang sumber baca komik & novel komunitas langsung ke aplikasi dengan <strong>1-Tap Pasang</strong> tanpa perlu salin tempel link.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
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
            <a
              href="https://discord.gg/DYD7PtzQrd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/40 text-[#8ea1ff] hover:text-white hover:bg-[#5865F2]/25 text-xs font-semibold transition-all duration-200"
            >
              <DiscordIcon className="w-3.5 h-3.5" />
              Daftarkan Ekstensimu di Discord
            </a>
          </div>
        </div>

        {/* Guide Panel */}
        <div
          className={`max-w-4xl mx-auto mb-10 overflow-hidden transition-all duration-300 ease-in-out ${
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
                className="text-[#6b5244] hover:text-[#a89282] p-1 rounded-lg hover:bg-[#221a13] transition-all cursor-pointer"
                aria-label="Tutup panduan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,122,0,0.15)] text-[#ff7a00] font-bold text-xs flex items-center justify-center mb-3">
                  ⚡ 1-Tap
                </div>
                <p className="font-semibold text-sm text-[#f5ede4] mb-1.5">
                  Tap &quot;Pasang ke KonMik&quot;
                </p>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Jika Anda membuka halaman ini dari menu <strong>Cari Ekstensi</strong> di dalam aplikasi KonMik, cukup tekan tombol <strong>Pasang</strong> pada kartu ekstensi. Ekstensi akan otomatis diunduh dan aktif seketika!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#110d09] border border-[#2a1d14]">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,122,0,0.15)] text-[#ff7a00] font-bold text-xs flex items-center justify-center mb-3">
                  📋 Salin
                </div>
                <p className="font-semibold text-sm text-[#f5ede4] mb-1.5">
                  Salin Tautan Script (.js)
                </p>
                <p className="text-xs text-[#a89282] leading-relaxed">
                  Jika Anda menggunakan browser biasa, Anda dapat menyalin tautan raw script dan menempelkannya di aplikasi melalui menu <strong>Jelajah &rarr; Pengaturan Sumber &rarr; Tambah Ekstensi</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Community Extension Registry (Cards with 1-Tap Install) ── */}
        <div className="mb-14">
          {/* Controls: Search & Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 rounded-2xl bg-[#18120e] border border-[#2a1d14] self-start">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#ff7a00] text-white shadow-[0_2px_12px_rgba(255,122,0,0.3)]"
                    : "text-[#a89282] hover:text-[#f5ede4]"
                }`}
              >
                Semua ({extensions.length})
              </button>
              <button
                onClick={() => setActiveFilter("comic")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "comic"
                    ? "bg-[#ff7a00] text-white shadow-[0_2px_12px_rgba(255,122,0,0.3)]"
                    : "text-[#a89282] hover:text-[#f5ede4]"
                }`}
              >
                Komik ({extensions.filter((e) => e.type === "comic").length})
              </button>
              <button
                onClick={() => setActiveFilter("novel")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === "novel"
                    ? "bg-[#ff7a00] text-white shadow-[0_2px_12px_rgba(255,122,0,0.3)]"
                    : "text-[#a89282] hover:text-[#f5ede4]"
                }`}
              >
                Novel ({extensions.filter((e) => e.type === "novel").length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#6b5244] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari nama ekstensi / tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#18120e] border border-[#2a1d14] text-[#f5ede4] placeholder-[#6b5244] focus:outline-none focus:border-[rgba(255,122,0,0.5)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5244] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Extensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExtensions.map((ext) => {
              const isInstalled = !!installedIds[ext.id];
              const isInstalling = installingId === ext.id;
              const isCopied = copiedId === ext.id;
              const typeLabel = ext.type === "novel" ? "Novel" : "Komik";
              const rawUrl = ext.raw_url || ext.rawUrl || "";

              return (
                <div
                  key={ext.id}
                  className="group relative flex flex-col bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.4)] rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,122,0,0.08)] flex-1"
                >
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${ext.color || "#FF7A00"}15, transparent 70%)`,
                    }}
                  />

                  {/* Header Row: Icon + Name + Version Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3.5 relative">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0 overflow-hidden relative"
                        style={{
                          backgroundColor: `${ext.color || "#FF7A00"}20`,
                          color: ext.color || "#FF7A00",
                          border: `1px solid ${ext.color || "#FF7A00"}40`,
                        }}
                      >
                        <img
                          src={getExtensionFaviconUrl(ext)}
                          alt={ext.name}
                          className="w-7 h-7 object-contain rounded-lg transition-transform duration-200 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement | null;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div
                          className="w-full h-full items-center justify-center font-black text-lg hidden"
                          style={{ color: ext.color || "#FF7A00" }}
                        >
                          {ext.type === "novel" ? <Book className="w-5 h-5" /> : <Puzzle className="w-5 h-5" />}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#f5ede4] group-hover:text-[#ff7a00] transition-colors flex items-center gap-1.5">
                          {ext.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#6b5244] mt-0.5">
                          <span>{ext.author || "Community"}</span>
                          <span>·</span>
                          <span className="font-mono">v{ext.version || "1.0.0"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {renderStatusBadge(ext.status)}
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0"
                          style={{
                            backgroundColor: ext.type === "novel" ? "rgba(63, 81, 181, 0.15)" : "rgba(255, 122, 0, 0.15)",
                            color: ext.type === "novel" ? "#8c9eff" : "#ff7a00",
                            border: `1px solid ${ext.type === "novel" ? "rgba(63, 81, 181, 0.3)" : "rgba(255, 122, 0, 0.3)"}`,
                          }}
                        >
                          {typeLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#a89282] leading-relaxed mb-4 relative min-h-[48px]">
                    {ext.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 relative">
                    {(ext.tags || []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-[#110d09] border border-[#2a1d14] text-[#a89282]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: 1-Tap Install + Copy Link */}
                  <div className="mt-auto relative pt-2 border-t border-[#2a1d14] flex items-center gap-2">
                    <button
                      onClick={() => handleInstall(ext)}
                      disabled={isInstalling || isInstalled}
                      className={`flex-1 py-2.5 px-3.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                        isInstalled
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default"
                          : isInstalling
                          ? "bg-[#ff7a00]/70 text-white animate-pulse"
                          : "bg-gradient-to-r from-[#ff7a00] to-[#e86e00] hover:from-[#ff8a1a] hover:to-[#ff7a00] text-white active:scale-[0.98]"
                      }`}
                    >
                      {isInstalled ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Terpasang</span>
                        </>
                      ) : isInstalling ? (
                        <>
                          <Zap className="w-3.5 h-3.5 animate-spin" />
                          <span>Memasang...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Pasang ke KonMik</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyLink(ext)}
                      title="Salin Raw URL Script"
                      className="p-2.5 rounded-xl bg-[#110d09] hover:bg-[#221a13] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.3)] text-[#a89282] hover:text-[#f5ede4] transition-all cursor-pointer"
                      aria-label="Salin tautan script ekstensi"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredExtensions.length === 0 && (
            <div className="text-center py-12 px-4 rounded-3xl bg-[#18120e] border border-[#2a1d14]">
              <Puzzle className="w-8 h-8 text-[#6b5244] mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#f5ede4] mb-1">Ekstensi tidak ditemukan</p>
              <p className="text-xs text-[#a89282]">
                Coba gunakan kata kunci pencarian lain atau pilih tab filter &quot;Semua&quot;.
              </p>
            </div>
          )}
        </div>

        {/* ── Discord Community Submission Callout Banner ── */}
        <div className="max-w-4xl mx-auto mb-12 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1a1528] via-[#14101e] to-[#100d17] border border-[#5865F2]/30 shadow-[0_12px_45px_rgba(88,101,242,0.15)] relative overflow-hidden">
          {/* Subtle Discord Indigo Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(88,101,242,0.12),transparent_70%)] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#5865F2] flex items-center justify-center shrink-0 mt-0.5 shadow-lg">
                <DiscordIcon className="w-6 h-6 text-[#7289da]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#8ea1ff] text-[10px] font-bold uppercase tracking-wider mb-2">
                  Daftarkan Ekstensi Komunitas
                </div>
                <h4 className="font-bold text-base sm:text-lg text-[#f5ede4] mb-1.5">
                  Punya Ekstensi Buatanmu Sendiri?
                </h4>
                <p className="text-xs sm:text-sm text-[#a89282] leading-relaxed max-w-xl">
                  Ingin ekstensi buatanmu terdaftar di katalog resmi komunitas KonMik agar bisa dipasang oleh ribuan pembaca? Daftarkan script ekstensi kamu dengan menghubungi Admin di server Discord KonMik!
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="https://discord.gg/DYD7PtzQrd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-[#5865F2] hover:bg-[#4752c4] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(88,101,242,0.35)]"
              >
                <DiscordIcon className="w-4 h-4" />
                <span>Hubungi Admin di Discord</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Two Core Architecture Cards (Builtin & Open Source) ── */}
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
                href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#110d09] hover:bg-[#1e1510] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.3)] text-[#f5ede4] text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Download Aplikasi KonMik</span>
                <Download className="w-3.5 h-3.5 text-[#ff7a00]" />
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

        {/* Developer Guide Callout: Format & Spesifikasi JS */}
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

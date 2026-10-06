"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, Menu, X, Puzzle, Sparkles, Eye, Activity, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { DOWNLOAD_URL_MAIN, DOWNLOAD_URL_ARM32 } from "@/lib/version";
import GithubIcon from "./GithubIcon";
import DiscordIcon from "./DiscordIcon";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Navbar({
  version = "1.6.2",
  solid = false,
}: {
  version?: string;
  solid?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Di hero (atas) navbar transparan menyatu dengan banner, setelah discroll baru muncul solid/blur
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#stats", label: "Statistik", icon: Activity },
    { href: "/#screenshots", label: "Preview", icon: Eye },
    { href: "/#extensions", label: "Ekstensi", icon: Puzzle },
    { href: "/#features", label: "Fitur", icon: Sparkles },
  ];

  const showSolidNav = solid || scrolled || mobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ease-in-out ${
        showSolidNav
          ? "bg-[#0c0906]/90 backdrop-blur-2xl border-b border-[#2a1d14] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-6xl">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[rgba(255,122,0,0.35)] shadow-[0_0_12px_rgba(255,122,0,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] transition-all duration-200 bg-[#1a1109]">
            <Image
              src="/citsune.jpg"
              alt="KonMik"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              src="/konmik-logo.png"
              alt="KonMik"
              width={105}
              height={28}
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              priority
            />
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(255,122,0,0.15)] text-[#ff7a00] border border-[rgba(255,122,0,0.3)] leading-none">
              v{version}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#a89282] hover:text-[#f5ede4] hover:bg-[#18120e] transition-all duration-150"
            >
              <Icon className="w-3.5 h-3.5 text-[#ff7a00]" aria-hidden="true" />
              {label}
            </Link>
          ))}
          <a
            href="https://discord.gg/YtuBhqtbvM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#a89282] hover:text-[#5865F2] hover:bg-[#18120e] transition-all duration-150"
            title="Join Discord Komunitas"
          >
            <DiscordIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">Discord</span>
          </a>
          <a
            href="https://chat.whatsapp.com/C0yDtiNTcmV05s4jQwPXNA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#a89282] hover:text-[#25D366] hover:bg-[#18120e] transition-all duration-150"
            title="Join WhatsApp Komunitas"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
          <a
            href="https://github.com/Faaizhamdhy/KonMik-Release"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#a89282] hover:text-[#f5ede4] hover:bg-[#18120e] transition-all duration-150"
          >
            <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
            GitHub
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Dual Download Dropdown */}
          <div className="relative hidden sm:block group">
            <div className="flex items-center rounded-xl bg-[#ff7a00] shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_28px_rgba(255,122,0,0.5)] transition-all overflow-hidden">
              <a
                href={DOWNLOAD_URL_MAIN}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white hover:bg-[#e86e00] transition-colors active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                Unduh APK
              </a>
              <button
                type="button"
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                className="px-2 py-2 border-l border-white/20 text-white hover:bg-[#e86e00] transition-colors cursor-pointer"
                aria-label="Pilih Versi APK"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dropdown Menu (Hover & Click) */}
            <div
              className={`absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-[#140e0a]/95 backdrop-blur-xl border border-[#2a1d14] shadow-2xl transition-all duration-200 z-50 ${
                downloadMenuOpen
                  ? "opacity-100 visible"
                  : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-[#6b5244] px-2.5 py-1">
                Pilih Versi Android
              </div>
              <a
                href={DOWNLOAD_URL_MAIN}
                onClick={() => setDownloadMenuOpen(false)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#20150e] transition-colors group/item"
              >
                <Download className="w-4 h-4 text-[#ff7a00] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#f5ede4] group-hover/item:text-[#ff7a00] transition-colors">
                    Versi Utama (64-bit)
                  </div>
                  <div className="text-[10px] text-[#a89282]">Rekomendasi untuk kebanyakan HP</div>
                </div>
              </a>
              <a
                href={DOWNLOAD_URL_ARM32}
                onClick={() => setDownloadMenuOpen(false)}
                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#20150e] transition-colors group/item"
              >
                <Download className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#f5ede4] group-hover/item:text-amber-400 transition-colors">
                    Versi ARM 32-bit
                  </div>
                  <div className="text-[10px] text-[#a89282]">Untuk HP lama / tidak kompatibel</div>
                </div>
              </a>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#18120e] border border-[#2a1d14] text-[#a89282] hover:text-[#f5ede4] hover:border-[rgba(255,122,0,0.3)] transition-all duration-150"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-[#2a1d14] bg-[#0c0906]/95 backdrop-blur-2xl px-4 py-4 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#a89282] hover:text-[#f5ede4] hover:bg-[#18120e] transition-all"
            >
              <Icon className="w-4 h-4 text-[#ff7a00] shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
          <a
            href="https://discord.gg/YtuBhqtbvM"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#a89282] hover:text-[#5865F2] hover:bg-[#18120e] transition-all"
          >
            <DiscordIcon className="w-4 h-4 text-[#5865F2] shrink-0" aria-hidden="true" />
            Join Discord Komunitas
          </a>
          <a
            href="https://chat.whatsapp.com/C0yDtiNTcmV05s4jQwPXNA"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#a89282] hover:text-[#25D366] hover:bg-[#18120e] transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
            Join WhatsApp Komunitas
          </a>
          <a
            href="https://github.com/Faaizhamdhy/KonMik-Release"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#a89282] hover:text-[#f5ede4] hover:bg-[#18120e] transition-all"
          >
            <GithubIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            GitHub Repository
          </a>
          <div className="pt-2 pb-1 space-y-2">
            <a
              href={DOWNLOAD_URL_MAIN}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-[#ff7a00] hover:bg-[#e86e00] text-white transition-all shadow-[0_0_20px_rgba(255,122,0,0.3)] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download APK Utama (64-bit)
            </a>
            <a
              href={DOWNLOAD_URL_ARM32}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-[#18120e] border border-[#2a1d14] hover:border-[rgba(255,122,0,0.35)] text-[#f5ede4] hover:bg-[#221a13] transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#ff7a00]" aria-hidden="true" />
              Download Versi 32-bit (HP Lama)
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

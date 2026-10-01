"use client";

import Link from "next/link";
import { Download, Menu, X, Puzzle, Sparkles } from "lucide-react";
import { useState } from "react";
import GithubIcon from "./GithubIcon";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(139,92,246,0.35)] group-hover:scale-105 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-foreground flex items-center gap-1">
                KonMik
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-primary/20 text-primary border border-primary/30">
                  APK
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-7 text-sm font-medium text-foreground/80">
            <Link
              href="/#features"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Fitur</span>
            </Link>
            <Link
              href="/#extensions"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Puzzle className="w-3.5 h-3.5 text-primary" />
              <span>Katalog Ekstensi</span>
            </Link>
            <Link
              href="/#trending"
              className="hover:text-primary transition-colors"
            >
              Trending
            </Link>
            <a
              href="https://github.com/Faaizhamdhy/KonMik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.25)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh APK v1.6.2</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground/80 hover:text-foreground p-2 rounded-lg bg-card border border-border"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-xl px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-background rounded-lg text-foreground/80 hover:text-primary transition-colors"
            >
              Fitur Aplikasi
            </Link>
            <Link
              href="/#extensions"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-background rounded-lg text-foreground/80 hover:text-primary transition-colors"
            >
              Katalog Ekstensi Modular
            </Link>
            <Link
              href="/#trending"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-background rounded-lg text-foreground/80 hover:text-primary transition-colors"
            >
              Trending Komik
            </Link>
            <a
              href="https://github.com/Faaizhamdhy/KonMik"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-background rounded-lg text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repositori GitHub</span>
            </a>
            <a
              href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
              className="w-full py-3 rounded-xl text-center text-xs font-semibold bg-primary text-white flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download APK v1.6.2 (~31 MB)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

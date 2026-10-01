"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, Menu, X, Puzzle, Sparkles, Eye } from "lucide-react";
import { useState } from "react";
import GithubIcon from "./GithubIcon";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo with Citsune Fox Icon */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-primary/40 shadow-[0_0_15px_rgba(255,122,0,0.3)] group-hover:scale-105 transition-transform bg-[#1e1713]">
              <Image
                src="https://api.konkon.id/static/assets/citsune.jpg"
                alt="KonMik Citsune Logo"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                KonMik
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                APK
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-7 text-sm font-medium text-foreground/80">
            <Link
              href="/#screenshots"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>Preview Aplikasi</span>
            </Link>
            <Link
              href="/#extensions"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Puzzle className="w-3.5 h-3.5 text-primary" />
              <span>Ekstensi</span>
            </Link>
            <Link
              href="/#features"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Fitur Komunitas</span>
            </Link>
            <a
              href="https://github.com/Faaizhamdhy/KonMik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
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
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white transition-all shadow-[0_0_15px_rgba(255,122,0,0.35)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh APK v1.6.2</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground/80 hover:text-foreground p-2 rounded-xl bg-card border border-border"
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
              href="/#screenshots"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-background rounded-xl text-foreground/80 hover:text-primary transition-colors"
            >
              Preview Aplikasi
            </Link>
            <Link
              href="/#extensions"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-background rounded-xl text-foreground/80 hover:text-primary transition-colors"
            >
              Katalog Ekstensi Modular
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-background rounded-xl text-foreground/80 hover:text-primary transition-colors"
            >
              Fitur Komunitas & Klan
            </Link>
            <a
              href="https://github.com/Faaizhamdhy/KonMik"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-background rounded-xl text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <a
              href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
              className="w-full py-3 rounded-xl text-center text-xs font-bold bg-primary text-white flex items-center justify-center gap-2 shadow-md"
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

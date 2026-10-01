import Link from "next/link";
import Image from "next/image";
import { Download, Heart } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-card/60 backdrop-blur-sm text-foreground/75">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/40 shadow-sm">
                <Image
                  src="https://api.konkon.id/static/assets/icon.jpg"
                  alt="KonMik Logo"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                KonMik
              </span>
            </div>
            <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
              Platform pembaca komik, manga, manhwa, dan webtoon gratis untuk Android bertema rubah **Citsune** tanpa iklan pop-up mengganggu.
            </p>
            <div className="pt-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-background border border-border text-foreground/70">
                Official Domain: <strong className="text-foreground">konmik.konkon.id</strong>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#screenshots" className="hover:text-primary transition-colors">
                  Preview Aplikasi
                </Link>
              </li>
              <li>
                <Link href="/#extensions" className="hover:text-primary transition-colors">
                  Katalog Ekstensi
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Fitur Komunitas
                </Link>
              </li>
            </ul>
          </div>

          {/* Download & Repo */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Aplikasi & Komunitas</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-primary" />
                  <span>Download APK (v1.6.2)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Faaizhamdhy/KonMik-Release/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Semua Rilis & Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Faaizhamdhy/KonMik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
          <p>
            &copy; {currentYear} KonMik &bull; Dikembangkan bersama Citsune untuk pembaca komik Indonesia.
          </p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> &bull; Bebas Iklan Pop-up
          </p>
        </div>
      </div>
    </footer>
  );
}

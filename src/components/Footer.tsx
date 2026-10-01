import Link from "next/link";
import { Download, Heart } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-card/40 backdrop-blur-sm text-foreground/70">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-sm">
                K
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                KonMik
              </span>
            </div>
            <p className="text-sm text-foreground/60 max-w-sm leading-relaxed">
              Platform pembaca komik, manga, manhwa, dan webtoon gratis untuk Android tanpa iklan mengganggu. Didukung arsitektur ekstensi JavaScript modular.
            </p>
            <div className="pt-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-background border border-border text-foreground/60">
                Official Domain: <strong>konmik.konkon.id</strong>
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
                <Link href="/#extensions" className="hover:text-primary transition-colors">
                  Katalog Ekstensi
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Fitur Unggulan
                </Link>
              </li>
              <li>
                <Link href="/#trending" className="hover:text-primary transition-colors">
                  Trending Komik
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
            &copy; {currentYear} KonMik. Dibangun untuk komunitas pembaca komik Indonesia.
          </p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> &bull; Bebas Iklan Pop-up
          </p>
        </div>
      </div>
    </footer>
  );
}

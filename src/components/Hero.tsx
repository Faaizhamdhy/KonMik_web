import { Download, ChevronRight, Sparkles, Smartphone, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const downloadUrl =
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

  return (
    <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
      {/* Background radial gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.25),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto px-4 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-medium text-primary mb-8 shadow-inner animate-in fade-in duration-500">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>KonMik v1.6.2 Rilis Terbaru</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
          <span className="text-foreground/70">Split APK ~31 MB</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.15]">
          Baca Manga, Manhwa & Webtoon{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
            Tanpa Iklan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-foreground/75 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nikmati ribuan judul komik favorit dengan dukungan ekstensi modular (Webtoon, SoftKomik, DoujinDesu, KomikIndo), reader super mulus, sistem klan, dan komunitas aktif.
        </p>

        {/* Call to Actions */}
        <div id="download" className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto mb-10">
          <a
            href={downloadUrl}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-white bg-primary hover:bg-primary-hover shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>Download KonMik (APK)</span>
          </a>

          <Link
            href="#extensions"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-foreground bg-card border border-border hover:border-primary/40 hover:bg-card/80 transition-all flex items-center justify-center gap-2"
          >
            <span>Katalog Ekstensi</span>
            <ChevronRight className="w-4 h-4 text-foreground/60" />
          </Link>
        </div>

        {/* Highlight Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm text-foreground/60 max-w-xl mx-auto pt-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>Android 7.0+ Support</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Bebas Pop-up Iklan</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Ekstensi JavaScript Cepat</span>
          </div>
        </div>

        {/* App Showcase Mockup Box */}
        <div className="mt-16 max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-4 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs text-foreground/50 ml-2 font-mono">
                  KonMik Reader Preview
                </span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                v1.6.2
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-background/50 border border-border">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  Mode Membaca
                </span>
                <h4 className="font-bold text-foreground text-sm mt-1">
                  Webtoon & Continuous Scroll
                </h4>
                <p className="text-xs text-foreground/60 mt-1">
                  Transisi gambar super mulus tanpa jeda, hemat kuota dan baterai.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/50 border border-border">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  Ekstensi Mandiri
                </span>
                <h4 className="font-bold text-foreground text-sm mt-1">
                  Multi-Source Support
                </h4>
                <p className="text-xs text-foreground/60 mt-1">
                  Pasang SoftKomik, Webtoon, DoujinDesu tanpa update aplikasi inti.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/50 border border-border">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  Komunitas
                </span>
                <h4 className="font-bold text-foreground text-sm mt-1">
                  Sistem Klan & Chat
                </h4>
                <p className="text-xs text-foreground/60 mt-1">
                  Koleksi border gacha profil dan ngobrol seru dengan sesama wibu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Download, ChevronRight, Sparkles, Smartphone, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const downloadUrl =
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background warm kitsune orange glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_-15%,rgba(255,122,0,0.22),rgba(18,14,11,0))]"></div>

      <div className="container mx-auto px-4 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-medium text-primary mb-8 shadow-inner animate-in fade-in duration-500">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>KonMik v1.6.2 &bull; Update Terbaru</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
          <span className="text-foreground/80">Tema Citsune &bull; ~31 MB</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.12]">
          Baca Manga, Manhwa & Webtoon{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-300">
            Bebas Iklan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-foreground/75 mb-10 max-w-2xl mx-auto leading-relaxed">
          Platform baca komik bertema rubah **Citsune** dengan ribuan judul komik bawaan, ekstensi modular, mode baca vertikal mulus, klan, dan teman AI cerdas.
        </p>

        {/* Call to Actions */}
        <div id="download" className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto mb-10">
          <a
            href={downloadUrl}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-primary hover:bg-primary-hover shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>Download KonMik APK</span>
          </a>

          <Link
            href="#screenshots"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-foreground bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all flex items-center justify-center gap-2"
          >
            <span>Preview Aplikasi</span>
            <ChevronRight className="w-4 h-4 text-foreground/60" />
          </Link>
        </div>

        {/* Highlight Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm text-foreground/60 max-w-xl mx-auto pt-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <span>Android 7.0+ (ARM64 & 32-bit)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Bebas Iklan Pop-up</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Citsune AI Mascot</span>
          </div>
        </div>

        {/* Mascot Banner Card with Citsune CDN Asset (citsune.jpg) */}
        <div className="mt-14 max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-amber-500/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700"></div>
          
          <div className="relative rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-6 text-left">
            {/* Citsune Mascot Image from CDN (citsune.jpg) */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-[0_10px_25px_rgba(255,122,0,0.3)] group-hover:scale-105 transition-transform duration-300 bg-[#241a14]">
              <Image
                src="https://api.konkon.id/static/assets/citsune.jpg"
                alt="Citsune Fox Mascot"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[11px] font-bold uppercase tracking-wider border border-primary/25">
                Maskot Resmi KonMik
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Temui Citsune, Adik Rubah Teman Membacamu!
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                Butuh rekomendasi komik seru tanpa drama? Mau rekap alur bab sebelumnya? Citsune hadir langsung di dalam aplikasi untuk memandu petualangan membacamu setiap hari.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

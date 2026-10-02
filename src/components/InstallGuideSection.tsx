import Image from "next/image";
import { ShieldAlert, Download, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function InstallGuideSection() {
  return (
    <section id="panduan" className="py-16 sm:py-20 relative overflow-hidden section-glow bg-[#0a0705]">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.3)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.15)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse,rgba(255,122,0,0.06),transparent_70%)] pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.3)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
            Panduan Pemasangan Android
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f5ede4] tracking-tight mb-3">
            Cara Melewati &ldquo;Aplikasi Diblokir Play Protect&rdquo;
          </h2>
          <p className="text-[#a89282] text-xs sm:text-sm md:text-base leading-relaxed">
            Aplikasi KonMik <strong className="text-emerald-400 font-semibold">100% aman, bersih, dan bebas iklan</strong>. 
            Karena didistribusikan langsung (sideload APK di luar Play Store), ikuti 2 langkah mudah berikut agar aplikasi terpasang sempurna:
          </p>
        </div>

        {/* 2 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-10">
          {/* Card Step 1 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] hover:border-[#ff7a00]/40 transition-all flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div>
              {/* Step Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ff7a00]/15 text-[#ff7a00] border border-[#ff7a00]/30">
                  Langkah 1
                </span>
                <span className="text-xs text-[#8d7768] font-mono">Buka Pilihan Tersembunyi</span>
              </div>

              {/* Annotated Screenshot 1 */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#2a1d14] bg-black/60 mb-5 shadow-inner">
                <img
                  src="/images/guide/step1_card.jpg"
                  alt="Panduan Play Protect Langkah 1 - Klik Detail Selengkapnya"
                  className="w-full h-auto object-contain block mx-auto hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Text Description */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#f5ede4] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff7a00] shrink-0" />
                  <span>Ketuk &ldquo;Detail selengkapnya ∨&rdquo;</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#a89282] leading-relaxed">
                  Saat jendela hitam Play Protect muncul, opsi pemasangan disembunyikan oleh sistem Android. 
                  Ketuk tulisan <strong className="text-[#ff7a00]">&ldquo;Detail selengkapnya ∨&rdquo;</strong> (seperti pada lingkaran oranye) untuk memunculkan tombol pemasangan.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#22160e] flex items-center gap-2 text-[11px] text-[#ff7a00]/80 font-medium">
              <span>👉 Ketuk tanda panah untuk lanjut ke langkah 2</span>
            </div>
          </div>

          {/* Card Step 2 */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#140e0a] border border-[#2a1d14] hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div>
              {/* Step Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Langkah 2
                </span>
                <span className="text-xs text-red-400 font-mono font-bold">⚠️ Jangan Klik Oke!</span>
              </div>

              {/* Annotated Screenshot 2 */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#2a1d14] bg-black/60 mb-5 shadow-inner">
                <img
                  src="/images/guide/step2_card.jpg"
                  alt="Panduan Play Protect Langkah 2 - Klik Tetap Instal"
                  className="w-full h-auto object-contain block mx-auto hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Text Description */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#f5ede4] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>Ketuk &ldquo;Tetap instal&rdquo; (Install anyway)</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#a89282] leading-relaxed">
                  Setelah menu terbuka, ketuk tulisan <strong className="text-emerald-400">&ldquo;Tetap instal&rdquo;</strong> (lingkaran hijau).
                  <br />
                  <strong className="text-red-400 font-semibold">PERINGATAN:</strong> Jangan menekan tombol biru <em>&ldquo;Oke&rdquo;</em> karena akan membatalkan instalasi aplikasi.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#22160e] flex items-center gap-2 text-[11px] text-emerald-400/90 font-medium">
              <span>✓ Aplikasi KonMik langsung terpasang dan siap dinikmati!</span>
            </div>
          </div>
        </div>

        {/* Security Reassurance Callout */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#18110b] via-[#1f150e] to-[#18110b] border border-[#ff7a00]/25 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-[#f5ede4] flex items-center justify-center sm:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Jaminan Keamanan & Privasi 100%</span>
            </h4>
            <p className="text-xs text-[#a89282] max-w-xl">
              KonMik tidak meminta izin berbahaya (tidak ada akses kontak, SMS, atau kamera). File APK diverifikasi dengan checksum resmi SHA-256 di GitHub Releases.
            </p>
          </div>

          <a
            href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#ff7a00] hover:bg-[#e06b00] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,122,0,0.35)] shrink-0 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh KonMik APK Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
}

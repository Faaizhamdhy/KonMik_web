import { Trophy, Users, MessagesSquare, Gem, Star, Shield, BookOpen, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Gem,
    title: "KonPoin & Gacha",
    desc: "Kumpulkan poin setiap hari dari membaca dan gunakan untuk gacha border profil keren dan stiker eksklusif.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20 hover:border-purple-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]",
  },
  {
    icon: Shield,
    title: "Sistem Klan",
    desc: "Buat atau gabung ke klan. Bersaing di papan peringkat klan dan donasikan poin untuk menaikkan level.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
  },
  {
    icon: Users,
    title: "Matchmaking Teman",
    desc: "Sistem jodoh teman acak berdasarkan minat komik yang sama. Temukan teman mabar atau ngobrol seru.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20 hover:border-pink-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(236,72,153,0.12)]",
  },
  {
    icon: Trophy,
    title: "Leaderboard Pembaca",
    desc: "Pamerkan dedikasimu! Tembus peringkat teratas berdasarkan jumlah chapter yang kamu selesaikan.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(234,179,8,0.12)]",
  },
  {
    icon: MessagesSquare,
    title: "Obrolan Global & Privat",
    desc: "Diskusikan teori konspirasi komik favoritmu langsung di dalam aplikasi dengan pembaca lain.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(52,211,153,0.12)]",
  },
  {
    icon: Star,
    title: "Tantangan Harian",
    desc: "Pertahankan streak harianmu dan selesaikan tantangan untuk mendapatkan hadiah melimpah.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20 hover:border-orange-500/40",
    glow: "hover:shadow-[0_8px_32px_rgba(249,115,22,0.12)]",
  },
];

const HIGHLIGHTS = [
  { icon: BookOpen, label: "Ribuan judul komik", sub: "Bawaan + ekstensi" },
  { icon: Zap, label: "Ringan & cepat", sub: "Tanpa lag" },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0c0906] -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.2)] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,122,0,0.1)] border border-[rgba(255,122,0,0.25)] text-[#ff7a00] text-xs font-semibold uppercase tracking-wider mb-5">
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            Fitur Komunitas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-[#f5ede4]">
            Bukan Sekadar{" "}
            <span className="shimmer-text">Tempat Baca</span>
          </h2>
          <p className="text-[#a89282] text-base md:text-lg leading-relaxed">
            KonMik mengubah pengalaman membaca komik menjadi lebih interaktif dan sosial.
            Bergabunglah dengan komunitas pembaca aktif dan rasakan keseruannya.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg, border, glow }) => (
            <div
              key={title}
              className={`group p-6 rounded-2xl bg-[#18120e] border transition-all duration-300 cursor-default ${border} ${glow}`}
            >
              <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#f5ede4] mb-2">{title}</h3>
              <p className="text-sm text-[#a89282] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e150f] to-[#110d09] border border-[#2a1d14] p-8 sm:p-10 text-center">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,0,0.08),transparent_65%)] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.4)] to-transparent" />

          <div className="relative flex flex-wrap justify-center gap-6 mb-8">
            {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[rgba(255,122,0,0.08)] border border-[rgba(255,122,0,0.2)]">
                <Icon className="w-4 h-4 text-[#ff7a00]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#f5ede4]">{label}</p>
                  <p className="text-xs text-[#a89282]">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="relative text-xl sm:text-2xl font-bold text-[#f5ede4] mb-3">
            Siap bergabung bersama komunitas KonMik?
          </h3>
          <p className="relative text-sm text-[#a89282] mb-6 max-w-md mx-auto">
            Download sekarang dan nikmati pengalaman membaca komik terbaik di Android.
          </p>
          <a
            href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white text-sm bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_28px_rgba(255,122,0,0.4)] hover:shadow-[0_0_40px_rgba(255,122,0,0.55)] active:scale-[0.97]"
          >
            Download KonMik APK — Gratis
          </a>
        </div>
      </div>
    </section>
  );
}

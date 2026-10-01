import { Trophy, Users, MessagesSquare, Gem, Star, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "KonPoin & Gacha",
      desc: "Kumpulkan poin setiap hari dan gunakan untuk gacha border profil yang keren dan stiker eksklusif.",
      icon: <Gem className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Sistem Klan",
      desc: "Buat atau gabung ke klan. Bersaing di papan peringkat klan dan donasikan poin untuk menaikkan level.",
      icon: <Shield className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Matchmaking Teman",
      desc: "Sistem jodoh/teman acak berdasarkan minat komik yang sama. Temukan teman mabar atau ngobrol seru.",
      icon: <Users className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "Leaderboard Pembaca",
      desc: "Pamerkan dedikasimu! Tembus peringkat teratas berdasarkan jumlah chapter yang kamu selesaikan.",
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
    },
    {
      title: "Obrolan Global & Privat",
      desc: "Diskusikan teori konspirasi komik favoritmu langsung di dalam aplikasi dengan pembaca lain.",
      icon: <MessagesSquare className="w-6 h-6 text-green-400" />,
    },
    {
      title: "Tantangan Harian",
      desc: "Pertahankan Streak harianmu dan selesaikan tantangan untuk mendapatkan hadiah melimpah.",
      icon: <Star className="w-6 h-6 text-orange-400" />,
    },
  ];

  return (
    <section id="features" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bukan Sekadar Tempat Baca</h2>
          <p className="text-foreground/70 text-lg">
            Kami mengubah pengalaman membaca komik menjadi lebih interaktif. Bergabunglah dengan komunitas yang aktif dan rasakan keseruannya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

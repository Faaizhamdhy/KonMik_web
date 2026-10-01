import { Database, Zap, BookOpen, Layers } from "lucide-react";

export default function Sources() {
  const sources = [
    { name: "Komikindo", icon: <Database className="w-8 h-8 text-blue-400" />, desc: "Koleksi manga terlengkap" },
    { name: "Comiccast", icon: <Zap className="w-8 h-8 text-yellow-400" />, desc: "Update super cepat" },
    { name: "Ainz", icon: <BookOpen className="w-8 h-8 text-green-400" />, desc: "Pilihan manhwa terbaik" },
    { name: "Komiknesia", icon: <Layers className="w-8 h-8 text-purple-400" />, desc: "Ribuan chapter tersedia" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Agregator Komik Terbesar</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Tidak perlu repot pindah-pindah web. Kami mengumpulkan ribuan komik dari berbagai sumber populer di Indonesia menjadi satu kesatuan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sources.map((source, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)] hover:border-primary/30">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4 border border-border">
                {source.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{source.name}</h3>
              <p className="text-sm text-foreground/60">{source.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

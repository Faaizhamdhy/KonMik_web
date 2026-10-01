import { Flame } from "lucide-react";
import Image from "next/image";

type Comic = {
  id: string;
  title: string;
  thumb: string;
  type?: string;
  score?: string;
};

// Mock data for initial UI build
const MOCK_TRENDING: Comic[] = [
  { id: "1", title: "Solo Leveling", thumb: "https://placehold.co/300x400/1e293b/8b5cf6?text=Solo+Leveling", type: "Manhwa", score: "9.8" },
  { id: "2", title: "One Piece", thumb: "https://placehold.co/300x400/1e293b/8b5cf6?text=One+Piece", type: "Manga", score: "9.9" },
  { id: "3", title: "Omniscient Reader", thumb: "https://placehold.co/300x400/1e293b/8b5cf6?text=ORV", type: "Manhwa", score: "9.7" },
  { id: "4", title: "Jujutsu Kaisen", thumb: "https://placehold.co/300x400/1e293b/8b5cf6?text=JJK", type: "Manga", score: "9.5" },
  { id: "5", title: "Martial Peak", thumb: "https://placehold.co/300x400/1e293b/8b5cf6?text=Martial+Peak", type: "Manhua", score: "8.9" },
];

export default function Trending({ comics = MOCK_TRENDING }: { comics?: Comic[] }) {
  return (
    <section id="trending" className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Flame className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold tracking-tight">Trending Sekarang</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {comics.map((comic) => (
            <div key={comic.id} className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-800">
                <Image
                  src={comic.thumb}
                  alt={comic.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {comic.score && (
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-yellow-400">
                    ★ {comic.score}
                  </div>
                )}
                {comic.type && (
                  <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
                    {comic.type}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {comic.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

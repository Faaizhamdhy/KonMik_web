import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Originals() {
  return (
    <section id="originals" className="py-20 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              Eksklusif KonMik
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Karya Orisinal dari Kreator Lokal Terbaik
            </h2>
            <p className="text-foreground/80 mb-8 text-lg">
              Dukung kreator komik Indonesia dengan membaca karya orisinal mereka. Cerita yang fresh, art yang memukau, hanya bisa kamu temukan di KonMik.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">✓</div>
                <span>Update mingguan teratur</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">✓</div>
                <span>Dukung kreator lewat Donasi & KonPoin</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">✓</div>
                <span>Kualitas gambar Super HD</span>
              </li>
            </ul>
            <button className="px-6 py-3 rounded-lg font-medium text-primary border border-primary hover:bg-primary hover:text-white transition-all flex items-center gap-2">
              Jelajahi Originals <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-border">
                <Image src="https://placehold.co/400x600/1e293b/8b5cf6?text=Orig+1" alt="Original 1" width={400} height={600} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-border">
                <Image src="https://placehold.co/400x600/1e293b/8b5cf6?text=Orig+2" alt="Original 2" width={400} height={600} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-border">
                <Image src="https://placehold.co/400x600/1e293b/8b5cf6?text=Orig+3" alt="Original 3" width={400} height={600} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-border">
                <Image src="https://placehold.co/400x600/1e293b/8b5cf6?text=Orig+4" alt="Original 4" width={400} height={600} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

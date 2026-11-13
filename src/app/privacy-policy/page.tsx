import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestVersion } from "@/lib/version";

export const metadata: Metadata = {
  title: "Kebijakan Privasi (Privacy Policy)",
  description:
    "Kebijakan privasi resmi aplikasi KonMik. Pelajari bagaimana kami mengelola, melindungi data pribadi pengguna, serta komitmen kami terhadap keamanan data.",
  openGraph: {
    title: "Kebijakan Privasi - KonMik",
    description:
      "Pelajari bagaimana KonMik melindungi privasi dan data pengguna dengan aman dan transparan.",
    url: "https://konmik.konkon.id/privacy-policy",
  },
};

export default async function PrivacyPolicyPage() {
  const version = await getLatestVersion();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0c0d12] text-slate-200">
      <Navbar version={version} solid />
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Resmi & Terverifikasi
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Kebijakan Privasi KonMik
          </h1>
          <p className="text-sm text-slate-400">
            Terakhir diperbarui: 13 November 2026 • Berlaku efektif untuk seluruh pengguna aplikasi KonMik
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              1. Pendahuluan
            </h2>
            <p>
              KonMik (&ldquo;kami&rdquo;) sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda percayakan saat menggunakan aplikasi mobile KonMik maupun situs resmi{" "}
              <a href="https://konmik.konkon.id" className="text-amber-400 hover:underline">
                konmik.konkon.id
              </a>
              . Dokumen ini menjelaskan jenis informasi yang kami kumpulkan, cara kami menggunakannya, dan hak-hak yang Anda miliki atas data Anda.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              2. Data yang Kami Kumpulkan
            </h2>
            <p className="mb-4">
              Kami hanya mengumpulkan informasi yang esensial untuk mendukung fungsionalitas aplikasi dan kenyamanan membaca Anda:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Informasi Akun:</strong> Alamat email dan username yang Anda buat saat mendaftar. Kata sandi selalu dienkripsi (one-way hashing) dan tidak dapat dilihat oleh pihak manapun.
              </li>
              <li>
                <strong className="text-white">Aktivitas Membaca & Gamifikasi:</strong> Riwayat chapter terakhir dibaca, daftar favorit/bookmark, koleksi kartu, badge, dan statistik klan guna sinkronisasi antar perangkat.
              </li>
              <li>
                <strong className="text-white">Poin Virtual & Pembelian:</strong> Saldo KonPoin (KP) dan status keanggotaan VIP untuk validasi kepemilikan kosmetik profil (avatar border, stiker).
              </li>
              <li>
                <strong className="text-white">Berkas Dokumen Lokal (CBZ / ZIP):</strong> Berkas komik lokal yang Anda buka di aplikasi diproses secara 100% lokal di perangkat Anda dan <em>tidak pernah</em> diunggah ke server kami.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              3. Penggunaan Informasi
            </h2>
            <p className="mb-3">Informasi yang dikumpulkan digunakan semata-mata untuk:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Menyimpan dan menyinkronkan progres bacaan serta bookmark Anda.</li>
              <li>Menjalankan fitur sosial komunitas seperti klan, relasi pertemanan, dan obrolan antarpengguna.</li>
              <li>Menjaga keamanan akun serta mencegah aktivitas spam atau penyalahgunaan layanan.</li>
              <li>Menyampaikan pembaruan penting terkait status akun Anda.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              4. Perlindungan & Berbagi Data Pihak Ketiga
            </h2>
            <p className="mb-3">
              <strong className="text-white">Kami tidak menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga manapun.</strong>
            </p>
            <p>
              Data Anda disimpan dalam basis data terenkripsi dan terlindungi di infrastruktur server mandiri. Kami tidak menyematkan pelacak iklan pihak ketiga yang mengumpulkan profil pribadi Anda untuk keperluan periklanan terarah.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              5. Hak Pengguna & Penghapusan Akun
            </h2>
            <p className="mb-3">
              Anda memiliki kendali penuh atas data pribadi Anda:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-4">
              <li>Anda dapat menyunting profil, username, dan preferensi privasi kapan saja melalui menu Pengaturan di dalam aplikasi.</li>
              <li>Anda berhak meminta penghapusan total seluruh data dan akun Anda kapan saja.</li>
            </ul>
            <p>
              Untuk panduan lengkap penghapusan akun mandiri atau permohonan melalui email, silakan kunjungi halaman{" "}
              <a href="/delete-account" className="text-amber-400 font-semibold hover:underline">
                Permohonan Hapus Akun KonMik
              </a>
              .
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              6. Hubungi Kami
            </h2>
            <p className="mb-3">
              Jika Anda memiliki pertanyaan, masukan, atau permohonan terkait privasi dan perlindungan data pribadi, silakan hubungi tim kami secara langsung melalui:
            </p>
            <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 flex items-center gap-3">
              <span className="text-xl">✉️</span>
              <div>
                <div className="text-xs text-slate-400">Email Resmi Perlindungan Data & Bantuan:</div>
                <a
                  href="mailto:konmikofficial@gmail.com"
                  className="text-amber-400 font-semibold hover:underline text-base"
                >
                  konmikofficial@gmail.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer version={version} />
    </div>
  );
}

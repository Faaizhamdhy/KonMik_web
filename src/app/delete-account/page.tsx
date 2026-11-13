import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestVersion } from "@/lib/version";

export const metadata: Metadata = {
  title: "Permohonan Penghapusan Akun & Data (Account Deletion)",
  description:
    "Panduan dan permohonan resmi penghapusan akun serta data pengguna aplikasi KonMik sesuai standar kebijakan privasi Google Play.",
  openGraph: {
    title: "Permohonan Hapus Akun - KonMik",
    description:
      "Cara mudah dan cepat menghapus akun serta seluruh data pribadi Anda dari aplikasi KonMik.",
    url: "https://konmik.konkon.id/delete-account",
  },
};

export default async function DeleteAccountPage() {
  const version = await getLatestVersion();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0c0d12] text-slate-200">
      <Navbar version={version} solid />
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            Hak Privasi & Kendali Pengguna
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Permohonan Penghapusan Akun & Data
          </h1>
          <p className="text-sm text-slate-400">
            Sesuai regulasi transparansi Google Play Store, Anda memiliki hak penuh untuk menghapus akun dan data riwayat Anda secara permanen.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          {/* Metode 1: Langsung di Aplikasi */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center text-sm">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Metode 1: Hapus Mandiri Langsung dari Aplikasi (Instan)
              </h2>
            </div>
            <p className="mb-4 text-slate-300">
              Jika Anda masih memiliki akses ke aplikasi KonMik di perangkat Android Anda, penghapusan dapat dilakukan langsung secara mandiri dalam hitungan detik:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 mb-4">
              <li>Buka aplikasi <strong>KonMik</strong> di perangkat Anda.</li>
              <li>Pilih menu <strong>Pengaturan</strong> (ikon gerigi di bilah navigasi atau profil).</li>
              <li>Gulir ke bagian <strong>Akun</strong> dan pilih menu <strong>Hapus Akun</strong>.</li>
              <li>Konfirmasi kata sandi Anda untuk memastikan kepemilikan akun.</li>
              <li>Akun dan sesi Anda akan langsung dinonaktifkan seketika.</li>
            </ol>
          </section>

          {/* Metode 2: Permohonan Web / Email */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-sm">
                2
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Metode 2: Permohonan Melalui Email Resmi (Jika Aplikasi Sudah Dihapus)
              </h2>
            </div>
            <p className="mb-4 text-slate-300">
              Jika Anda telah meng-uninstall aplikasi KonMik atau tidak dapat mengakses perangkat Anda, Anda tetap dapat meminta tim kami menghapus seluruh data Anda tanpa perlu memasang aplikasi kembali:
            </p>
            <div className="bg-black/30 border border-white/10 rounded-xl p-5 mb-5 space-y-3">
              <div className="text-white font-semibold flex items-center gap-2">
                <span>📝</span> Format Email Permohonan Penghapusan:
              </div>
              <div className="text-xs sm:text-sm font-mono text-slate-300 bg-black/40 p-4 rounded-lg border border-white/5 space-y-1">
                <div><span className="text-slate-500">Kepada:</span> konmikofficial@gmail.com</div>
                <div><span className="text-slate-500">Subjek:</span> Permohonan Hapus Akun KonMik - [Username Anda]</div>
                <div className="pt-2"><span className="text-slate-500">Isi Pesan:</span></div>
                <div className="text-slate-400">
                  Saya pemilik akun dengan username: <strong>[Username Anda]</strong> dan email: <strong>[Email Terdaftar]</strong>. Dengan ini saya memohon agar akun dan seluruh data terkait saya di KonMik dihapus secara permanen.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="mailto:konmikofficial@gmail.com?subject=Permohonan%20Hapus%20Akun%20KonMik&body=Halo%20Tim%20KonMik,%0A%0ASaya%20ingin%20mengajukan%20penghapusan%20akun%20saya:%0A-%20Username:%20%0A-%20Email%20Terdaftar:%20%0A%0ATerima%20kasih."
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-600/20"
              >
                <span>✉️</span>
                Kirim Permohonan Hapus Akun via Email
              </a>
              <span className="text-xs text-slate-400">
                Respon maksimal dalam 1 x 24 jam kerja.
              </span>
            </div>
          </section>

          {/* Rincian Data yang Dihapus */}
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
              Data Apa Saja yang Akan Dihapus Secara Permanen?
            </h2>
            <p className="mb-4">
              Ketika akun Anda dihapus, seluruh data berikut akan dimusnahkan secara permanen dari server kami dan tidak dapat dipulihkan kembali:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-300">
              <li className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm">Identitas Akun</div>
                  <div className="text-xs text-slate-400">Username, email terdaftar, avatar, dan bio profil.</div>
                </div>
              </li>
              <li className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm">Riwayat & Bookmark</div>
                  <div className="text-xs text-slate-400">Seluruh riwayat chapter terakhir dibaca dan daftar favorit.</div>
                </div>
              </li>
              <li className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm">Aset Virtual & Gamifikasi</div>
                  <div className="text-xs text-slate-400">Koleksi kartu karakter, border gacha, badge, dan sisa saldo KP.</div>
                </div>
              </li>
              <li className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm">Keanggotaan Sosial</div>
                  <div className="text-xs text-slate-400">Keluarnya akun dari klan dan pemutusan daftar relasi pertemanan.</div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer version={version} />
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileClient from "./ProfileClient";
import { getFullUserProfile } from "@/lib/user-profile";
import { getLatestVersion } from "@/lib/version";
import { UserX, ArrowLeft, Download } from "lucide-react";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  const profile = await getFullUserProfile(decodedUsername);

  if (!profile) {
    return {
      title: "Pengguna Tidak Ditemukan | KonMik",
      description: "Profil pengguna tidak ditemukan di platform KonMik.",
    };
  }

  const title = `${profile.displayName} (@${profile.username}) - Profil Pengguna | KonMik`;
  const description = `Lihat profil pembaca @${profile.username} di KonMik. Total ${profile.chapters.toLocaleString("id-ID")} chapter dibaca, ${profile.minutes.toLocaleString("id-ID")} menit membaca, streak ${profile.streak} hari, dan koleksi ${profile.ownedBordersCount} border.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://konmik.konkon.id/u/${encodeURIComponent(profile.username)}`,
      images: [
        {
          url: profile.profileUrl || "https://konmik.konkon.id/citsune.jpg",
          width: 500,
          height: 500,
          alt: profile.displayName,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [profile.profileUrl || "https://konmik.konkon.id/citsune.jpg"],
    },
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const [version, profile] = await Promise.all([
    getLatestVersion(),
    getFullUserProfile(decodedUsername),
  ]);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0c0906] text-[#f5ede4]">
        <Navbar version={version} solid={true} />

        <main className="flex-1 container mx-auto px-4 max-w-xl flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#1e140d] border border-[#ff7a00]/30 flex items-center justify-center text-[#ff7a00] mb-6 shadow-xl">
            <UserX className="w-10 h-10" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Pengguna Tidak Ditemukan
          </h1>
          <p className="text-sm text-[#a89282] max-w-md leading-relaxed mb-8">
            Akun dengan username <strong className="text-[#f5ede4]">@{decodedUsername}</strong> tidak terdaftar atau belum memiliki aktivitas di sistem KonMik.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1a110a] hover:bg-[#251810] border border-[#2a1d14] text-sm font-semibold text-[#f5ede4] transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#ff7a00]" />
              <span>Kembali ke Beranda</span>
            </Link>

            <a
              href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#ff7a00] hover:bg-[#e86e00] text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(255,122,0,0.35)]"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Aplikasi KonMik</span>
            </a>
          </div>
        </main>

        <Footer version={version} />
      </div>
    );
  }

  // Schema.org Person metadata
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    alternateName: profile.username,
    url: `https://konmik.konkon.id/u/${encodeURIComponent(profile.username)}`,
    image: profile.profileUrl || undefined,
    description: `Pembaca aktif di KonMik dengan ${profile.chapters} chapter dibaca dan ${profile.minutes} menit waktu membaca.`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0906] text-[#f5ede4]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Navbar version={version} solid={true} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-6xl pt-24 pb-16">
        <ProfileClient profile={profile} />
      </main>

      <Footer version={version} />
    </div>
  );
}

import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatrixClient from "./MatrixClient";
import { getFullUserProfile, verifySessionToken } from "@/lib/user-profile";

export const revalidate = 30; // revalidate every 30 seconds

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ u?: string; username?: string }>;
}): Promise<Metadata> {
  const resolved = await searchParams;
  const username = resolved.u || resolved.username;

  if (username) {
    return {
      title: `Matrix Akun @${username} — KonMik Command Center`,
      description: `Dashboard Matrix Akun dan telemetri membaca resmi pengguna @${username} di KonMik.`,
      openGraph: {
        title: `Matrix Akun @${username} | KonMik`,
        description: `Lihat ringkasan telemetri membaca, saldo KonPoin, klan, dan pencapaian @${username}.`,
      },
    };
  }

  return {
    title: "Matrix Akun — KonMik Command Center",
    description: "Pusat telemetri akun, analitik membaca, dan ekosistem sosial KonMik.",
  };
}

export default async function MatrixPage({
  searchParams,
}: {
  searchParams: Promise<{ u?: string; username?: string; token?: string }>;
}) {
  const resolved = await searchParams;
  const username = (resolved.u || resolved.username || "").trim();
  const token = (resolved.token || "").trim();

  let initialProfile = null;
  let sessionStatus = {
    valid: false,
    checked: false,
    message: "",
  };

  if (token) {
    const verification = await verifySessionToken(token);
    sessionStatus = {
      valid: verification.valid,
      checked: true,
      message: verification.valid
        ? "Sesi aplikasi aktif dan terotentikasi"
        : verification.message || "Sesi tidak valid",
    };
  }

  if (username) {
    initialProfile = await getFullUserProfile(username);
  }

  return (
    <div className="min-h-screen bg-[#080503] text-[#f5ede4] flex flex-col selection:bg-[#ff7a00] selection:text-white">
      <Navbar solid={true} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 pt-24 pb-16 max-w-5xl">
        <MatrixClient
          initialProfile={initialProfile}
          initialUsername={username}
          initialToken={token}
          initialSessionStatus={sessionStatus}
        />
      </main>

      <Footer />
    </div>
  );
}

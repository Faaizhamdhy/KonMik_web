import Link from "next/link";
import Image from "next/image";
import { Download, Heart, ExternalLink } from "lucide-react";
import GithubIcon from "./GithubIcon";
import DiscordIcon from "./DiscordIcon";
import WhatsAppIcon from "./WhatsAppIcon";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#stats", label: "Statistik Komunitas" },
  { href: "/#screenshots", label: "Preview Aplikasi" },
  { href: "/#extensions", label: "Katalog Ekstensi" },
  { href: "/#features", label: "Fitur Unggulan" },
];

const getAppLinks = (version: string) => [
  {
    href: "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk",
    label: `Download APK (v${version})`,
    icon: Download,
    external: false,
  },
  {
    href: "https://discord.gg/YtuBhqtbvM",
    label: "Discord Komunitas",
    icon: DiscordIcon,
    external: true,
  },
  {
    href: "https://chat.whatsapp.com/C0yDtiNTcmV05s4jQwPXNA",
    label: "WhatsApp Komunitas",
    icon: WhatsAppIcon,
    external: true,
  },
  {
    href: "https://github.com/Faaizhamdhy/KonMik-Release",
    label: "GitHub KonMik (Public)",
    icon: GithubIcon,
    external: true,
  },
  {
    href: "https://github.com/Faaizhamdhy/KonMIk-Extension-",
    label: "Repo Ekstensi KonMik",
    icon: ExternalLink,
    external: true,
  },
];

export default function Footer({ version = "1.6.2" }: { version?: string }) {
  const year = new Date().getFullYear();
  const appLinks = getAppLinks(version);

  return (
    <footer className="relative overflow-hidden border-t border-[#2a1d14]">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0704] -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,122,0,0.2)] to-transparent" />
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse,rgba(255,122,0,0.04),transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand col */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[rgba(255,122,0,0.3)] shadow-[0_0_12px_rgba(255,122,0,0.2)] group-hover:shadow-[0_0_20px_rgba(255,122,0,0.35)] transition-all duration-200 bg-[#1a1109]">
                <Image
                  src="/citsune.jpg"
                  alt="KonMik Logo"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#f5ede4]">KonMik</span>
            </Link>

            <p className="text-sm text-[#a89282] max-w-xs leading-relaxed">
              Platform pembaca komik, manga, dan manhwa gratis untuk Android didampingi asisten AI{" "}
              <strong className="text-[#f5ede4] font-semibold">Citsune</strong> — 100% tanpa iklan pop-up mengganggu.
            </p>

            {/* Download CTA */}
            <a
              href="https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#ff7a00] hover:bg-[#e86e00] transition-all duration-200 shadow-[0_0_16px_rgba(255,122,0,0.3)] hover:shadow-[0_0_24px_rgba(255,122,0,0.45)] active:scale-[0.97]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              Download APK v{version} (~31 MB)
            </a>

            <div className="pt-1">
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-[#18120e] border border-[#2a1d14] text-[#6b5244]">
                Domain resmi:{" "}
                <strong className="text-[#a89282]">konmik.konkon.id</strong>
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-bold text-[#f5ede4] text-sm mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#a89282] hover:text-[#ff7a00] transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App links */}
          <div>
            <h4 className="font-bold text-[#f5ede4] text-sm mb-4">Aplikasi & Komunitas</h4>
            <ul className="space-y-2.5">
              {appLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-1.5 text-sm text-[#a89282] hover:text-[#ff7a00] transition-colors duration-150 group/link"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-[#6b5244] group-hover/link:text-[#ff7a00] transition-colors" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a1d14] to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6b5244]">
          <p>
            &copy; {year} KonMik &bull; Dibuat untuk seluruh penikmat komik di Indonesia.
          </p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan
            <Heart className="w-3 h-3 text-[#ff7a00] fill-[#ff7a00]" aria-hidden="true" />
            &bull; 100% Bebas Iklan Pop-up
          </p>
        </div>
      </div>
    </footer>
  );
}

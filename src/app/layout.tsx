import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://konmik.konkon.id"),
  title: {
    default: "KonMik - Aplikasi Baca Komik, Manga & Manhwa Gratis Android",
    template: "%s | KonMik",
  },
  description:
    "Download KonMik APK versi terbaru. Platform pembaca komik terlengkap tanpa iklan mengganggu dengan dukungan ekstensi modular (Webtoon, Doujindesu, SoftKomik, KomikIndo), mode baca nyaman, klan, dan komunitas.",
  keywords: [
    "KonMik",
    "KonMik APK",
    "baca komik online",
    "aplikasi baca manga",
    "aplikasi baca manhwa",
    "komik indonesia",
    "konmik extension",
    "webtoon extension",
    "doujindesu extension",
    "softkomik extension",
    "komikindo extension",
  ],
  authors: [{ name: "KonMik Team", url: "https://konmik.konkon.id" }],
  creator: "KonMik",
  publisher: "KonMik",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "CD50ycNbusbpE_IxOjE-r0oVeU-vPsGHF9vzfc9tGfc",
  },
  openGraph: {
    title: "KonMik - Aplikasi Baca Komik, Manga & Manhwa Gratis Android",
    description:
      "Aplikasi baca komik terlengkap dengan ekstensi modular, mode baca nyaman, fitur klan, dan komunitas.",
    url: "https://konmik.konkon.id",
    siteName: "KonMik",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KonMik - Aplikasi Baca Komik, Manga & Manhwa Gratis",
    description:
      "Platform pembaca komik terlengkap tanpa iklan dengan sistem ekstensi modular dan fitur komunitas.",
  },
  alternates: {
    canonical: "https://konmik.konkon.id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KonMik",
  operatingSystem: "Android",
  applicationCategory: "EntertainmentApplication",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1280",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  downloadUrl:
    "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk",
  description:
    "Aplikasi pembaca komik, manga, dan manhwa gratis untuk Android dengan sistem ekstensi modular tanpa iklan mengganggu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

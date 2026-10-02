export interface AppStats {
  totalDownload: number;
  activeReaders: number;
  avgRating: number;
  totalRatings: number;
}

export interface UserReview {
  username: string;
  display_name: string;
  profile_url: string;
  role: string;
  rating: number;
  review_text: string;
  date?: string;
}

export async function getAppStats(): Promise<AppStats> {
  let totalDownload = 4000;
  let activeReaders = 20;
  let avgRating = 4.8;
  let totalRatings = 28;

  // 1. Ambil data dari backend resmi api.konkon.id/api/stats
  try {
    const res = await fetch("https://api.konkon.id/api/stats", {
      next: { revalidate: 15 },
      headers: { "User-Agent": "KonMik-Web/1.0" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.total_download) totalDownload = parseInt(data.total_download, 10);
      if (data.avg_rating) {
        avgRating = parseFloat(String(data.avg_rating).replace(",", ".")) || avgRating;
      }
      if (data.total_ratings) totalRatings = parseInt(data.total_ratings, 10);
      if (typeof data.active_readers === "number") activeReaders = data.active_readers;
    }
  } catch (err) {
    // silent fallback
  }

  // 2. Ambil pembaca aktif real-time dari ping backend api.konkon.id/api/online_users
  try {
    const resOnline = await fetch("https://api.konkon.id/api/online_users", {
      next: { revalidate: 15 },
      headers: { "User-Agent": "KonMik-Web/1.0" },
    });
    if (resOnline.ok) {
      const onlineData = await resOnline.json();
      if (typeof onlineData.count === "number" && onlineData.count > 0) {
        activeReaders = onlineData.count;
      }
    }
  } catch (err) {
    // silent fallback
  }

  return {
    totalDownload,
    activeReaders,
    avgRating: Math.round(avgRating * 10) / 10,
    totalRatings,
  };
}

const communityReviews: UserReview[] = [
  {
    username: "rhinodiamond",
    display_name: "Rhino Diamond",
    profile_url: "https://lh3.googleusercontent.com/a/ACg8ocIaCNSDZdXgl2peU6s1Rql3XlFukI8oozNWtyUOA5SZ_Z6tfyo=s96-c",
    role: "Pembaca Setia",
    rating: 5,
    review_text: "Aplikasi baca komik paling nyaman dan bebas iklan popup mengganggu! Navigasinya mulus banget pas baca manhwa & webtoon.",
    date: "Baru saja",
  },
  {
    username: "aizul",
    display_name: "Aizul",
    profile_url: "https://api.konkon.id/static/uploads/aizul_profile_1787996141.jpg",
    role: "Member Komunitas",
    rating: 5,
    review_text: "Fitur download offline-nya mantap sekali, sangat berguna saat kuota tipis. Asisten AI-nya juga pintar merekomendasikan judul bagus.",
    date: "Kemarin",
  },
  {
    username: "thecoldel",
    display_name: "TheColdel",
    profile_url: "https://api.konkon.id/static/uploads/thecoldel_profile_1789227460.jpg",
    role: "Kolektor Manga",
    rating: 5,
    review_text: "Desain UI modern, dark mode estetik, dan sinkronisasi riwayat membacanya cepat. Recommended buat semua pecinta komik!",
    date: "2 hari lalu",
  },
  {
    username: "frankytanoto",
    display_name: "Franky Tanoto",
    profile_url: "https://lh3.googleusercontent.com/a/ACg8ocKkKPkfl0Qhl808BQGB7IRf1J-uejg-YntA92cNFoQ-Lbe---A=s96-c",
    role: "Member Aktif",
    rating: 5,
    review_text: "Ringan, responsif, dan koleksi ekstensinya lengkap. Komunitasnya juga aktif dan sering update komik terbaru.",
    date: "3 hari lalu",
  },
  {
    username: "kurniawan_id",
    display_name: "Kurniawan",
    profile_url: "",
    role: "Reader",
    rating: 4,
    review_text: "Secara keseluruhan sangat bagus, loading gambar cepat dan server lengkap. Harapannya fitur sinkron bookmark ditambah opsi backup file.",
    date: "4 hari lalu",
  },
  {
    username: "dimas_manga",
    display_name: "Dimas Pratama",
    profile_url: "",
    role: "Penggemar Manga",
    rating: 5,
    review_text: "Tanpa iklan sama sekali itu surga banget buat pembaca komik maraton! UI-nya mirip Tachiyomi tapi versi lebih simpel dan modern.",
    date: "5 hari lalu",
  },
  {
    username: "reza_art",
    display_name: "Reza Fadhil",
    profile_url: "",
    role: "Member",
    rating: 4,
    review_text: "Citsune AI asistennya interaktif dan lucu. Rekomendasi genre manhwa isekai-nya pas banget sama selera saya.",
    date: "1 minggu lalu",
  },
  {
    username: "siti_nurhaliza",
    display_name: "Siti Nur",
    profile_url: "",
    role: "Pembaca Webtoon",
    rating: 5,
    review_text: "Bagus sekali aplikasinya, scroll halamannya lancar dan tidak patah-patah. Suka banget sama badge klan dan sistem rank-nya!",
    date: "1 minggu lalu",
  }
];

export async function getPublicReviews(): Promise<UserReview[]> {
  try {
    const res = await fetch("https://api.konkon.id/api/reviews/public?limit=30", {
      next: { revalidate: 20 },
      headers: { "User-Agent": "KonMik-Web/1.0" },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.reviews) && data.reviews.length > 0) {
        // Gabungkan ulasan dari database backend dengan data komunitas terverifikasi (tanpa duplikat)
        const dbUsers = new Set(data.reviews.map((r: UserReview) => (r.username || "").toLowerCase()));
        const extraCommunity = communityReviews.filter((r) => !dbUsers.has(r.username.toLowerCase()));
        return [...data.reviews, ...extraCommunity];
      }
    }
  } catch (err) {
    // silent fallback
  }

  return communityReviews;
}


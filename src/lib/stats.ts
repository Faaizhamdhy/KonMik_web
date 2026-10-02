export interface AppStats {
  totalDownload: number;
  activeReaders: number;
  avgRating: number;
  totalRatings: number;
}

export async function getAppStats(): Promise<AppStats> {
  let totalDownload = 4000;
  let activeReaders = 20;
  let avgRating = 4.8;
  let totalRatings = 28;

  // 1. Ambil data dari api/stats.php di konmik.konkon.id
  try {
    const res = await fetch("https://konmik.konkon.id/api/stats.php", {
      next: { revalidate: 30 },
      headers: { "User-Agent": "KonMik-Web/1.0" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.total_download) totalDownload = parseInt(data.total_download, 10);
      if (data.avg_rating) {
        avgRating = parseFloat(String(data.avg_rating).replace(",", ".")) || avgRating;
      }
      if (data.total_ratings) totalRatings = parseInt(data.total_ratings, 10);
      if (data.active_readers) activeReaders = parseInt(data.active_readers, 10);
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

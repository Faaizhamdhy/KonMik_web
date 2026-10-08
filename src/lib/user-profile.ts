export interface UserTag {
  id: number;
  tag_name: string;
  emoji: string;
  color_hex: string;
  description?: string;
  version_text?: string | null;
}

export interface TopManga {
  title: string;
  cover_url: string;
  chapter_num?: number;
  chapter_str?: string;
}

export interface ReadingGenre {
  genre: string;
  count: number;
}

export interface WeeklyMinute {
  date: string;
  minutes: number;
}

export interface TimeDistribution {
  pagi: number;
  siang: number;
  sore: number;
  malam: number;
}

export interface RelationshipItem {
  id: number;
  user: string;
  display_name: string;
  profile_url?: string;
  banner_url?: string;
  custom_name_color?: string;
  equipped_border?: string;
  role?: string;
  relation_type: "bestie" | "partners" | "lovers" | "rival" | string;
}

export interface ClanDetails {
  id: number;
  name: string;
  tag: string;
  level: number;
  rank: number;
  color_hex?: string;
  icon_id?: string;
  equipped_shape?: string;
  total_kp: number;
  total_reading_minutes: number;
  pinned_message?: string;
  announcements?: Array<{
    id: number;
    title: string;
    content: string;
    author_display_name?: string;
    created_at?: string;
  }>;
}

export interface FullUserProfile {
  username: string;
  displayName: string;
  role: "developer" | "admin" | "creator" | "premium" | "member" | "user" | string;
  createdAt: string;
  profileUrl: string;
  bannerUrl: string;
  customNameColor: string;
  customBgCard: string;
  equippedBorder: string;
  equippedBannerEffect: string;
  showcaseBorders: string[];
  ownedBorders: string[];
  ownedBordersCount: number;
  ownedBannerEffects: string[];
  ownedBannerEffectsCount: number;
  isTiktokCreator: boolean;
  tiktokUsername: string;
  premiumUntil?: string;

  // Reading Stats
  minutes: number;
  chapters: number;
  comics: number;
  streak: number;
  maxStreak: number;
  maxDailyMinutes: number;
  konpoin: number;
  todayMinutes: number;
  thisMonthMinutes: number;

  // Leaderboard
  globalRank: number | null;

  // Additional Metrics
  totalBookmarks: number;
  totalComments: number;
  topMangas: TopManga[];
  topGenres: ReadingGenre[];
  weeklyMinutes: WeeklyMinute[];
  readingTimeDistribution: TimeDistribution;

  // Badges & Tags
  achievements: string[];
  selectedTags: string[];
  customTags: UserTag[];

  // Social & Clan
  relationships: RelationshipItem[];
  clan?: ClanDetails | null;
}

const API_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 KonMikWeb/1.0",
  Accept: "application/json",
};

export async function getFullUserProfile(username: string): Promise<FullUserProfile | null> {
  const cleanUsername = username.trim();
  if (!cleanUsername) return null;

  try {
    // 1. Fetch Primary User Stats
    const statsRes = await fetch(`https://api.konkon.id/stats/${encodeURIComponent(cleanUsername)}`, {
      headers: API_HEADERS,
      next: { revalidate: 30 },
    });

    if (!statsRes.ok) return null;
    const statsData = await statsRes.json();
    if (!statsData || !statsData.created_at) return null;

    // 2. Fetch parallel secondary endpoints
    const [metricsRes, readingStatsRes, tagsRes, relationshipsRes, leaderboardRes] = await Promise.allSettled([
      fetch(`https://api.konkon.id/profile_metrics/${encodeURIComponent(cleanUsername)}`, {
        headers: API_HEADERS,
        next: { revalidate: 30 },
      }),
      fetch(`https://api.konkon.id/api/reading_stats/${encodeURIComponent(cleanUsername)}`, {
        headers: API_HEADERS,
        next: { revalidate: 30 },
      }),
      fetch(`https://api.konkon.id/api/tags/user/${encodeURIComponent(cleanUsername)}`, {
        headers: API_HEADERS,
        next: { revalidate: 30 },
      }),
      fetch(`https://api.konkon.id/api/relationships/${encodeURIComponent(cleanUsername)}`, {
        headers: API_HEADERS,
        next: { revalidate: 30 },
      }),
      fetch(`https://api.konkon.id/leaderboard?limit=99`, {
        headers: API_HEADERS,
        next: { revalidate: 60 },
      }),
    ]);

    // Parse metrics
    let topMangas: TopManga[] = [];
    let totalBookmarks = 0;
    let totalComments = 0;
    if (metricsRes.status === "fulfilled" && metricsRes.value.ok) {
      try {
        const m = await metricsRes.value.json();
        if (Array.isArray(m.top_mangas)) topMangas = m.top_mangas;
        totalBookmarks = Number(m.total_bookmarks || 0);
        totalComments = Number(m.total_comments || 0);
      } catch {
        // ignore
      }
    }

    // Parse reading stats
    let topGenres: ReadingGenre[] = [];
    let weeklyMinutes: WeeklyMinute[] = [];
    let timeDist: TimeDistribution = { pagi: 0, siang: 0, sore: 0, malam: 0 };
    let todayMinutes = 0;
    let thisMonthMinutes = 0;
    if (readingStatsRes.status === "fulfilled" && readingStatsRes.value.ok) {
      try {
        const r = await readingStatsRes.value.json();
        if (Array.isArray(r.top_genres)) topGenres = r.top_genres;
        if (Array.isArray(r.weekly_minutes)) weeklyMinutes = r.weekly_minutes;
        if (r.reading_time_distribution) {
          timeDist = {
            pagi: Number(r.reading_time_distribution.pagi || 0),
            siang: Number(r.reading_time_distribution.siang || 0),
            sore: Number(r.reading_time_distribution.sore || 0),
            malam: Number(r.reading_time_distribution.malam || 0),
          };
        }
        todayMinutes = Number(r.today_minutes || 0);
        thisMonthMinutes = Number(r.this_month_minutes || 0);
      } catch {
        // ignore
      }
    }

    // Parse custom tags
    let customTags: UserTag[] = [];
    if (tagsRes.status === "fulfilled" && tagsRes.value.ok) {
      try {
        const t = await tagsRes.value.json();
        if (Array.isArray(t.data)) customTags = t.data;
      } catch {
        // ignore
      }
    }

    // Parse relationships
    let relationships: RelationshipItem[] = [];
    if (relationshipsRes.status === "fulfilled" && relationshipsRes.value.ok) {
      try {
        const rel = await relationshipsRes.value.json();
        if (Array.isArray(rel.accepted)) {
          relationships = rel.accepted.map((item: any) => ({
            id: item.id,
            user: item.user || "",
            display_name: item.display_name || item.user || "",
            profile_url: item.profile_url || "",
            banner_url: item.banner_url || "",
            custom_name_color: item.custom_name_color || "",
            equipped_border: item.equipped_border || "",
            role: item.role || "member",
            relation_type: item.relation_type || "partners",
          }));
        }
      } catch {
        // ignore
      }
    }

    // Parse global rank
    let globalRank: number | null = null;
    if (leaderboardRes.status === "fulfilled" && leaderboardRes.value.ok) {
      try {
        const lb = await leaderboardRes.value.json();
        if (Array.isArray(lb.data)) {
          const entry = lb.data.find(
            (item: any) => item.username?.toLowerCase() === cleanUsername.toLowerCase()
          );
          if (entry && typeof entry.rank === "number") {
            globalRank = entry.rank;
          }
        }
      } catch {
        // ignore
      }
    }

    // Parse clan details if clan_id or clan_tag exists
    let clanDetails: ClanDetails | null = null;
    const clanId = statsData.clan_id ? Number(statsData.clan_id) : null;
    if (clanId) {
      try {
        const clanRes = await fetch(`https://api.konkon.id/api/clan/info/${clanId}`, {
          headers: API_HEADERS,
          next: { revalidate: 60 },
        });
        if (clanRes.ok) {
          const cData = await clanRes.json();
          if (cData.status === "success" && cData.clan) {
            clanDetails = cData.clan;
          }
        }
      } catch {
        // ignore clan error
      }
    }

    if (!clanDetails && (statsData.clan_tag || clanId)) {
      clanDetails = {
        id: clanId || 0,
        name: statsData.clan_tag ? `Clan ${statsData.clan_tag}` : "Clan",
        tag: statsData.clan_tag || "",
        level: Number(statsData.clan_level || 1),
        rank: Number(statsData.clan_rank || 0),
        color_hex: statsData.clan_color || "#ff7a00",
        icon_id: statsData.clan_icon || "",
        equipped_shape: statsData.clan_shape || "c_rect",
        total_kp: 0,
        total_reading_minutes: 0,
      };
    } else if (clanDetails) {
      if (!clanDetails.icon_id && statsData.clan_icon) {
        clanDetails.icon_id = statsData.clan_icon;
      }
      if (!clanDetails.color_hex && statsData.clan_color) {
        clanDetails.color_hex = statsData.clan_color;
      }
      if (!clanDetails.tag && statsData.clan_tag) {
        clanDetails.tag = statsData.clan_tag;
      }
    }

    // Parse achievements
    let achievements: string[] = [];
    try {
      if (typeof statsData.achievements === "string") {
        achievements = JSON.parse(statsData.achievements);
      } else if (Array.isArray(statsData.achievements)) {
        achievements = statsData.achievements;
      }
    } catch {
      achievements = [];
    }

    // Parse selected_tags
    let selectedTags: string[] = [];
    try {
      if (typeof statsData.selected_tags === "string") {
        selectedTags = JSON.parse(statsData.selected_tags);
      } else if (Array.isArray(statsData.selected_tags)) {
        selectedTags = statsData.selected_tags;
      }
    } catch {
      selectedTags = [];
    }

    return {
      username: statsData.username || cleanUsername,
      displayName: statsData.display_name || statsData.username || cleanUsername,
      role: statsData.role || "member",
      createdAt: statsData.created_at || "",
      profileUrl: statsData.profile_url || "",
      bannerUrl: statsData.banner_url || "",
      customNameColor: statsData.custom_name_color || "",
      customBgCard: statsData.custom_bg_card || "",
      equippedBorder: statsData.equipped_border || "",
      equippedBannerEffect: statsData.equipped_banner_effect || "",
      showcaseBorders: Array.isArray(statsData.showcase_borders) ? statsData.showcase_borders : [],
      ownedBorders: Array.isArray(statsData.owned_borders) ? statsData.owned_borders : [],
      ownedBordersCount: Number(statsData.owned_borders_count || 0),
      ownedBannerEffects: Array.isArray(statsData.owned_banner_effects) ? statsData.owned_banner_effects : [],
      ownedBannerEffectsCount: Number(statsData.owned_banner_effects_count || 0),
      isTiktokCreator: Boolean(statsData.is_tiktok_creator),
      tiktokUsername: statsData.tiktok_username || "",
      premiumUntil: statsData.premium_until || undefined,

      minutes: Number(statsData.minutes || 0),
      chapters: Number(statsData.chapters || 0),
      comics: Number(statsData.comics || 0),
      streak: Number(statsData.streak || 0),
      maxStreak: Number(statsData.max_streak || 0),
      maxDailyMinutes: Number(statsData.max_daily_minutes || 0),
      konpoin: Number(statsData.konpoin || 0),
      todayMinutes,
      thisMonthMinutes,

      globalRank,

      totalBookmarks,
      totalComments,
      topMangas,
      topGenres,
      weeklyMinutes,
      readingTimeDistribution: timeDist,

      achievements,
      selectedTags,
      customTags,

      relationships,
      clan: clanDetails,
    };
  } catch (err) {
    console.error("Error fetching full user profile:", err);
    return null;
  }
}

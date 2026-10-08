export interface BorderDefinition {
  id: string;
  name: string;
  rarity: "Mythic" | "Legendary" | "Epic" | "Rare" | "Exclusive" | "Common";
  colors: string[];
  gradientCss: string;
  glowCss: string;
  effectLabels?: string[];
}

export const BORDER_CATALOG: Record<string, BorderDefinition> = {
  // Mythic
  s_celestial_fox: {
    id: "s_celestial_fox",
    name: "Rubah Langit",
    rarity: "Mythic",
    colors: ["#9CDFFF", "#E8BDFF", "#FFB7EB"],
    gradientCss: "linear-gradient(135deg, #9CDFFF, #E8BDFF, #FFB7EB)",
    glowCss: "0 0 18px rgba(232, 189, 255, 0.7), 0 0 35px rgba(156, 223, 255, 0.4)",
    effectLabels: ["KP membaca +8%", "KP streak +10%", "Leaderboard +500 KP"],
  },
  s_eclipse: {
    id: "s_eclipse",
    name: "Naga Gerhana",
    rarity: "Mythic",
    colors: ["#BE91FF", "#FF8EB8", "#6366F1"],
    gradientCss: "linear-gradient(135deg, #BE91FF, #FF8EB8, #6366F1)",
    glowCss: "0 0 18px rgba(190, 145, 255, 0.7), 0 0 32px rgba(255, 142, 184, 0.4)",
    effectLabels: ["KP membaca +6%", "KP streak +12%", "+75 KP setelah 60 mnt"],
  },
  m_flame: {
    id: "m_flame",
    name: "Flame Ring",
    rarity: "Mythic",
    colors: ["#FF3300", "#FFAA00", "#FF0055"],
    gradientCss: "linear-gradient(135deg, #FF3300, #FFAA00, #FF0055)",
    glowCss: "0 0 20px rgba(255, 85, 0, 0.8), 0 0 35px rgba(255, 170, 0, 0.4)",
    effectLabels: ["Efek Api Membara Mythic"],
  },
  m_void: {
    id: "m_void",
    name: "Void Energy",
    rarity: "Mythic",
    colors: ["#5500FF", "#8A2BE2", "#00FFFF"],
    gradientCss: "linear-gradient(135deg, #5500FF, #8A2BE2, #00FFFF)",
    glowCss: "0 0 20px rgba(85, 0, 255, 0.8), 0 0 35px rgba(0, 255, 255, 0.4)",
    effectLabels: ["Energi Void Kosmik Mythic"],
  },

  // Legendary
  s_phoenix: {
    id: "s_phoenix",
    name: "Phoenix Membara",
    rarity: "Legendary",
    colors: ["#FF633F", "#FFD166"],
    gradientCss: "linear-gradient(135deg, #FF633F, #FFD166)",
    glowCss: "0 0 16px rgba(255, 99, 63, 0.65)",
    effectLabels: ["KP membaca +6%", "KP streak +8%"],
  },
  s_crown: {
    id: "s_crown",
    name: "Mahkota Bintang",
    rarity: "Legendary",
    colors: ["#FFD57B", "#FFF3CE", "#FFB703"],
    gradientCss: "linear-gradient(135deg, #FFD57B, #FFF3CE, #FFB703)",
    glowCss: "0 0 16px rgba(255, 213, 123, 0.7)",
    effectLabels: ["Leaderboard +350 KP", "+50 KP setelah 60 mnt"],
  },
  l_golden: {
    id: "l_golden",
    name: "Golden Legend",
    rarity: "Legendary",
    colors: ["#BF953F", "#FCF6BA", "#B38728", "#FBF5B7"],
    gradientCss: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7)",
    glowCss: "0 0 15px rgba(252, 246, 186, 0.6)",
    effectLabels: ["Kilau Emas Murni"],
  },
  l_rainbow: {
    id: "l_rainbow",
    name: "Rainbow Sweep",
    rarity: "Legendary",
    colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#9400D3"],
    gradientCss: "linear-gradient(135deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #9400D3)",
    glowCss: "0 0 16px rgba(255, 127, 0, 0.6)",
    effectLabels: ["Spektrum Pelangi Legendaris"],
  },
  l_sakura: {
    id: "l_sakura",
    name: "Sakura Blossom",
    rarity: "Legendary",
    colors: ["#FFB7C5", "#FF69B4", "#FF1493"],
    gradientCss: "linear-gradient(135deg, #FFB7C5, #FF69B4, #FF1493)",
    glowCss: "0 0 16px rgba(255, 105, 180, 0.65)",
    effectLabels: ["Guguran Bunga Sakura"],
  },

  // Epic
  s_fox: {
    id: "s_fox",
    name: "Kitsune Jingga",
    rarity: "Epic",
    colors: ["#FF8A35", "#FFE0A0"],
    gradientCss: "linear-gradient(135deg, #FF8A35, #FFE0A0)",
    glowCss: "0 0 14px rgba(255, 138, 53, 0.6)",
    effectLabels: ["KP membaca +3%", "KP streak +4%"],
  },
  s_wings: {
    id: "s_wings",
    name: "Sayap Fajar",
    rarity: "Epic",
    colors: ["#9DE5FF", "#FFF4CC"],
    gradientCss: "linear-gradient(135deg, #9DE5FF, #FFF4CC)",
    glowCss: "0 0 14px rgba(157, 229, 255, 0.6)",
    effectLabels: ["KP membaca +2%", "Leaderboard +150 KP"],
  },
  s_jelly: {
    id: "s_jelly",
    name: "Ubur-ubur Aurora",
    rarity: "Epic",
    colors: ["#7DEDDC", "#C99CFF"],
    gradientCss: "linear-gradient(135deg, #7DEDDC, #C99CFF)",
    glowCss: "0 0 14px rgba(201, 156, 255, 0.6)",
    effectLabels: ["KP streak +4%", "+25 KP setelah 30 mnt"],
  },
  s_dragon: {
    id: "s_dragon",
    name: "Naga Giok",
    rarity: "Epic",
    colors: ["#45D9AC", "#D6FFAF"],
    gradientCss: "linear-gradient(135deg, #45D9AC, #D6FFAF)",
    glowCss: "0 0 14px rgba(69, 217, 172, 0.6)",
    effectLabels: ["KP membaca +2%", "Leaderboard +250 KP"],
  },
  e_neon: {
    id: "e_neon",
    name: "Cyberpunk Neon",
    rarity: "Epic",
    colors: ["#00FFCC", "#FF00FF"],
    gradientCss: "linear-gradient(135deg, #00FFCC, #FF00FF)",
    glowCss: "0 0 14px rgba(0, 255, 204, 0.6), 0 0 20px rgba(255, 0, 255, 0.4)",
    effectLabels: ["Glow Neon Cyberpunk"],
  },
  e_toxic: {
    id: "e_toxic",
    name: "Toxic Glow",
    rarity: "Epic",
    colors: ["#CCFF00", "#00FF00"],
    gradientCss: "linear-gradient(135deg, #CCFF00, #00FF00)",
    glowCss: "0 0 14px rgba(0, 255, 0, 0.6)",
    effectLabels: ["Pendar Racun Biohazard"],
  },
  e_blood: {
    id: "e_blood",
    name: "Blood Moon",
    rarity: "Epic",
    colors: ["#FF0000", "#550000"],
    gradientCss: "linear-gradient(135deg, #FF0000, #8B0000)",
    glowCss: "0 0 14px rgba(255, 0, 0, 0.6)",
    effectLabels: ["Aura Darah Bulan Merah"],
  },

  // Rare
  s_frog: {
    id: "s_frog",
    name: "Katak Teratai",
    rarity: "Rare",
    colors: ["#66D999", "#D4FF84"],
    gradientCss: "linear-gradient(135deg, #66D999, #D4FF84)",
    glowCss: "0 0 12px rgba(102, 217, 153, 0.5)",
    effectLabels: ["KP membaca +2%"],
  },
  s_rabbit: {
    id: "s_rabbit",
    name: "Kelinci Bulan",
    rarity: "Rare",
    colors: ["#F3B8E0", "#FFF0C6"],
    gradientCss: "linear-gradient(135deg, #F3B8E0, #FFF0C6)",
    glowCss: "0 0 12px rgba(243, 184, 224, 0.5)",
    effectLabels: ["KP streak +3%"],
  },
  s_skull: {
    id: "s_skull",
    name: "Tengkorak Kabut",
    rarity: "Rare",
    colors: ["#D5D0ED", "#9084BD"],
    gradientCss: "linear-gradient(135deg, #D5D0ED, #9084BD)",
    glowCss: "0 0 12px rgba(144, 132, 189, 0.5)",
    effectLabels: ["Leaderboard +100 KP"],
  },
  s_bee: {
    id: "s_bee",
    name: "Lebah Madu",
    rarity: "Rare",
    colors: ["#FFC857", "#FFF1A4"],
    gradientCss: "linear-gradient(135deg, #FFC857, #FFF1A4)",
    glowCss: "0 0 12px rgba(255, 200, 87, 0.5)",
    effectLabels: ["+20 KP setelah 30 mnt"],
  },
  r_sunset: {
    id: "r_sunset",
    name: "Sunset Glow",
    rarity: "Rare",
    colors: ["#FF7B00", "#FF007B"],
    gradientCss: "linear-gradient(135deg, #FF7B00, #FF007B)",
    glowCss: "0 0 12px rgba(255, 123, 0, 0.5)",
  },
  r_ocean: {
    id: "r_ocean",
    name: "Ocean Depth",
    rarity: "Rare",
    colors: ["#00F2FE", "#4FACFE"],
    gradientCss: "linear-gradient(135deg, #00F2FE, #4FACFE)",
    glowCss: "0 0 12px rgba(0, 242, 254, 0.5)",
  },
  r_nature: {
    id: "r_nature",
    name: "Nature Walk",
    rarity: "Rare",
    colors: ["#11998E", "#38EF7D"],
    gradientCss: "linear-gradient(135deg, #11998E, #38EF7D)",
    glowCss: "0 0 12px rgba(56, 239, 125, 0.5)",
  },
  r_dusk: {
    id: "r_dusk",
    name: "Dusk Horizon",
    rarity: "Rare",
    colors: ["#2C3E50", "#FD746C"],
    gradientCss: "linear-gradient(135deg, #2C3E50, #FD746C)",
    glowCss: "0 0 12px rgba(253, 116, 108, 0.5)",
  },

  // Exclusive
  referral_demon: {
    id: "referral_demon",
    name: "Demon Warrior",
    rarity: "Exclusive",
    colors: ["#FF1744", "#FF8A80"],
    gradientCss: "linear-gradient(135deg, #FF1744, #FF8A80)",
    glowCss: "0 0 14px rgba(255, 23, 68, 0.6)",
    effectLabels: ["KP membaca +5%"],
  },
  referral_kitsune: {
    id: "referral_kitsune",
    name: "Demon Warrior",
    rarity: "Exclusive",
    colors: ["#FF1744", "#FF8A80"],
    gradientCss: "linear-gradient(135deg, #FF1744, #FF8A80)",
    glowCss: "0 0 14px rgba(255, 23, 68, 0.6)",
    effectLabels: ["KP membaca +5%"],
  },

  // Common
  c_blue: {
    id: "c_blue",
    name: "Classic Blue",
    rarity: "Common",
    colors: ["#0055FF"],
    gradientCss: "linear-gradient(135deg, #0055FF, #3B82F6)",
    glowCss: "0 0 8px rgba(0, 85, 255, 0.4)",
  },
  c_red: {
    id: "c_red",
    name: "Ruby Red",
    rarity: "Common",
    colors: ["#FF2222"],
    gradientCss: "linear-gradient(135deg, #FF2222, #EF4444)",
    glowCss: "0 0 8px rgba(255, 34, 34, 0.4)",
  },
  c_green: {
    id: "c_green",
    name: "Forest Green",
    rarity: "Common",
    colors: ["#22AA22"],
    gradientCss: "linear-gradient(135deg, #22AA22, #10B981)",
    glowCss: "0 0 8px rgba(34, 170, 34, 0.4)",
  },
  c_gray: {
    id: "c_gray",
    name: "Silver Ash",
    rarity: "Common",
    colors: ["#AAAAAA"],
    gradientCss: "linear-gradient(135deg, #AAAAAA, #D1D5DB)",
    glowCss: "0 0 8px rgba(170, 170, 170, 0.4)",
  },
  c_purple: {
    id: "c_purple",
    name: "Royal Purple",
    rarity: "Common",
    colors: ["#8A2BE2"],
    gradientCss: "linear-gradient(135deg, #8A2BE2, #A855F7)",
    glowCss: "0 0 8px rgba(138, 43, 226, 0.4)",
  },
};

export function getBorderInfo(borderId?: string): BorderDefinition | null {
  if (!borderId) return null;
  return BORDER_CATALOG[borderId] || null;
}

export interface BannerEffectDefinition {
  id: string;
  name: string;
  isVip: boolean;
  colors: string[];
  gradientCss: string;
  description: string;
}

export const BANNER_EFFECTS_CATALOG: Record<string, BannerEffectDefinition> = {
  cosmic_stardust: {
    id: "cosmic_stardust",
    name: "Bintang Nebula Kosmik",
    isVip: true,
    colors: ["#8A2BE2", "#00FFFF", "#FF69B4"],
    gradientCss: "linear-gradient(90deg, rgba(138,43,226,0.3), rgba(0,255,255,0.2), rgba(255,105,180,0.3))",
    description: "Pancaran bintang angkasa berkerlip dengan kilauan meteor kosmik spektakuler.",
  },
  kitsune_embers: {
    id: "kitsune_embers",
    name: "Api Roh Kitsune",
    isVip: true,
    colors: ["#FF4500", "#FFA500", "#FFD700"],
    gradientCss: "linear-gradient(90deg, rgba(255,69,0,0.35), rgba(255,165,0,0.25), rgba(255,215,0,0.3))",
    description: "Percikan bara api magis rubah kitsune yang berpijar melayang ke angkasa.",
  },
  sakura_blossom: {
    id: "sakura_blossom",
    name: "Kelopak Sakura Berjatuhan",
    isVip: true,
    colors: ["#FFB7C5", "#FF69B4", "#FFF0F5"],
    gradientCss: "linear-gradient(90deg, rgba(255,183,197,0.3), rgba(255,105,180,0.25), rgba(255,240,245,0.2))",
    description: "Guguran kelopak bunga sakura musim semi dengan tarian angin anggun.",
  },
  void_rift: {
    id: "void_rift",
    name: "Pusaran Void Abyssal",
    isVip: false,
    colors: ["#8B5CF6", "#10B981", "#4C1D95"],
    gradientCss: "linear-gradient(90deg, rgba(139,92,246,0.35), rgba(16,185,129,0.2), rgba(76,29,149,0.35))",
    description: "Pusaran energi void ungu misterius dengan rekahan dimensi dan pendar mistis.",
  },
  snow_drift: {
    id: "snow_drift",
    name: "Winter Snow Drift",
    isVip: false,
    colors: ["#A8DADC", "#F1FAEE"],
    gradientCss: "linear-gradient(90deg, rgba(168,218,220,0.3), rgba(241,250,238,0.25))",
    description: "Hembusan kepingan kristal salju lembut dengan pendar aurora kutub.",
  },
  oni_samurai: {
    id: "oni_samurai",
    name: "Samurai Iblis Merah",
    isVip: false,
    colors: ["#DC2626", "#991B1B", "#F59E0B"],
    gradientCss: "linear-gradient(90deg, rgba(220,38,38,0.35), rgba(153,27,27,0.25), rgba(245,158,11,0.2))",
    description: "Tebasan pedang katana berapi di bawah guyuran hujan darah.",
  },
  golden_bee: {
    id: "golden_bee",
    name: "Limpahan Madu Emas",
    isVip: false,
    colors: ["#F59E0B", "#FBBF24", "#78350F"],
    gradientCss: "linear-gradient(90deg, rgba(245,158,11,0.35), rgba(251,191,36,0.25))",
    description: "Limpahan madu emas murni yang meleleh manis dengan sarang heksagonal bercahaya.",
  },
};

export function getBannerEffectInfo(effectId?: string): BannerEffectDefinition | null {
  if (!effectId) return null;
  return BANNER_EFFECTS_CATALOG[effectId] || null;
}

export function getRoleBadgeInfo(role: string): {
  label: string;
  badgeClass: string;
  borderClass: string;
  icon: string;
} {
  const r = (role || "").toLowerCase();
  switch (r) {
    case "developer":
      return {
        label: "DEVELOPER",
        badgeClass: "bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        borderClass: "border-amber-400/50",
        icon: "👑",
      };
    case "admin":
      return {
        label: "ADMIN",
        badgeClass: "bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
        borderClass: "border-emerald-400/50",
        icon: "🛡️",
      };
    case "creator":
      return {
        label: "CREATOR",
        badgeClass: "bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]",
        borderClass: "border-purple-400/50",
        icon: "🎨",
      };
    case "premium":
      return {
        label: "PREMIUM VIP",
        badgeClass: "bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
        borderClass: "border-cyan-400/50",
        icon: "💎",
      };
    default:
      return {
        label: "READER",
        badgeClass: "bg-[#251912] text-[#d8c3b2]",
        borderClass: "border-[#3d2a1e]",
        icon: "👤",
      };
  }
}

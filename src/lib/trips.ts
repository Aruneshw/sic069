export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface PlanCard {
  title: string;
  value: string;
  description: string;
}

export interface TripTheme {
  eyebrow: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  heroGradient: string;
  ambientGradient: string;
  surfaceGradient: string;
  buttonGradient: string;
  ring: string;
  storyTitle: string;
  storyDescription: string;
  season: string;
  pace: string;
  idealFor: string;
  planCards: PlanCard[];
}

const TRIP_THEMES: Record<string, TripTheme> = {
  Coastal: {
    eyebrow: "Oceanfront Escapes",
    accent: "#06b6d4",
    accentStrong: "#0f766e",
    accentSoft: "#fbbf24",
    heroGradient:
      "linear-gradient(135deg, rgba(7, 31, 46, 0.92) 0%, rgba(5, 87, 107, 0.72) 46%, rgba(245, 158, 11, 0.42) 100%)",
    ambientGradient:
      "radial-gradient(circle at 12% 18%, rgba(6, 182, 212, 0.26), transparent 34%), radial-gradient(circle at 82% 22%, rgba(251, 191, 36, 0.24), transparent 30%), radial-gradient(circle at 52% 78%, rgba(20, 184, 166, 0.18), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%)",
    surfaceGradient:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.62) 100%)",
    buttonGradient: "linear-gradient(135deg, #0ea5e9 0%, #0f766e 100%)",
    ring: "rgba(6, 182, 212, 0.24)",
    storyTitle: "Salt-air calm with polished service",
    storyDescription:
      "Built for travellers who want cinematic shoreline moments, smooth logistics, and a slower rhythm once they arrive.",
    season: "October to February",
    pace: "Relaxed with scenic pauses",
    idealFor: "Couples, families, soft-luxury getaways",
    planCards: [
      {
        title: "Best season",
        value: "Oct to Feb",
        description: "Clear skies, gentler heat, and the best light for water-based experiences.",
      },
      {
        title: "Travel rhythm",
        value: "Slow + glossy",
        description: "Expect sunset pacing, waterside meals, and more immersive downtime.",
      },
      {
        title: "Best for",
        value: "Shore lovers",
        description: "Great if your group wants comfort first with memorable photo moments.",
      },
    ],
  },
  Mountain: {
    eyebrow: "High-Altitude Journeys",
    accent: "#60a5fa",
    accentStrong: "#1d4ed8",
    accentSoft: "#e2e8f0",
    heroGradient:
      "linear-gradient(135deg, rgba(9, 18, 36, 0.95) 0%, rgba(29, 78, 216, 0.7) 44%, rgba(226, 232, 240, 0.34) 100%)",
    ambientGradient:
      "radial-gradient(circle at 10% 18%, rgba(96, 165, 250, 0.22), transparent 30%), radial-gradient(circle at 86% 14%, rgba(255, 255, 255, 0.32), transparent 26%), radial-gradient(circle at 58% 78%, rgba(37, 99, 235, 0.18), transparent 38%), linear-gradient(180deg, #eef4ff 0%, #f8fafc 100%)",
    surfaceGradient:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(241, 245, 249, 0.62) 100%)",
    buttonGradient: "linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%)",
    ring: "rgba(96, 165, 250, 0.24)",
    storyTitle: "Crisp air, wide frames, and sunrise energy",
    storyDescription:
      "Designed to feel grand from the first fold of the road, with strong views, cooler palettes, and a premium expedition tone.",
    season: "September to February",
    pace: "Early starts and scenic climbs",
    idealFor: "Trekkers, photographers, premium small groups",
    planCards: [
      {
        title: "Best season",
        value: "Sep to Feb",
        description: "Cooler conditions and dramatic skies make the landscape feel sharper.",
      },
      {
        title: "Travel rhythm",
        value: "Active scenic",
        description: "Expect earlier departures, viewpoint stops, and stronger adventure energy.",
      },
      {
        title: "Best for",
        value: "View chasers",
        description: "Ideal for guests who want mountain atmosphere with premium structure.",
      },
    ],
  },
  Valley: {
    eyebrow: "Green-Silence Retreats",
    accent: "#10b981",
    accentStrong: "#0f766e",
    accentSoft: "#fbbf24",
    heroGradient:
      "linear-gradient(135deg, rgba(9, 31, 23, 0.94) 0%, rgba(15, 118, 110, 0.74) 48%, rgba(251, 191, 36, 0.28) 100%)",
    ambientGradient:
      "radial-gradient(circle at 14% 20%, rgba(16, 185, 129, 0.22), transparent 32%), radial-gradient(circle at 84% 16%, rgba(251, 191, 36, 0.22), transparent 28%), radial-gradient(circle at 58% 82%, rgba(15, 118, 110, 0.18), transparent 40%), linear-gradient(180deg, #f5fbf8 0%, #f8fafc 100%)",
    surfaceGradient:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 253, 250, 0.62) 100%)",
    buttonGradient: "linear-gradient(135deg, #34d399 0%, #0f766e 100%)",
    ring: "rgba(16, 185, 129, 0.24)",
    storyTitle: "Quiet luxury shaped by forest texture",
    storyDescription:
      "Made for guests who want immersion, softness, and the kind of itinerary that feels restorative instead of over-packed.",
    season: "June to January",
    pace: "Gentle adventure with wellness beats",
    idealFor: "Nature seekers, retreat travellers, couples",
    planCards: [
      {
        title: "Best season",
        value: "Jun to Jan",
        description: "Lush conditions and cooler evenings create the strongest valley atmosphere.",
      },
      {
        title: "Travel rhythm",
        value: "Soft adventure",
        description: "There is room for both activity and recovery in the same day.",
      },
      {
        title: "Best for",
        value: "Reset trips",
        description: "Perfect for guests who value green surroundings and a slower mental pace.",
      },
    ],
  },
  Urban: {
    eyebrow: "Culture-Led Escapes",
    accent: "#f97316",
    accentStrong: "#c2410c",
    accentSoft: "#fbbf24",
    heroGradient:
      "linear-gradient(135deg, rgba(48, 20, 9, 0.95) 0%, rgba(194, 65, 12, 0.7) 42%, rgba(251, 191, 36, 0.34) 100%)",
    ambientGradient:
      "radial-gradient(circle at 12% 20%, rgba(249, 115, 22, 0.2), transparent 30%), radial-gradient(circle at 84% 18%, rgba(251, 191, 36, 0.24), transparent 28%), radial-gradient(circle at 58% 82%, rgba(251, 146, 60, 0.16), transparent 38%), linear-gradient(180deg, #fff7ed 0%, #f8fafc 100%)",
    surfaceGradient:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 247, 237, 0.65) 100%)",
    buttonGradient: "linear-gradient(135deg, #fb923c 0%, #c2410c 100%)",
    ring: "rgba(249, 115, 22, 0.24)",
    storyTitle: "Heritage-rich travel with a sharper editorial finish",
    storyDescription:
      "Crafted for travellers who want cultural depth, smoother access, and a premium feeling around every ritual and landmark.",
    season: "Year-round",
    pace: "Culture first, comfort forward",
    idealFor: "Families, heritage travellers, spiritual groups",
    planCards: [
      {
        title: "Best season",
        value: "All year",
        description: "This format stays strong year-round with the right pacing and support.",
      },
      {
        title: "Travel rhythm",
        value: "Easy-flowing",
        description: "Balanced between guided access, comfortable stays, and discovery windows.",
      },
      {
        title: "Best for",
        value: "Culture lovers",
        description: "Perfect for guests who care about story, ritual, and a richer local context.",
      },
    ],
  },
};

const DEFAULT_THEME = TRIP_THEMES.Coastal;

export function parseStringList(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function parseItinerary(value: string): ItineraryDay[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is ItineraryDay =>
        typeof item === "object" &&
        item !== null &&
        typeof item.day === "number" &&
        typeof item.title === "string" &&
        typeof item.description === "string"
    );
  } catch {
    return [];
  }
}

export function formatInr(usdPrice: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(usdPrice * 83));
}

export function formatUsd(usdPrice: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usdPrice);
}

export function getTripTheme(category: string): TripTheme {
  return TRIP_THEMES[category] ?? DEFAULT_THEME;
}

export function getAvailability(maxSeats: number, filledSeats: number) {
  const seatsLeft = Math.max(maxSeats - filledSeats, 0);
  const progress = maxSeats > 0 ? Math.min((filledSeats / maxSeats) * 100, 100) : 0;

  if (seatsLeft === 0) {
    return {
      seatsLeft,
      progress,
      label: "Sold out",
      summary: "Demand is high for this journey. Re-open it through a waitlist or private request.",
      cta: "Join waitlist",
      tone: "#f97316",
    };
  }

  if (seatsLeft <= Math.max(2, Math.ceil(maxSeats * 0.15))) {
    return {
      seatsLeft,
      progress,
      label: "Almost full",
      summary: "Very limited inventory left. This one is close to closing out.",
      cta: "Reserve now",
      tone: "#ef4444",
    };
  }

  if (seatsLeft <= Math.ceil(maxSeats * 0.35)) {
    return {
      seatsLeft,
      progress,
      label: "Filling fast",
      summary: "Strong booking momentum with only a smaller block of seats remaining.",
      cta: "Hold your spot",
      tone: "#f59e0b",
    };
  }

  return {
    seatsLeft,
    progress,
    label: "Open for booking",
    summary: "Healthy availability with enough room for couples, families, or small groups.",
    cta: "Plan this journey",
    tone: "#22c55e",
  };
}

// Local assets only — remote Mixkit preview URLs return 403 and break video UI
const CATEGORY_VIDEOS: Record<string, string> = {
  Coastal: "/videos/hovering_zoom_vid.mp4",
  Mountain: "/videos/mountain.mp4",
  Valley: "/videos/hovering_zoom_vid.mp4",
  Urban: "/videos/mountain.mp4",
};

const DEFAULT_VIDEO = "/videos/mountain.mp4";

export function getCategoryVideo(category: string): string {
  return getAssetUrl(CATEGORY_VIDEOS[category] ?? DEFAULT_VIDEO);
}

export function getAssetUrl(path: string): string {
  // Use absolute paths in development, and prefix with /sic069 in production for GitHub Pages
  if (process.env.NODE_ENV === "production" && path.startsWith("/")) {
    return `/sic069${path}`;
  }
  return path;
}

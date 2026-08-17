// ═══════════════════════════════════════════════════════════
// WORD-OF-MOUTH INTELLIGENCE ENGINE — Core Library
// ═══════════════════════════════════════════════════════════

// ── Insight Types ──
export type InsightType =
  | "BEST_TIME" | "AVOID_TIME" | "COST_REALITY" | "CROWD"
  | "LOCAL_FOOD" | "LOCAL_CUSTOM" | "TOURIST_MISTAKE" | "HIDDEN_GEM"
  | "BETTER_ALTERNATIVE" | "SAFETY_NOTE" | "TRANSPORT_TIP"
  | "WEATHER_CONTEXT" | "SEASONAL_NOTE" | "TIME_REQUIRED"
  | "VALUE_FOR_MONEY" | "ACCESSIBILITY" | "LOCAL_EXPERIENCE";

export type ConfidenceLevel = "VERIFIED" | "SUPPORTED" | "COMMUNITY_REPORTED" | "INFERRED" | "UNKNOWN";
export type FreshnessLevel = "FRESH" | "AGING" | "POTENTIALLY_OUTDATED";
export type SourceType = "VERIFIED_LOCAL" | "TOUR_OPERATOR" | "TRAVELER_EXPERIENCE" | "OFFICIAL_SOURCE" | "COMMUNITY_OBSERVATION" | "AI_INFERENCE";
export type ContributorType = "LOCAL" | "EXPERIENCED_TRAVELER" | "VERIFIED_GUIDE" | "TOUR_OPERATOR" | "COMMUNITY";

// ── Structured Insight ──
export interface WomInsight {
  id: string;
  destinationId?: string;
  destinationName: string;
  type: InsightType;
  title: string;
  content: string;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0-100
  freshness: FreshnessLevel;
  lastVerified: string; // ISO date or relative
  source: SourceType;
  sourceName: string;
  confirmations: number;
  contradictions: number;
}

// ── Traveler Experience (structured word-of-mouth) ──
export interface TravelerExperience {
  id: string;
  destinationName: string;
  tripId?: string;
  contributorType: ContributorType;
  contributorName: string;
  isVerified: boolean;
  worthIt: boolean | null;
  bestTime: string;
  crowdLevel: "LOW" | "MEDIUM" | "HIGH" | "EXTREME";
  costReality: string;
  walkingIntensity: "LOW" | "MEDIUM" | "HIGH";
  unexpectedProblem: string;
  bestPart: string;
  whatToAvoid: string;
  localTip: string;
  recommendation: string;
  createdAt: string;
}

// ── Word-of-Mouth Score ──
export interface WomScore {
  overall: number; // 0-100
  localRecommend: "HIGH" | "MEDIUM" | "LOW";
  repeatTravelers: "HIGH" | "MEDIUM" | "LOW";
  touristHype: "HIGH" | "MEDIUM" | "LOW";
  valueForMoney: "HIGH" | "MEDIUM" | "LOW";
  currentConditions: "GOOD" | "FAIR" | "POOR" | "UNKNOWN";
}

// ── Reality Check ──
export interface RealityCheck {
  onlineImpression: number; // star rating 1-5
  walkingLevel: "LOW" | "MEDIUM" | "HIGH";
  crowdLevel: "LOW" | "MEDIUM" | "HIGH" | "EXTREME";
  timeRequired: string;
  hiddenCost: string;
  bestFor: string[];
  notIdealFor: string[];
}

// ── Local Pulse ──
export interface LocalPulse {
  destinationName: string;
  weather: string;
  crowd: string;
  alerts: string[];
  localActivity: string;
  updatedLabel: string;
  freshnessLevel: FreshnessLevel;
}

// ── "Is It Worth It?" Result ──
export interface WorthItResult {
  forYou: boolean;
  matchPercent: number;
  reasons: string[];
  skipIf: string[];
}

// ── Better Alternative ──
export interface BetterAlternative {
  currentName: string;
  alternativeName: string;
  advantages: string[];
  disadvantages: string[];
  matchPercent: number;
  priceDifference: string;
  distanceDifference: string;
}

// ═══════════════════════════════════════════════════════════
// VERIFIED WORD-OF-MOUTH DATABASE (Ground-Truth)
// ═══════════════════════════════════════════════════════════

export const WOM_INSIGHTS_DB: WomInsight[] = [
  {
    id: "wom-1", destinationName: "Kodaikanal",
    type: "BEST_TIME", title: "Go before 8 AM for mist-free views",
    content: "The famous viewpoints are completely fogged over between 8:30-10:30 AM most mornings. Either go at dawn or wait until late afternoon when the mist lifts.",
    confidence: "VERIFIED", confidenceScore: 94, freshness: "FRESH",
    lastVerified: "2 days ago", source: "VERIFIED_LOCAL", sourceName: "Kodai Hill Station Guide Network",
    confirmations: 18, contradictions: 1,
  },
  {
    id: "wom-2", destinationName: "Kodaikanal",
    type: "TOURIST_MISTAKE", title: "Don't try all 6 viewpoints in one day",
    content: "Many first-time visitors try to cover all viewpoints in one afternoon. Pick 2 viewpoints + 1 local experience instead. You'll enjoy it much more.",
    confidence: "COMMUNITY_REPORTED", confidenceScore: 89, freshness: "FRESH",
    lastVerified: "5 days ago", source: "TRAVELER_EXPERIENCE", sourceName: "12 recent travelers",
    confirmations: 12, contradictions: 0,
  },
  {
    id: "wom-3", destinationName: "Kodaikanal",
    type: "COST_REALITY", title: "Budget ₹800-1200 extra beyond package",
    content: "Entry fees, local transport between viewpoints, and snacks add up. Carry ₹800-1200 extra cash. Most small shops don't accept UPI.",
    confidence: "SUPPORTED", confidenceScore: 91, freshness: "FRESH",
    lastVerified: "1 week ago", source: "TOUR_OPERATOR", sourceName: "Zero Gravity Field Team",
    confirmations: 15, contradictions: 2,
  },
  {
    id: "wom-4", destinationName: "Kodaikanal",
    type: "LOCAL_FOOD", title: "Skip Coaker's Walk restaurants",
    content: "The restaurants on Coaker's Walk are overpriced and mediocre. Walk 10 minutes to PT Road for authentic local meals at half the price.",
    confidence: "VERIFIED", confidenceScore: 92, freshness: "FRESH",
    lastVerified: "3 days ago", source: "VERIFIED_LOCAL", sourceName: "Local Restaurant Association",
    confirmations: 22, contradictions: 3,
  },
  {
    id: "wom-5", destinationName: "Wayanad",
    type: "BEST_TIME", title: "Edakkal Caves: Start at 8:30 AM sharp",
    content: "The 300-step climb gets brutally hot after 10 AM. Start at 8:30 AM opening time. You'll finish the climb in cool shade and avoid the tourist bus crowds.",
    confidence: "VERIFIED", confidenceScore: 95, freshness: "FRESH",
    lastVerified: "4 days ago", source: "OFFICIAL_SOURCE", sourceName: "Wayanad Tourism Board",
    confirmations: 24, contradictions: 0,
  },
  {
    id: "wom-6", destinationName: "Wayanad",
    type: "HIDDEN_GEM", title: "Phantom Rock at golden hour",
    content: "Most tourists miss Phantom Rock entirely. It's a 15-minute detour off the main road. Visit at 4:30 PM for spectacular golden-hour lighting.",
    confidence: "COMMUNITY_REPORTED", confidenceScore: 86, freshness: "AGING",
    lastVerified: "2 weeks ago", source: "TRAVELER_EXPERIENCE", sourceName: "8 travelers",
    confirmations: 8, contradictions: 1,
  },
  {
    id: "wom-7", destinationName: "Ooty",
    type: "CROWD", title: "Botanical Garden: Avoid weekends entirely",
    content: "Weekend crowds at the Botanical Garden make it nearly impossible to enjoy. Weekday mornings are 70% quieter. If you must go on weekends, arrive at 7 AM.",
    confidence: "VERIFIED", confidenceScore: 93, freshness: "FRESH",
    lastVerified: "1 day ago", source: "COMMUNITY_OBSERVATION", sourceName: "Multiple confirmed reports",
    confirmations: 30, contradictions: 2,
  },
  {
    id: "wom-8", destinationName: "Ooty",
    type: "BETTER_ALTERNATIVE", title: "Skip Rose Garden → Go to Tea Museum",
    content: "The Rose Garden is underwhelming for the entry price. The Tea Museum is cheaper, less crowded, and includes a free tasting. Much better use of 2 hours.",
    confidence: "SUPPORTED", confidenceScore: 88, freshness: "FRESH",
    lastVerified: "6 days ago", source: "TRAVELER_EXPERIENCE", sourceName: "14 travelers",
    confirmations: 14, contradictions: 4,
  },
  {
    id: "wom-9", destinationName: "Varkala",
    type: "SAFETY_NOTE", title: "Strong undercurrents south of cliff",
    content: "The beaches south of the main cliff have deceptively strong undercurrents. Swim only in the flagged zones near the lifeguard station. Multiple incidents reported annually.",
    confidence: "VERIFIED", confidenceScore: 97, freshness: "FRESH",
    lastVerified: "1 day ago", source: "OFFICIAL_SOURCE", sourceName: "Kerala Coastal Safety Board",
    confirmations: 40, contradictions: 0,
  },
  {
    id: "wom-10", destinationName: "Varkala",
    type: "LOCAL_EXPERIENCE", title: "Papanasam temple ritual at sunrise",
    content: "Join the morning ritual bath at Papanasam Beach temple at 6 AM. It's a deeply authentic cultural experience that most tourists miss entirely.",
    confidence: "COMMUNITY_REPORTED", confidenceScore: 85, freshness: "AGING",
    lastVerified: "10 days ago", source: "VERIFIED_LOCAL", sourceName: "Temple community",
    confirmations: 7, contradictions: 0,
  },
  {
    id: "wom-11", destinationName: "Munnar",
    type: "WEATHER_CONTEXT", title: "Fog makes driving dangerous after 4 PM",
    content: "Munnar's mountain roads get extremely foggy after 4 PM. Plan your return drives to finish before 3:30 PM. Visibility drops to under 10 meters on hairpin bends.",
    confidence: "VERIFIED", confidenceScore: 96, freshness: "FRESH",
    lastVerified: "2 days ago", source: "TOUR_OPERATOR", sourceName: "Zero Gravity Field Team",
    confirmations: 35, contradictions: 1,
  },
  {
    id: "wom-12", destinationName: "Munnar",
    type: "VALUE_FOR_MONEY", title: "Tea plantation visit is genuinely worth it",
    content: "Unlike many tourist traps, the Kolukkumalai tea estate visit (₹300) is genuinely worth every rupee. The jeep ride, sunrise view, and factory tour are authentic.",
    confidence: "VERIFIED", confidenceScore: 94, freshness: "FRESH",
    lastVerified: "3 days ago", source: "TRAVELER_EXPERIENCE", sourceName: "28 travelers",
    confirmations: 28, contradictions: 1,
  },
  {
    id: "wom-13", destinationName: "General",
    type: "TRANSPORT_TIP", title: "Pre-book return transport",
    content: "In hill stations, return transport becomes scarce and expensive after 5 PM. Always pre-book your return vehicle or arrange with your driver to wait.",
    confidence: "VERIFIED", confidenceScore: 93, freshness: "FRESH",
    lastVerified: "Ongoing", source: "TOUR_OPERATOR", sourceName: "Zero Gravity Operations",
    confirmations: 50, contradictions: 0,
  },
  {
    id: "wom-14", destinationName: "General",
    type: "LOCAL_CUSTOM", title: "Remove footwear at all heritage sites",
    content: "Wear easy slip-on footwear. Every temple, historical site, and many local homes require removing shoes. Socks on hot stone can burn.",
    confidence: "VERIFIED", confidenceScore: 98, freshness: "FRESH",
    lastVerified: "Ongoing", source: "OFFICIAL_SOURCE", sourceName: "Regional Cultural Standard",
    confirmations: 100, contradictions: 0,
  },
];

// ── Freshness Calculation ──
export function getFreshnessLevel(lastVerified: string): FreshnessLevel {
  if (lastVerified.includes("day") || lastVerified.includes("hour") || lastVerified === "Ongoing") return "FRESH";
  if (lastVerified.includes("week")) return "AGING";
  return "POTENTIALLY_OUTDATED";
}

export function getFreshnessEmoji(level: FreshnessLevel): string {
  return level === "FRESH" ? "🟢" : level === "AGING" ? "🟡" : "🔴";
}

// ── Confidence Label ──
export function getConfidenceLabel(confidence: ConfidenceLevel): string {
  switch (confidence) {
    case "VERIFIED": return "Verified destination information";
    case "SUPPORTED": return "Supported by multiple sources";
    case "COMMUNITY_REPORTED": return "Recent travelers report...";
    case "INFERRED": return "Based on available reports, it may be...";
    case "UNKNOWN": return "Not enough reliable information";
  }
}

// ── Insight Type Labels & Icons ──
export function getInsightTypeLabel(type: InsightType): string {
  const labels: Record<InsightType, string> = {
    BEST_TIME: "Best Time", AVOID_TIME: "Avoid Time", COST_REALITY: "Cost Reality",
    CROWD: "Crowd Pattern", LOCAL_FOOD: "Local Food", LOCAL_CUSTOM: "Local Custom",
    TOURIST_MISTAKE: "Tourist Mistake", HIDDEN_GEM: "Hidden Gem",
    BETTER_ALTERNATIVE: "Better Alternative", SAFETY_NOTE: "Safety Note",
    TRANSPORT_TIP: "Transport Tip", WEATHER_CONTEXT: "Weather Context",
    SEASONAL_NOTE: "Seasonal Note", TIME_REQUIRED: "Time Required",
    VALUE_FOR_MONEY: "Value for Money", ACCESSIBILITY: "Accessibility",
    LOCAL_EXPERIENCE: "Local Experience",
  };
  return labels[type] || type;
}

import { supabase } from "@/utils/supabase";

// ── Query Functions ──
export async function getWomInsightsForDestination(destinationName: string): Promise<WomInsight[]> {
  const { data, error } = await supabase
    .from('LocalInsight')
    .select('*');

  if (error || !data) {
    console.error("Error fetching insights from Supabase:", error);
    return [];
  }

  const nameLower = destinationName.toLowerCase();
  
  // Map from LocalInsight to WomInsight
  const allInsights: WomInsight[] = data.map(dbRow => {
    // Generate mapped fields
    let confidence: ConfidenceLevel = "UNKNOWN";
    if (dbRow.confidenceScore > 90) confidence = "VERIFIED";
    else if (dbRow.confidenceScore > 80) confidence = "SUPPORTED";
    else if (dbRow.confidenceScore > 70) confidence = "COMMUNITY_REPORTED";

    return {
      id: dbRow.id,
      destinationName: dbRow.locationName,
      type: dbRow.type as InsightType,
      title: dbRow.title,
      content: dbRow.content,
      confidence,
      confidenceScore: dbRow.confidenceScore,
      freshness: "FRESH", // default for now
      lastVerified: "Recently", // default
      source: dbRow.source as SourceType,
      sourceName: dbRow.source,
      confirmations: Math.floor(Math.random() * 20) + 5, // mock for now
      contradictions: 0,
    };
  });

  const matched = allInsights.filter(
    (i) => nameLower.includes(i.destinationName.toLowerCase()) || i.destinationName.toLowerCase() === "general"
  );
  
  return matched.length > 0 ? matched : allInsights.filter((i) => i.destinationName.toLowerCase() === "general");
}

export async function getWomScore(destinationName: string): Promise<WomScore> {
  const insights = await getWomInsightsForDestination(destinationName);
  const avgConfidence = insights.reduce((s, i) => s + i.confidenceScore, 0) / (insights.length || 1);
  const totalConfirmations = insights.reduce((s, i) => s + i.confirmations, 0);
  return {
    overall: Math.min(99, Math.round(avgConfidence + (totalConfirmations > 20 ? 5 : 0))),
    localRecommend: avgConfidence > 90 ? "HIGH" : avgConfidence > 75 ? "MEDIUM" : "LOW",
    repeatTravelers: totalConfirmations > 15 ? "HIGH" : totalConfirmations > 5 ? "MEDIUM" : "LOW",
    touristHype: "MEDIUM",
    valueForMoney: avgConfidence > 85 ? "HIGH" : "MEDIUM",
    currentConditions: insights.some((i) => i.freshness === "FRESH") ? "GOOD" : "UNKNOWN",
  };
}

export async function getRealityCheck(destinationName: string): Promise<RealityCheck> {
  const insights = await getWomInsightsForDestination(destinationName);
  const hasCrowd = insights.find((i) => i.type === "CROWD");
  const hasCost = insights.find((i) => i.type === "COST_REALITY");
  return {
    onlineImpression: 4.5,
    walkingLevel: "MEDIUM",
    crowdLevel: hasCrowd ? "HIGH" : "MEDIUM",
    timeRequired: "3-4 hours",
    hiddenCost: hasCost ? hasCost.content.match(/₹[\d,–-]+/)?.[0] || "₹500-800" : "₹500-800",
    bestFor: ["Nature lovers", "Photography", "Weekend getaway"],
    notIdealFor: ["Elderly with mobility issues", "Very young children"],
  };
}

export async function getLocalPulse(destinationName: string): Promise<LocalPulse> {
  const insights = await getWomInsightsForDestination(destinationName);
  const weatherInsight = insights.find((i) => i.type === "WEATHER_CONTEXT");
  const crowdInsight = insights.find((i) => i.type === "CROWD");
  const alerts = insights.filter((i) => i.type === "SAFETY_NOTE").map((i) => i.title);
  return {
    destinationName,
    weather: weatherInsight ? "Context available" : "No recent data",
    crowd: crowdInsight ? "Reports available" : "Moderate (typical)",
    alerts,
    localActivity: "Check local events calendar",
    updatedLabel: "Based on recent available information",
    freshnessLevel: insights.some((i) => i.freshness === "FRESH") ? "FRESH" : "AGING",
  };
}

export async function calculateWorthIt(
  destinationName: string,
  travelDna: any,
  travelState: any
): Promise<WorthItResult> {
  const insights = await getWomInsightsForDestination(destinationName);
  const score = await getWomScore(destinationName);
  const reasons: string[] = [];
  const skipIf: string[] = [];

  if (travelDna?.nature > 70) reasons.push("You prefer nature experiences");
  if (travelDna?.crowdTolerance < 50) reasons.push("You dislike crowds — plan timing carefully");
  if (score.valueForMoney === "HIGH") reasons.push("Good value for money reported");
  if (score.localRecommend === "HIGH") reasons.push("Locals strongly recommend this");
  if (insights.some((i) => i.type === "HIDDEN_GEM")) reasons.push("Has hidden gems most miss");

  if (travelDna?.physicalIntensity < 40) skipIf.push("You dislike walking — some areas require climbing");
  if (travelDna?.crowdTolerance < 30) skipIf.push("Peak hours can be very crowded");
  skipIf.push("You only have 1 hour — needs at least 2-3 hours");

  const matchPercent = Math.min(99, Math.max(65, score.overall + (reasons.length * 3)));

  return {
    forYou: matchPercent > 75,
    matchPercent,
    reasons: reasons.slice(0, 5),
    skipIf: skipIf.slice(0, 3),
  };
}

// ── Post-Trip Questions ──
export const POST_TRIP_QUESTIONS = [
  { key: "worthIt", question: "Was it actually worth it?", type: "boolean" },
  { key: "bestPart", question: "Best part?", type: "text" },
  { key: "surprise", question: "What surprised you?", type: "text" },
  { key: "nextTraveler", question: "What should the next visitor know?", type: "text" },
  { key: "bestTime", question: "Best time to visit?", type: "text" },
  { key: "crowdLevel", question: "How crowded was it?", type: "select", options: ["Empty", "Low", "Medium", "High", "Extreme"] },
  { key: "realCost", question: "Actual cost beyond package?", type: "text" },
  { key: "avoid", question: "What should visitors avoid?", type: "text" },
] as const;

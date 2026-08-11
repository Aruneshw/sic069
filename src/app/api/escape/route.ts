import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateCompatibility, DEFAULT_TRAVEL_DNA } from '@/lib/travelDna';

export async function POST(req: Request) {
  try {
    const { startLocation, maxBudgetInr, travelState, surpriseMode, dna } = await req.json();

    // Fetch published packages & trips
    const packages = await prisma.package.findMany({ where: { status: "Published" } });
    const trips = await prisma.trip.findMany({ where: { status: "Published" } });

    const userDna = dna || DEFAULT_TRAVEL_DNA;
    const userState = { state: travelState || "Escape", maxBudgetInr: maxBudgetInr || 10000, startLocation: startLocation || "Chennai", availableDays: 2 };

    // Score all packages
    const scoredPackages = packages.map((pkg) => {
      const comp = calculateCompatibility(pkg, userDna, userState);
      return {
        type: "package",
        item: pkg,
        compatibility: comp,
      };
    }).sort((a, b) => b.compatibility.score - a.compatibility.score);

    if (surpriseMode) {
      // Don't Tell Me Where: pick top match, return masked initially
      const topMatch = scoredPackages[0] || { item: packages[0], compatibility: { score: 94 } };
      return NextResponse.json({
        success: true,
        surprise: {
          id: topMatch.item.id,
          maskedName: "CLASSIFIED ESCAPE DESTINATION",
          terrain: topMatch.item.tierBadge || "Mountain / Valley",
          duration: topMatch.item.duration,
          estimatedCostInr: topMatch.item.bundlePrice || 6499,
          compatibilityScore: topMatch.compatibility.score,
          realItem: topMatch.item,
        },
      });
    }

    return NextResponse.json({
      success: true,
      escapes: scoredPackages.slice(0, 8),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

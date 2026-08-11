import { NextResponse } from 'next/server';
import { getWomInsightsForDestination, getWomScore, getRealityCheck, getLocalPulse, calculateWorthIt } from '@/lib/wordOfMouth';

export async function POST(req: Request) {
  try {
    const { destination, travelDna, travelState, questionType } = await req.json();
    const destName = destination || "General";

    const insights = getWomInsightsForDestination(destName);
    const womScore = getWomScore(destName);
    const realityCheck = getRealityCheck(destName);
    const pulse = getLocalPulse(destName);
    const worthIt = calculateWorthIt(destName, travelDna, travelState);

    // Group insights by type for "What Locals Know"
    const grouped: Record<string, typeof insights> = {};
    insights.forEach((i) => {
      if (!grouped[i.type]) grouped[i.type] = [];
      grouped[i.type].push(i);
    });

    return NextResponse.json({
      success: true,
      destination: destName,
      insights,
      groupedInsights: grouped,
      womScore,
      realityCheck,
      localPulse: pulse,
      worthIt,
      insightCount: insights.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

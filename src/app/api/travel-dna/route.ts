import { NextResponse } from 'next/server';
import { DEFAULT_TRAVEL_DNA, TravelDnaScores } from '@/lib/travelDna';

export async function GET() {
  return NextResponse.json({
    success: true,
    dna: DEFAULT_TRAVEL_DNA,
    dimensionsCount: Object.keys(DEFAULT_TRAVEL_DNA).length,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { scores, learnedTrait } = body;

    const updatedDna: TravelDnaScores = {
      ...DEFAULT_TRAVEL_DNA,
      ...(scores || {}),
    };

    if (learnedTrait) {
      if (learnedTrait === "CROWD_REJECT") updatedDna.crowdTolerance = Math.max(10, updatedDna.crowdTolerance - 15);
      if (learnedTrait === "MOUNTAIN_BOOST") updatedDna.adventure = Math.min(100, updatedDna.adventure + 10);
      if (learnedTrait === "BUDGET_STRICT") updatedDna.budgetSensitivity = Math.min(100, updatedDna.budgetSensitivity + 10);
    }

    return NextResponse.json({
      success: true,
      dna: updatedDna,
      message: "Travel DNA updated and recalibrated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

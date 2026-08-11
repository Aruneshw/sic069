import { NextResponse } from 'next/server';
import { calculateCompatibility, DEFAULT_TRAVEL_DNA } from '@/lib/travelDna';

export async function POST(req: Request) {
  try {
    const { item, dna, state } = await req.json();

    if (!item) {
      return NextResponse.json({ error: "Item payload required" }, { status: 400 });
    }

    const result = calculateCompatibility(item, dna || DEFAULT_TRAVEL_DNA, state);

    return NextResponse.json({
      success: true,
      compatibility: result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

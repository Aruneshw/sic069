import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { state, startLocation, maxBudgetInr, availableDays } = body;

    const travelState = {
      state: state || "Escape",
      startLocation: startLocation || "Chennai",
      maxBudgetInr: maxBudgetInr || 10000,
      availableDays: availableDays || 2,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      travelState,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

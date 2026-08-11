import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { itemId, reason } = await req.json();

    await prisma.recommendationFeedback.create({
      data: {
        tripId: itemId || "general",
        reason: reason || "Not specified",
      }
    });

    return NextResponse.json({
      success: true,
      message: "Feedback logged. Travel DNA adjusted.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

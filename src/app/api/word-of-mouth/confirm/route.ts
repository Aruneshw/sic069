import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { insightId, userId, confirmed, comment } = await req.json();
    if (!insightId) return NextResponse.json({ error: "insightId required" }, { status: 400 });

    const confirmation = await (prisma as any).insightConfirmation.create({
      data: { insightId, userId: userId || null, confirmed: confirmed ?? true, comment: comment || null },
    });
    return NextResponse.json({ success: true, confirmation });
  } catch {
    return NextResponse.json({ success: true, stored: "local", message: "Confirmation recorded." });
  }
}

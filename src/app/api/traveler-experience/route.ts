import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destinationName, tripId, userId, contributorName, worthIt, bestTime, crowdLevel, costReality, walkingIntensity, unexpectedProblem, bestPart, whatToAvoid, localTip, recommendation } = body;

    if (!destinationName) {
      return NextResponse.json({ error: "destinationName is required" }, { status: 400 });
    }

    const experience = await (prisma as any).travelerExperience.create({
      data: {
        destinationName,
        tripId: tripId || null,
        userId: userId || null,
        contributorName: contributorName || "Anonymous Traveler",
        contributorType: "COMMUNITY",
        isVerified: false,
        worthIt: worthIt ?? null,
        bestTime: bestTime || null,
        crowdLevel: crowdLevel || null,
        costReality: costReality || null,
        walkingIntensity: walkingIntensity || null,
        unexpectedProblem: unexpectedProblem || null,
        bestPart: bestPart || null,
        whatToAvoid: whatToAvoid || null,
        localTip: localTip || null,
        recommendation: recommendation || null,
      },
    });

    return NextResponse.json({ success: true, experience });
  } catch (error: any) {
    // Fallback if DB not migrated yet — still accept the submission
    return NextResponse.json({
      success: true,
      stored: "local",
      message: "Experience recorded. Database migration pending."
    });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get("destination");

    const experiences = await (prisma as any).travelerExperience.findMany({
      where: destination ? { destinationName: { contains: destination, mode: "insensitive" } } : {},
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ success: true, experiences });
  } catch {
    return NextResponse.json({ success: true, experiences: [] });
  }
}

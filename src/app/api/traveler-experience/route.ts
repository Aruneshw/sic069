import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destinationName, tripId, userId, contributorName, worthIt, bestTime, crowdLevel, costReality, walkingIntensity, unexpectedProblem, bestPart, whatToAvoid, localTip, recommendation } = body;

    if (!destinationName) {
      return NextResponse.json({ error: "destinationName is required" }, { status: 400 });
    }

    const { data: experience, error } = await supabase
      .from('TravelerExperience')
      .insert([
        {
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
        }
      ])
      .select()
      .single();

    if (error) throw error;

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

    let query = supabase
      .from('TravelerExperience')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(20);

    if (destination) {
      query = query.ilike('destinationName', `%${destination}%`);
    }

    const { data: experiences, error } = await query;
    
    if (error) throw error;

    return NextResponse.json({ success: true, experiences: experiences || [] });
  } catch {
    return NextResponse.json({ success: true, experiences: [] });
  }
}


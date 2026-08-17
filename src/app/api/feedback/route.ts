import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  try {
    const { itemId, reason } = await req.json();

    const { error } = await supabase
      .from('RecommendationFeedback')
      .insert([
        {
          tripId: itemId || "general",
          reason: reason || "Not specified",
        }
      ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Feedback logged. Travel DNA adjusted.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

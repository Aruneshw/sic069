import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId, packageId, userName, userEmail, message } = body;

    if (!userName || !userEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Insert into Enquiry table using Supabase client
    const { data: enquiry, error } = await supabase
      .from('Enquiry')
      .insert([
        {
          tripId: tripId || null,
          packageId: packageId || null,
          userName,
          userEmail,
          message: message || '',
          status: 'Pending',
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, enquiry });
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

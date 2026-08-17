import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Insert into ContactMessage table using Supabase client
    const { data: contactMessage, error } = await supabase
      .from('ContactMessage')
      .insert([
        {
          name,
          email,
          subject,
          message,
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, contactMessage });
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

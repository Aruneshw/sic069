import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId, packageId, userName, userEmail, message } = body;

    if (!userName || !userEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Insert into Enquiry table
    const enquiry = await prisma.enquiry.create({
      data: {
        tripId: tripId || null,
        packageId: packageId || null,
        userName,
        userEmail,
        message: message || '',
        status: 'Pending',
      },
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

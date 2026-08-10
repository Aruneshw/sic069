import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/utils/supabase'; // We can use the service role key if needed

export async function POST(request: Request) {
  try {
    const { session } = await request.json();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'No session provided' }, { status: 400 });
    }

    const user = session.user;
    
    // Sync the user to our public User table using Prisma
    const dbUser = await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
      },
      create: {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        role: 'USER',
      },
    });

    // Record this login in LoginHistory
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      }
    });

    return NextResponse.json({ success: true, user: dbUser });
  } catch (error: any) {
    console.error('Error syncing user to database:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

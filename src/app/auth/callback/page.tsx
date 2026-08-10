'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Supabase client automatically handles the session token from the URL
    // We just need to wait for it to process, then redirect the user
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error.message);
        router.push('/login');
        return;
      }

      if (session) {
        // Successfully logged in! Redirect to account/dashboard or home
        router.push('/');
      } else {
        // If there's no session yet, wait for auth state change
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            router.push('/');
          }
        });
        
        // Cleanup subscription
        return () => subscription.unsubscribe();
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-400 font-medium">Completing login...</p>
      </div>
    </div>
  );
}

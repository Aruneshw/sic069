'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Authenticating...');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Since we are using standard supabase-js without SSR cookies configured out of the box,
        // the session is available in the hash or via getSession() after the redirect.
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          setStatus('Syncing profile...');
          // Sync to our public database table (via Prisma API)
          const response = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session: data.session }),
          });

          if (!response.ok) {
            console.error('Failed to sync user');
          }

          setStatus('Redirecting...');
          router.push('/account'); // redirect to member dashboard
        } else {
          // Listen for the hash change if getSession didn't pick it up immediately
          const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
              setStatus('Syncing profile...');
              await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session }),
              });
              router.push('/account');
            }
          });
          
          // Cleanup listener
          return () => {
            authListener.subscription.unsubscribe();
          };
        }
      } catch (err) {
        console.error('Callback error:', err);
        router.push('/login?error=auth_callback_failed');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 text-white">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6" />
      <h2 className="text-2xl font-bold tracking-tight">{status}</h2>
      <p className="text-teal-100/70 mt-2 font-medium">Please wait while we log you in.</p>
    </div>
  );
}

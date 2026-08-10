'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not logged in and trying to access a protected route
        // Protect the ENTIRE site, so the login page opens before anything else
        const isProtected = true; // Every route is protected
        
        // Don't block the login page or callback page
        if (isProtected && !pathname?.startsWith('/login') && !pathname?.startsWith('/auth/callback')) {
          router.replace('/login');
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        if (!pathname?.startsWith('/login') && !pathname?.startsWith('/auth/callback')) {
          router.replace('/login');
        }
      } else if (event === 'SIGNED_IN' || session) {
        setIsAuthenticated(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  // Optionally show a loading spinner while checking auth for protected routes
  const isProtected = true; // Everything is protected
  if (isProtected && !pathname?.startsWith('/login') && !pathname?.startsWith('/auth/callback') && isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

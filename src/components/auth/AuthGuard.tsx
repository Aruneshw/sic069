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
        // (Assuming we wrap this around the entire app or specific protected areas)
        // If wrapped around the whole app, we only block certain routes:
        const protectedRoutes = ['/account', '/operator'];
        const isProtected = protectedRoutes.some(route => pathname?.startsWith(route));
        
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
        const protectedRoutes = ['/account', '/operator'];
        if (protectedRoutes.some(route => pathname?.startsWith(route)) && !pathname?.startsWith('/login')) {
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
  const isProtected = ['/account', '/operator'].some(route => pathname?.startsWith(route));
  if (isProtected && !pathname?.startsWith('/login') && !pathname?.startsWith('/auth/callback') && isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

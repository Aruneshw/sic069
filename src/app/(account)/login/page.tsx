'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { getAssetUrl } from '@/lib/trips';
import { Earth } from 'lucide-react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-8">
      
      {/* Mobile-style Glossy Portal Card */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border-[8px] border-white bg-slate-900 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-2 min-h-[600px] flex flex-col justify-end group cursor-default">
        
        {/* Full Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster={getAssetUrl("/images/places/alapuzha.png")}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
          >
            <source src={getAssetUrl("/videos/mountain_preview.mp4")} type="video/mp4" />
          </video>
        </div>

        {/* Top Right Floating Icon (Like the reference heart) */}
        <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white z-20 shadow-lg">
          <Earth size={20} />
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 pt-48 pb-8 px-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 flex flex-col justify-end">
          
          <h1 className="text-4xl font-bold text-white mb-2 leading-tight drop-shadow-md tracking-tight">
            Zero Gravity
          </h1>
          
          <p className="text-slate-300 text-sm mb-6 font-medium tracking-wide uppercase">
            Explorer Portal
          </p>

          <div className="flex items-center gap-4 text-white/90 text-sm font-medium mb-8">
             <p className="leading-relaxed">
               Sign in to track your upcoming adventures and access exclusive regional itineraries.
             </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-navy-900 font-bold rounded-full py-4 hover:bg-slate-100 transition-colors shadow-lg active:scale-95 duration-200 disabled:opacity-50 disabled:active:scale-100"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

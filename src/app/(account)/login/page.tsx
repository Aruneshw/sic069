'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Zap, User, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6] p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Top Banner */}
        <div className="relative bg-[#f57f6c] border-4 border-slate-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0_0_#0f172a] text-center overflow-hidden">
          {/* Decorative Top Cutouts */}
          <div className="absolute -top-4 left-1/4 w-8 h-8 rounded-full border-4 border-slate-900 bg-[#fdfaf6]" />
          <div className="absolute -top-4 right-1/4 w-8 h-8 rounded-full border-4 border-slate-900 bg-[#fdfaf6]" />

          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0_0_#0f172a]">
              <Zap size={32} className="text-[#f57f6c] fill-[#f57f6c]" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
              Zero Gravity Portal
            </h1>
            <p className="text-white font-semibold tracking-wide">
              Sign in to access your regional expeditions and bookings.
            </p>
          </div>
        </div>

        {/* Two Columns */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Column: Sign In */}
          <div className="flex-1 bg-white border-4 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0_0_#0f172a]">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Portal Sign In</h2>
            <p className="text-slate-600 font-medium text-sm mb-8">
              Sign in with your personal or corporate Google account.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-4 border-slate-900 rounded-xl py-3.5 px-4 font-bold text-slate-900 shadow-[4px_4px_0_0_#0f172a] hover:bg-slate-50 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign In with Google (Customers)
                </>
              )}
            </button>

            <div className="flex items-center my-8">
              <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
              <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or Admin Login</span>
              <div className="flex-1 border-t-2 border-dashed border-slate-300"></div>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Admin ID" 
                className="w-full bg-white border-4 border-slate-900 rounded-xl px-4 py-3.5 font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/10 transition-all"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-white border-4 border-slate-900 rounded-xl px-4 py-3.5 font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/10 transition-all"
              />
              <button className="w-full bg-[#6366f1] text-white font-bold border-4 border-slate-900 rounded-xl py-3.5 px-4 shadow-[4px_4px_0_0_#0f172a] hover:bg-[#4f52e2] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all">
                Secure Admin Login
              </button>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex-1 bg-[#fdb57b] border-4 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0_0_#0f172a] relative">
            <span className="inline-block bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-[2px_2px_0_0_#ffffff]">
              EXPEDITION PLATFORM
            </span>

            <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
              Curated Regional Itineraries & Transparent Bookings
            </h2>
            <p className="text-slate-900/80 font-semibold text-sm mb-8 leading-relaxed">
              Zero Gravity provides full visibility into small-group expeditions across coastal, mountain, and urban landscapes.
            </p>

            <div className="space-y-4">
              <div className="bg-[#ffe8d6] border-4 border-slate-900 rounded-xl p-4 flex gap-4 items-start shadow-[4px_4px_0_0_#0f172a]">
                <div className="text-slate-900 shrink-0">
                  <User size={20} className="fill-slate-900" />
                </div>
                <div>
                  <span className="font-black text-sm text-slate-900">User Mode: </span>
                  <span className="font-semibold text-sm text-slate-700">Track bookings, submit trip enquiries & review global itineraries.</span>
                </div>
              </div>

              <div className="bg-[#ffe8d6] border-4 border-slate-900 rounded-xl p-4 flex gap-4 items-start shadow-[4px_4px_0_0_#0f172a]">
                <div className="text-slate-900 shrink-0">
                  <ShieldCheck size={20} className="fill-slate-900" />
                </div>
                <div>
                  <span className="font-black text-sm text-slate-900">Admin Mode: </span>
                  <span className="font-semibold text-sm text-slate-700">Manage departures, update pricing & monitor local operator metrics.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { getAssetUrl } from '@/lib/trips';
import { Earth, User, ShieldCheck, ArrowRight } from 'lucide-react';

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
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden bg-navy-950">
      
      {/* Immersive Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster={getAssetUrl("/images/places/alapuzha.png")}
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        >
          <source src={getAssetUrl("/videos/mountain_preview.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-navy-900/50 to-teal-900/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-6">
        
        {/* Top Banner (Glossy Style) */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col items-center text-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)] mb-6">
            <Earth size={32} className="text-white" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md mb-4">
            Zero Gravity Portal
          </h1>
          <p className="text-teal-50 text-lg font-medium max-w-xl">
            Sign in to access your regional expeditions and manage your transparent bookings.
          </p>
        </div>

        {/* Two Columns */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Column: Sign In */}
          <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <h2 className="text-2xl font-bold text-white mb-2">Portal Sign In</h2>
            <p className="text-teal-100/70 font-medium text-sm mb-10">
              Access your personal or corporate account.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-navy-900 rounded-full py-4 px-6 font-bold shadow-xl hover:bg-teal-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign In with Google
                </>
              )}
            </button>

            <div className="flex items-center my-8 opacity-50">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-xs font-semibold text-white uppercase tracking-widest">Operator Login</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Operator ID" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all"
              />
              <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-full py-4 px-6 shadow-lg hover:shadow-teal-500/25 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                Secure Login <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />
            
            <div className="mb-8">
              <span className="inline-block bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Expedition Platform
              </span>

              <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                Curated Regional Itineraries & Transparent Bookings
              </h2>
              <p className="text-slate-300 font-medium text-sm leading-relaxed">
                Zero Gravity provides full visibility into small-group expeditions across coastal, mountain, and urban landscapes.
              </p>
            </div>

            <div className="space-y-4 mt-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-start hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/30">
                  <User size={18} className="text-teal-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">Explorer Mode</h3>
                  <p className="font-medium text-xs text-slate-400 leading-relaxed">Track bookings, submit trip enquiries, and review global itineraries.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 items-start hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <ShieldCheck size={18} className="text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">Operator Mode</h3>
                  <p className="font-medium text-xs text-slate-400 leading-relaxed">Manage departures, update pricing, and monitor local operator metrics.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

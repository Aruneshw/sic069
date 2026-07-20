import { Copy, Gift, Link as LinkIcon, Mail, Trophy, CheckCircle2 } from "lucide-react";

export default function ReferralsPage() {
  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* ═══════════════════════════════════════
          HERO BANNER (page-11.png)
          ═══════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-navy-900 text-white p-8 md:p-10 card-elevated">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-navy-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Share Zero Gravity,<br/>Earn Rewards</h1>
            <p className="text-teal-50 text-lg mb-6 opacity-90">
              Give your friends 10% off their first expedition, and earn $100 in travel credit when they travel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center justify-center gap-2 bg-white text-navy-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                <LinkIcon size={18} /> Copy Invite Link
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
                <Mail size={18} /> Invite via Email
              </button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shrink-0 text-center">
            <div className="text-sm font-semibold text-teal-100 uppercase tracking-wider mb-2">Your Referral Code</div>
            <div className="text-3xl font-mono font-bold tracking-widest bg-white/10 px-4 py-2 rounded-lg mb-3">EXPLORE-ALEX</div>
            <button className="flex items-center justify-center gap-1.5 text-sm font-medium text-white hover:text-teal-200 transition-colors mx-auto">
              <Copy size={16} /> Copy Code
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STATS & TIERS (page-11.png)
          ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center text-navy-600 shrink-0">
            <Users size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-navy-900">12</div>
            <div className="text-sm font-semibold text-slate-500">Friends Referred</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <Gift size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-navy-900">4</div>
            <div className="text-sm font-semibold text-slate-500">Trips Unlocked</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-success-light flex items-center justify-center text-success shrink-0">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-navy-900">$450</div>
            <div className="text-sm font-semibold text-slate-500">Credits Earned</div>
          </div>
        </div>
      </div>

      {/* Journey Status */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Explorer Journey</h2>
            <p className="text-slate-500 text-sm">You are 1 referral away from the Elite tier!</p>
          </div>
          <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full border border-teal-100 hidden sm:block">
            Current: Voyager
          </span>
        </div>

        {/* Custom Progress Bar matching page-11 */}
        <div className="relative pt-8 pb-4">
          {/* Track */}
          <div className="absolute top-10 left-4 right-4 h-1.5 bg-slate-100 rounded-full -z-10" />
          {/* Fill */}
          <div className="absolute top-10 left-4 h-1.5 bg-teal-500 rounded-full -z-10" style={{ width: '60%' }} />
          
          <div className="flex justify-between relative">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-teal-500 border-4 border-white shadow-sm mb-2" />
              <span className="text-xs font-bold text-navy-900">Explorer</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-teal-500 border-4 border-white shadow-sm mb-2" />
              <span className="text-xs font-bold text-navy-900">Voyager</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-white border-4 border-slate-200 shadow-sm mb-2" />
              <span className="text-xs font-bold text-slate-400">Elite</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-white border-4 border-slate-200 shadow-sm mb-2" />
              <span className="text-xs font-bold text-slate-400">Legend</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-navy-50 rounded-xl border border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Gift size={20} className="text-navy-700" />
            </div>
            <div>
              <div className="text-sm font-bold text-navy-900">Unlock 'The Great Ridge' Pass</div>
              <div className="text-xs text-slate-600">Reach Elite tier to unlock an exclusive helicopter pass.</div>
            </div>
          </div>
          <button className="btn-primary py-2 px-5 text-sm whitespace-nowrap">View Rewards</button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RECENT ACTIVITY
          ═══════════════════════════════════════ */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-navy-900 mb-6">Recent Rewards Activity</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4 relative">
            <div className="w-0.5 h-full bg-slate-100 absolute left-5 top-8 -z-10" />
            <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center text-success shrink-0 z-10 border-4 border-white">
              <CheckCircle2 size={16} />
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-bold text-navy-900">Credit Earned: $100</h4>
              <p className="text-sm text-slate-500 mb-1">Sarah J. booked the Coastal Highway Escape.</p>
              <span className="text-xs font-medium text-slate-400">Oct 12, 2024</span>
            </div>
          </div>
          
          <div className="flex gap-4 relative">
            <div className="w-0.5 h-full bg-slate-100 absolute left-5 top-8 -z-10" />
            <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center text-info shrink-0 z-10 border-4 border-white">
              <Gift size={16} />
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-bold text-navy-900">Tier Unlocked: Voyager</h4>
              <p className="text-sm text-slate-500 mb-1">You reached 10 successful referrals!</p>
              <span className="text-xs font-medium text-slate-400">Sep 28, 2024</span>
            </div>
          </div>
          
          <div className="flex gap-4 relative">
            <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center text-warning shrink-0 z-10 border-4 border-white">
              <Clock size={16} />
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-bold text-navy-900">Pending Credit: $100</h4>
              <p className="text-sm text-slate-500 mb-1">Michael T. used your link. Credit will be applied after their trip.</p>
              <span className="text-xs font-medium text-slate-400">Sep 15, 2024</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

// Inline definition for missing Users icon to avoid breaking if not exported above
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Clock(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}

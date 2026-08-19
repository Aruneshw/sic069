import Link from "next/link";
import { Compass, LayoutDashboard, Map, MessageSquare, Users, Settings, Bell, Search, LogOut } from "lucide-react";

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { href: "/operator", label: "Dashboard", icon: LayoutDashboard },
    { href: "/operator#trips", label: "Manage Trips", icon: Map },
    { href: "/operator#enquiries", label: "Enquiries", icon: MessageSquare },
    { href: "/operator#travellers", label: "Travellers", icon: Users },
    { href: "/operator/insights", label: "Insights", icon: Search },
    { href: "/operator#settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      
      {/* ═══════════════════════════════════════
          SIDEBAR
          ═══════════════════════════════════════ */}
      <aside
        className="w-64 flex flex-col shrink-0 text-slate-300"
        style={{
          background: "linear-gradient(180deg, #4A000E 0%, #780116 100%)",
          boxShadow: "4px 0 20px rgba(74,0,14,0.15)",
        }}
      >
        
        {/* Logo Lockup */}
        <div className="h-[var(--nav-height)] flex items-center px-6 border-b border-white/10 shrink-0">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #F9C862, #D49018)",
                boxShadow: "3px 3px 8px rgba(74,0,14,0.3), inset 1px 1px 2px rgba(255,255,255,0.3)",
              }}
            >
              <Compass size={18} color="#150408" strokeWidth={2} />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>Zero Gravity</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-[#F7B538] text-white/70 transition-colors no-underline"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(145deg, #F9C862, #D49018)" }}
            >
              OP
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>Operator User</div>
              <div className="text-[10px] uppercase tracking-wider text-[#F7B538]" style={{ fontFamily: "var(--font-poppins)" }}>Admin Access</div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-white/50 hover:text-[#F7B538] transition-colors w-full px-2 py-2">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════
          MAIN CONTENT AREA
          ═══════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header
          className="h-[var(--nav-height)] bg-white flex items-center justify-between px-8 shrink-0"
          style={{
            borderBottom: "2px solid rgba(120,1,22,0.06)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          
          {/* Search */}
          <div className="relative w-64 hidden sm:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings or trips..."
              className="w-full pl-9 pr-4 py-2 bg-transparent border-2 border-[#780116]/8 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F7B538]/40 focus:bg-white transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            />
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-[#780116] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#780116] rounded-full border border-white" />
            </button>
            <div className="w-px h-6 bg-[#780116]/10" />
            <button className="btn-primary py-2 px-4 text-sm hidden sm:flex">
              + New Trip
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}

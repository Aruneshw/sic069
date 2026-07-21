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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* ═══════════════════════════════════════
          SIDEBAR
          ═══════════════════════════════════════ */}
      <aside className="w-64 bg-navy-900 text-slate-300 flex flex-col shrink-0">
        
        {/* Logo Lockup */}
        <div className="h-[var(--nav-height)] flex items-center px-6 border-b border-navy-800 shrink-0">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <Compass size={18} color="white" strokeWidth={2} />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight">Zero Gravity</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-800 hover:text-white transition-colors"
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-white text-xs font-bold">
              OP
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">Operator User</div>
              <div className="text-[10px] uppercase tracking-wider text-teal-400">Admin Access</div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-full px-2 py-2">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════
          MAIN CONTENT AREA
          ═══════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-[var(--nav-height)] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          
          {/* Search */}
          <div className="relative w-64 hidden sm:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings or trips..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-navy-900 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border border-white" />
            </button>
            <div className="w-px h-6 bg-slate-200" />
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

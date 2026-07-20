import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import NotificationPanel from "@/components/ui/NotificationPanel";
import { MessageSquare, CalendarCheck, Heart, Settings, Gift, ChevronRight } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accountLinks = [
    { href: "/account/enquiries", label: "My Enquiries", icon: MessageSquare },
    { href: "/account/bookings", label: "Bookings", icon: CalendarCheck },
    { href: "/account/referrals", label: "Refer & Earn", icon: Gift },
    { href: "/account/saved", label: "Saved Trips", icon: Heart },
    { href: "/account/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <NotificationPanel />
      
      <main className="flex-1 pt-[calc(var(--nav-height)+2rem)] pb-24 md:pb-12">
        <div className="container-main">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 lg:w-72 shrink-0">
              <div className="card-elevated bg-white p-6 rounded-2xl border border-slate-200 sticky top-[calc(var(--nav-height)+2rem)]">
                
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-700 to-teal-500 flex items-center justify-center text-white text-lg font-bold shadow-md shrink-0">
                    AT
                  </div>
                  <div>
                    <h2 className="font-bold text-navy-900">Alex Thompson</h2>
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Global Explorer</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {accountLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-navy-900 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </Link>
                    );
                  })}
                </nav>
                
                {/* Logout */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button className="w-full text-left p-3 rounded-xl text-sm font-medium text-danger hover:bg-danger-light transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Page Content */}
            <div className="flex-1 min-w-0">
              {children}
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileTabBar />
    </div>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";
import NotificationPanel from "@/components/ui/NotificationPanel";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <NotificationPanel />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24 md:pb-12">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar />
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

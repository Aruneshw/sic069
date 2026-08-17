"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Tag, AlertTriangle, Info, Map, CheckCircle2, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase";

type NotificationType = "SEAT_ALERT" | "PRICE_DROP" | "NEW_TRIP" | "SYSTEM_UPDATE";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string; // ISO string
}

const getIconForType = (type: string) => {
  switch (type) {
    case "SEAT_ALERT":
      return <AlertTriangle size={18} className="text-warning" />;
    case "PRICE_DROP":
      return <Tag size={18} className="text-success" />;
    case "NEW_TRIP":
      return <Map size={18} className="text-teal-500" />;
    case "SYSTEM_UPDATE":
    default:
      return <Info size={18} className="text-info" />;
  }
};

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function NotificationPanel() {
  const { isNotificationPanelOpen, closeNotificationPanel, setUnreadCount } = useAppStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from our API route
  const fetchNotifications = useCallback(async () => {
    if (!isNotificationPanelOpen) return;
    
    try {
      setLoading(true);
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [isNotificationPanelOpen]);

  // Initial load and Realtime Subscription
  useEffect(() => {
    fetchNotifications();

    // Subscribe to new notifications in real-time
    const channel = supabase
      .channel("public:Notification")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Notification" },
        (payload) => {
          console.log("Realtime payload:", payload);
          // Prepend new notification to state
          setNotifications((prev) => [payload.new as Notification, ...prev]);
          toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}>
              <div className="flex-1 w-0">
                <p className="text-sm font-bold text-navy-900">New Notification!</p>
                <p className="mt-1 text-sm text-slate-500">{payload.new.title}</p>
              </div>
            </div>
          ), { duration: 4000, position: 'bottom-right' });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchNotifications]);

  // Sync unread count to global store whenever notifications change
  useEffect(() => {
    const unread = notifications.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  }, [notifications, setUnreadCount]);

  const markAllAsRead = async () => {
    // Optimistic UI update
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
    } catch (err) {
      console.error("Failed to mark all as read");
      fetchNotifications(); // revert on failure
    }
  };

  const markAsRead = async (id: string) => {
    const target = notifications.find(n => n.id === id);
    if (!target || target.isRead) return;

    // Optimistic UI update
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to mark as read");
      fetchNotifications(); // revert on failure
    }
  };

  return (
    <AnimatePresence>
      {isNotificationPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm z-[100]"
            onClick={closeNotificationPanel}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white z-[101] shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-navy-50 rounded-full">
                  <Bell size={20} className="text-navy-700" />
                </div>
                <h2 className="text-lg font-bold text-navy-900">Notifications</h2>
              </div>
              <button
                onClick={closeNotificationPanel}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">
                {notifications.filter(n => !n.isRead).length} Unread
              </span>
              <button 
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors disabled:opacity-50"
                disabled={notifications.filter(n => !n.isRead).length === 0}
              >
                <CheckCircle2 size={16} />
                Mark all as read
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
              {loading && notifications.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                  <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 opacity-70">
                  <Bell size={48} className="text-slate-300 mb-4" />
                  <h3 className="text-slate-600 font-semibold mb-1">No notifications yet</h3>
                  <p className="text-slate-400 text-sm">We'll let you know when there's an update.</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      notification.isRead 
                        ? "bg-white border-slate-100" 
                        : "bg-teal-50/30 border-teal-100 shadow-sm"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.isRead ? "bg-slate-100" : "bg-white shadow-sm"
                      }`}>
                        {getIconForType(notification.type)}
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-bold ${notification.isRead ? "text-slate-700" : "text-navy-900"}`}>
                            {notification.title}
                          </h4>
                          <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                            {getRelativeTime(notification.createdAt)}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${notification.isRead ? "text-slate-500" : "text-slate-600"}`}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Preferences link */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <button className="w-full py-3 text-sm font-semibold text-navy-700 bg-navy-50 hover:bg-navy-100 rounded-xl transition-colors">
                Manage Preferences
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

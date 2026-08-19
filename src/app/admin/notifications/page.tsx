"use client";

import { useState } from "react";
import { Send, BellRing, Loader2, AlertTriangle, Tag, Map, Info } from "lucide-react";
import { supabase } from "@/utils/supabase";
import toast, { Toaster } from "react-hot-toast";

type NotificationType = "SEAT_ALERT" | "PRICE_DROP" | "NEW_TRIP" | "SYSTEM_UPDATE";

export default function AdminNotificationsPage() {
  const [type, setType] = useState<NotificationType>("SYSTEM_UPDATE");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("Notification").insert({
        type,
        title: title.trim(),
        message: message.trim(),
        isRead: false,
      });

      if (error) throw error;

      toast.success("Notification broadcasted via Realtime!");
      setTitle("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to broadcast notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <Toaster position="top-right" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
          <BellRing className="text-teal-400" size={28} />
          Realtime Broadcast
        </h1>
        <p className="text-slate-400">
          Push live notifications instantly to all connected clients using Supabase Realtime (CDC).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-2">
          <div className="bg-navy-900/50 border border-navy-800 rounded-2xl p-6 backdrop-blur-sm">
            <form onSubmit={handleBroadcast} className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Notification Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "SYSTEM_UPDATE", icon: Info, label: "System", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
                    { id: "SEAT_ALERT", icon: AlertTriangle, label: "Alert", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
                    { id: "PRICE_DROP", icon: Tag, label: "Promo", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
                    { id: "NEW_TRIP", icon: Map, label: "Trip", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isActive = type === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id as NotificationType)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                          isActive 
                            ? `${t.bg} border-opacity-50 ring-2 ring-white/10` 
                            : 'bg-navy-950/50 border-navy-800 text-slate-300 hover:bg-navy-800'
                        }`}
                      >
                        <Icon className={isActive ? t.color : ""} size={20} />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : ''}`}>
                          {t.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Heading Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Flash Sale Active!"
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Message Content</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Keep it concise and exciting..."
                  rows={4}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold px-6 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  Broadcast to All Users
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Preview</h3>
            <div className="bg-[rgba(12,22,38,0.85)] backdrop-blur-md rounded-xl border border-slate-100 p-4 shadow-xl">
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-teal-50/50">
                  {type === "SYSTEM_UPDATE" && <Info size={18} className="text-blue-500" />}
                  {type === "SEAT_ALERT" && <AlertTriangle size={18} className="text-amber-500" />}
                  {type === "PRICE_DROP" && <Tag size={18} className="text-emerald-500" />}
                  {type === "NEW_TRIP" && <Map size={18} className="text-purple-500" />}
                </div>
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-navy-900">
                      {title || "Example Title"}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                      Just now
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {message || "This is how your notification will appear in the user's dashboard slide-out panel."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ThumbsDown, Check } from "lucide-react";
import toast from "react-hot-toast";

interface RejectionLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: string;
  itemTitle?: string;
}

const REJECTION_REASONS = [
  "Too expensive for my current budget",
  "Too crowded or touristy",
  "Too far to travel right now",
  "Not adventurous enough",
  "Too quiet or secluded",
  "Wrong duration",
  "Vibe doesn't feel right",
];

export default function RejectionLearningModal({ isOpen, onClose, itemId, itemTitle }: RejectionLearningModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedReason) return;
    setLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, reason: selectedReason }),
      });
      toast.success("Got it! We've adjusted your Travel DNA recommendations.");
      onClose();
    } catch {
      toast.error("Failed to log feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-navy-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white"
        >
          <button onClick={onClose} className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white">
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ThumbsDown size={14} /> Rejection Learning
          </div>

          <h3 className="text-xl font-bold mb-1">What didn't feel right?</h3>
          <p className="text-xs text-slate-400 mb-5">
            Help Zero Gravity learn from your preference regarding <span className="text-teal-300 font-semibold">{itemTitle || "this trip"}</span>.
          </p>

          <div className="space-y-2 mb-6">
            {REJECTION_REASONS.map((reason) => {
              const isSelected = selectedReason === reason;
              return (
                <button
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? "bg-rose-500/20 border-rose-400 text-white font-bold"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>{reason}</span>
                  {isSelected && <Check size={16} className="text-rose-400" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedReason || loading}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl text-sm disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? "Updating DNA..." : "Recalibrate Preferences"}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

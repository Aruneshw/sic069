"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Compass,
  Archive,
  Loader2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/utils/supabase";

interface PackageRow {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  tierBadge: string;
  bundlePrice: number;
  duration: string;
  maxSeats: number;
  filledSeats: number;
  status: string;
  imageUrl: string;
  updatedAt: string;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState<PackageRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const getToken = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token || "";
  }, []);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch("/api/admin/packages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPackages(data);
    } catch {
      toast.error("Failed to load packages.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // --- Delete ---
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = await getToken();
      const res = await fetch(`/api/admin/packages/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success(`"${deleteTarget.name}" deleted successfully.`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete package.");
    } finally {
      setDeleting(false);
    }
  };

  // --- Quick status toggle ---
  const handleStatusChange = async (pkg: PackageRow, newStatus: string) => {
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, ...updated } : p))
      );
      toast.success(`"${pkg.name}" status changed to ${newStatus}.`);
    } catch {
      toast.error("Failed to update status.");
    }
    setActiveMenu(null);
  };

  // --- Filters ---
  const filteredPackages = packages.filter((pkg) => {
    if (statusFilter !== "All" && pkg.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        pkg.name.toLowerCase().includes(q) ||
        pkg.tagline.toLowerCase().includes(q) ||
        pkg.tierBadge.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Draft":
        return "bg-[rgba(200,165,92,0.08)] text-[#05070B] border-[#F7B538]/30";
      case "Archived":
        return "bg-[#C8A55C]/30 text-rose-300 border-[#780116]/50";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  const statusCounts = {
    All: packages.length,
    Published: packages.filter((p) => p.status === "Published").length,
    Draft: packages.filter((p) => p.status === "Draft").length,
    Archived: packages.filter((p) => p.status === "Archived").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-[#05070B]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#05070B]">Inventory Command</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Curated Packages</h1>
          <p className="text-xs text-slate-400 mt-1">
            Live database management for multi-stop expeditions.{" "}
            <span className="text-[#05070B] font-bold">
              ({packages.length} active records)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPackages}
            disabled={loading}
            className="p-2.5 bg-[#150408] text-slate-300 hover:text-[#05070B] rounded-xl border border-[#F7B538]/20 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/packages/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#F7B538] to-[#D49018] text-white rounded-xl text-xs font-black uppercase tracking-wider hover:from-[#F9C862] hover:to-[#F7B538] transition-all shadow-lg shadow-[#F7B538]/20 no-underline"
          >
            <Plus size={16} strokeWidth={2.8} />
            Create Package
          </Link>
        </div>
      </div>

      {/* Bento Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#150408] border border-[#F7B538]/20">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Total Packages</div>
          <div className="text-2xl font-black text-white mt-1">{statusCounts.All}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#150408] border border-emerald-500/20">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Published Live</div>
          <div className="text-2xl font-black text-white mt-1">{statusCounts.Published}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#150408] border border-[#F7B538]/20">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#05070B]">Draft Staging</div>
          <div className="text-2xl font-black text-white mt-1">{statusCounts.Draft}</div>
        </div>
        <div className="p-4 rounded-2xl bg-[#150408] border border-[#780116]/30">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">Archived</div>
          <div className="text-2xl font-black text-white mt-1">{statusCounts.Archived}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#150408] border border-[#F7B538]/15 rounded-2xl p-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {(["All", "Published", "Draft", "Archived"] as const).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
                  statusFilter === filter
                    ? "bg-[#C8A55C] text-[#05070B] border border-[rgba(200,165,92,0.20)] shadow-sm"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {filter}{" "}
                <span className="text-[#05070B]/80 ml-1">
                  ({statusCounts[filter]})
                </span>
              </button>
            )
          )}
        </div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search package name, tier..."
            className="w-full md:w-64 bg-[#0B0204] border border-[#F7B538]/20 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F7B538]"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#150408] border border-[#F7B538]/15 rounded-2xl overflow-visible shadow-xl">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  size={32}
                  className="animate-spin text-[#05070B]"
                />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Loading Live Packages...
                </p>
              </div>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <Compass
                  size={48}
                  className="mx-auto text-slate-200 mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-2">
                  No packages found
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  {searchTerm || statusFilter !== "All"
                    ? "Try adjusting your search or filters."
                    : "Create your first package to get started."}
                </p>
                {!searchTerm && statusFilter === "All" && (
                  <Link
                    href="/admin/packages/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7B538] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#F9C862] transition-colors no-underline"
                  >
                    <Plus size={16} /> Create Package
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0B0204] text-[11px] uppercase tracking-wider font-extrabold text-[#05070B]/70 border-b border-[#F7B538]/15">
                <tr>
                  <th className="px-5 py-4">Package Info</th>
                  <th className="px-5 py-4">Tier Badge</th>
                  <th className="px-5 py-4">Bundle Price</th>
                  <th className="px-5 py-4">Max Capacity</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Last Updated</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7B538]/10 text-xs">
                {filteredPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0B0204] flex items-center justify-center text-slate-300 shrink-0 border border-[#F7B538]/20">
                          {pkg.imageUrl ? (
                            <img
                              src={pkg.imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Compass size={18} className="text-[#05070B]" />
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-sm">{pkg.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {pkg.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-[#05070B]">
                        {pkg.tierBadge}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-black text-white text-sm">
                      ₹{pkg.bundlePrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-slate-300 font-medium">
                      {pkg.maxSeats} Pax
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(
                          pkg.status
                        )}`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-[11px]">
                      {new Date(pkg.updatedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right relative">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === pkg.id ? null : pkg.id
                          )
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#05070B] hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      <AnimatePresence>
                        {activeMenu === pkg.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setActiveMenu(null)}
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-8 top-10 w-52 bg-[#0B0204] border border-[#F7B538]/30 rounded-2xl shadow-2xl z-50 overflow-hidden py-1"
                            >
                              <Link
                                href={`/admin/packages/${pkg.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-[#05070B] hover:bg-white/5 no-underline"
                                onClick={() => setActiveMenu(null)}
                              >
                                <Edit size={15} /> Edit Package
                              </Link>
                              <Link
                                href={`/packages`}
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-[#05070B] hover:bg-white/5 no-underline"
                                onClick={() => setActiveMenu(null)}
                              >
                                <Eye size={15} /> View Public Page
                              </Link>

                              <div className="h-px bg-white/10 my-1" />

                              {/* Status Toggles */}
                              {pkg.status !== "Published" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(pkg, "Published")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-emerald-400 hover:bg-emerald-500/10 text-left font-bold"
                                >
                                  <CheckCircle size={15} /> Publish Live
                                </button>
                              )}
                              {pkg.status !== "Draft" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(pkg, "Draft")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-[#05070B] hover:bg-[rgba(200,165,92,0.08)] text-left font-bold"
                                >
                                  <FileText size={15} /> Move to Draft
                                </button>
                              )}
                              {pkg.status !== "Archived" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(pkg, "Archived")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 text-left font-bold"
                                >
                                  <Archive size={15} /> Archive
                                </button>
                              )}

                              <div className="h-px bg-white/10 my-1" />

                              <button
                                onClick={() => {
                                  setActiveMenu(null);
                                  setDeleteTarget(pkg);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 text-left font-bold"
                              >
                                <Trash2 size={15} /> Delete Package
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !deleting && setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0B0204] border border-[#780116] rounded-[2rem] p-6 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 mb-4 text-[#C8A55C]">
                <div className="w-12 h-12 rounded-2xl bg-[#C8A55C]/20 border border-[#780116]/40 flex items-center justify-center text-rose-400">
                  <Trash2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Delete Package</h3>
                  <p className="text-xs text-slate-400">This action is permanent and cannot be undone.</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-6 bg-[#150408] p-3.5 rounded-xl border border-white/5">
                Are you sure you want to delete <span className="font-bold text-[#05070B]">&ldquo;{deleteTarget.name}&rdquo;</span>?
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#780116] to-[#4A000E] text-rose-200 text-xs font-black uppercase tracking-wider hover:from-rose-700 hover:to-rose-800 transition-all shadow-lg flex items-center gap-2 border border-rose-500/30"
                >
                  {deleting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Deleting...
                    </>
                  ) : (
                    "Confirm Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FileText({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}

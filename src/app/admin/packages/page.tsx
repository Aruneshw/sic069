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
  FileText,
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
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Draft":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Archived":
        return "bg-red-500/10 text-red-400 border-red-500/20";
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
          <h1 className="text-2xl font-bold text-white mb-1">Packages</h1>
          <p className="text-sm text-slate-400">
            Manage all travel experiences and expeditions.{" "}
            <span className="text-slate-500">
              ({packages.length} total)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPackages}
            disabled={loading}
            className="p-2 bg-navy-800 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/packages/new"
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-navy-950 rounded-lg text-sm font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] no-underline"
          >
            <Plus size={16} strokeWidth={2.5} />
            Create Package
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {(["All", "Published", "Draft", "Archived"] as const).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  statusFilter === filter
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
                }`}
              >
                {filter}{" "}
                <span className="text-slate-500 ml-1">
                  {statusCounts[filter]}
                </span>
              </button>
            )
          )}
        </div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search packages..."
            className="w-full md:w-64 bg-navy-950 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-visible">
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  size={32}
                  className="animate-spin text-teal-400"
                />
                <p className="text-sm text-slate-500">
                  Loading packages...
                </p>
              </div>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <Compass
                  size={48}
                  className="mx-auto text-slate-600 mb-4"
                />
                <h3 className="text-lg font-bold text-white mb-2">
                  No packages found
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {searchTerm || statusFilter !== "All"
                    ? "Try adjusting your search or filters."
                    : "Create your first package to get started."}
                </p>
                {!searchTerm && statusFilter === "All" && (
                  <Link
                    href="/admin/packages/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-navy-950 rounded-lg text-sm font-bold hover:bg-teal-400 transition-colors no-underline"
                  >
                    <Plus size={16} /> Create Package
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-navy-950/50 text-xs uppercase tracking-wider font-bold text-slate-500 border-b border-white/5">
                <tr>
                  <th className="px-5 py-4">Package Info</th>
                  <th className="px-5 py-4">Tier</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Capacity</th>
                  <th className="px-5 py-4">Booked</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Updated</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-navy-800 flex items-center justify-center text-slate-500 shrink-0 border border-white/5">
                          {pkg.imageUrl ? (
                            <img
                              src={pkg.imageUrl}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                                (
                                  e.target as HTMLImageElement
                                ).parentElement!.innerHTML =
                                  '<svg class="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>';
                              }}
                            />
                          ) : (
                            <Compass size={18} />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{pkg.name}</p>
                          <p className="text-xs text-slate-500">
                            {pkg.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-400 font-medium">
                        {pkg.tierBadge}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-white">
                      ₹{pkg.bundlePrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {pkg.maxSeats} Pax
                    </td>
                    <td className="px-5 py-4 font-bold text-emerald-400">
                      {pkg.filledSeats}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(
                          pkg.status
                        )}`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">
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
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
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
                              className="absolute right-8 top-10 w-52 bg-navy-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1"
                            >
                              <Link
                                href={`/admin/packages/${pkg.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 no-underline"
                                onClick={() => setActiveMenu(null)}
                              >
                                <Edit size={16} /> Edit Package
                              </Link>
                              <Link
                                href={`/packages`}
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 no-underline"
                                onClick={() => setActiveMenu(null)}
                              >
                                <Eye size={16} /> View Public Page
                              </Link>

                              <div className="h-px bg-white/5 my-1" />

                              {/* Status Toggles */}
                              {pkg.status !== "Published" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(pkg, "Published")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-emerald-400 hover:bg-emerald-500/10 text-left font-bold"
                                >
                                  <CheckCircle size={16} /> Publish
                                </button>
                              )}
                              {pkg.status !== "Draft" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(pkg, "Draft")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-400 hover:bg-amber-500/10 text-left"
                                >
                                  <FileText size={16} /> Move to Draft
                                </button>
                              )}
                              {pkg.status !== "Archived" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(pkg, "Archived")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-500 hover:bg-amber-500/10 text-left"
                                >
                                  <Archive size={16} /> Archive
                                </button>
                              )}

                              <div className="h-px bg-white/5 my-1" />

                              <button
                                onClick={() => {
                                  setDeleteTarget(pkg);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 text-left"
                              >
                                <Trash2 size={16} /> Delete
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

        {/* Footer with count */}
        {!loading && filteredPackages.length > 0 && (
          <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-slate-400">
            <span>
              Showing {filteredPackages.length} of {packages.length} packages
            </span>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !deleting && setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-navy-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl z-10"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto mb-5">
                <Trash2 size={28} className="text-red-400" />
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-2">
                Delete Package
              </h3>
              <p className="text-sm text-slate-400 text-center mb-2">
                Are you sure you want to delete{" "}
                <span className="text-white font-bold">
                  &ldquo;{deleteTarget.name}&rdquo;
                </span>
                ?
              </p>
              <p className="text-xs text-red-400/80 text-center mb-6">
                This action cannot be undone. All associated enquiries will
                also be deleted.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-navy-800 text-white rounded-xl text-sm font-semibold hover:bg-navy-700 transition-colors border border-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-400 transition-colors disabled:opacity-50"
                >
                  {deleting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {deleting ? "Deleting..." : "Delete Forever"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

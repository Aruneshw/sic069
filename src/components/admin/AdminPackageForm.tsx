"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  ImageIcon,
  Video,
  IndianRupee,
  Users,
  Clock,
  Tag,
  FileText,
  CheckCircle2,
  Compass,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/utils/supabase";

interface ItineraryStep {
  day: string;
  title: string;
  description: string;
  location: string;
}

export interface PackageFormData {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  tierBadge: string;
  bundlePrice: number | string;
  duration: string;
  maxSeats: number | string;
  filledSeats: number | string;
  imageUrl: string;
  videoUrl: string;
  status: string;
  itinerary: ItineraryStep[];
  inclusions: string[];
  includedTripIds: string[];
}

const EMPTY_FORM: PackageFormData = {
  name: "",
  tagline: "",
  description: "",
  tierBadge: "",
  bundlePrice: "",
  duration: "",
  maxSeats: "",
  filledSeats: 0,
  imageUrl: "",
  videoUrl: "",
  status: "Draft",
  itinerary: [{ day: "Day 1", title: "", description: "", location: "" }],
  inclusions: [""],
  includedTripIds: [""],
};

const TIER_SUGGESTIONS = [
  "HIGH-ALTITUDE JOURNEYS",
  "TROPICAL BUNDLE",
  "HERITAGE COLLECTION",
  "ADVENTURE SERIES",
  "COASTAL ESCAPES",
  "MOUNTAIN EXPEDITIONS",
  "BUDGET EXPLORER",
  "LUXURY RETREAT",
  "CULTURAL DISCOVERY",
  "NATURE IMMERSION",
];

export default function AdminPackageForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: PackageFormData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PackageFormData>(initialData || EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof PackageFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // --- Itinerary helpers ---
  const addItineraryStep = () => {
    const nextDay = `Day ${form.itinerary.length + 1}`;
    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: nextDay, title: "", description: "", location: "" },
      ],
    }));
  };

  const updateItineraryStep = (
    index: number,
    field: keyof ItineraryStep,
    value: string
  ) => {
    const updated = [...form.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, itinerary: updated }));
  };

  const removeItineraryStep = (index: number) => {
    if (form.itinerary.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  // --- Inclusions helpers ---
  const addInclusion = () => {
    setForm((prev) => ({ ...prev, inclusions: [...prev.inclusions, ""] }));
  };

  const updateInclusion = (index: number, value: string) => {
    const updated = [...form.inclusions];
    updated[index] = value;
    setForm((prev) => ({ ...prev, inclusions: updated }));
  };

  const removeInclusion = (index: number) => {
    if (form.inclusions.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index),
    }));
  };

  // --- Trip IDs helpers ---
  const addTripId = () => {
    setForm((prev) => ({
      ...prev,
      includedTripIds: [...prev.includedTripIds, ""],
    }));
  };

  const updateTripId = (index: number, value: string) => {
    const updated = [...form.includedTripIds];
    updated[index] = value;
    setForm((prev) => ({ ...prev, includedTripIds: updated }));
  };

  const removeTripId = (index: number) => {
    if (form.includedTripIds.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      includedTripIds: prev.includedTripIds.filter((_, i) => i !== index),
    }));
  };

  // --- Validation ---
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Package name is required";
    if (!form.tagline.trim()) newErrors.tagline = "Tagline is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.tierBadge.trim()) newErrors.tierBadge = "Tier badge is required";
    if (!form.bundlePrice || Number(form.bundlePrice) <= 0)
      newErrors.bundlePrice = "Price must be greater than 0";
    if (!form.duration.trim()) newErrors.duration = "Duration is required";
    if (!form.maxSeats || Number(form.maxSeats) <= 0)
      newErrors.maxSeats = "Max seats must be greater than 0";
    if (!form.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";

    // Validate itinerary has at least one complete step
    const hasValidItinerary = form.itinerary.some(
      (s) => s.title.trim() && s.description.trim()
    );
    if (!hasValidItinerary)
      newErrors.itinerary =
        "At least one itinerary step needs a title and description";

    // Validate inclusions has at least one non-empty item
    const hasValidInclusion = form.inclusions.some((i) => i.trim());
    if (!hasValidInclusion)
      newErrors.inclusions = "At least one inclusion is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit ---
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      const payload = {
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        tierBadge: form.tierBadge.trim().toUpperCase(),
        bundlePrice: Number(form.bundlePrice),
        duration: form.duration.trim(),
        maxSeats: Number(form.maxSeats),
        filledSeats: Number(form.filledSeats || 0),
        imageUrl: form.imageUrl.trim(),
        videoUrl: form.videoUrl.trim() || null,
        status: form.status,
        itinerary: JSON.stringify(
          form.itinerary.filter((s) => s.title.trim() || s.description.trim())
        ),
        inclusions: JSON.stringify(
          form.inclusions.filter((i) => i.trim())
        ),
        includedTripIds: JSON.stringify(
          form.includedTripIds.filter((t) => t.trim())
        ),
      };

      const url =
        mode === "create"
          ? "/api/admin/packages"
          : `/api/admin/packages/${form.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save package");
      }

      toast.success(
        mode === "create"
          ? "Package created successfully!"
          : "Package updated successfully!"
      );

      router.push("/admin/packages");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-colors";
  const labelClass =
    "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";
  const errorClass = "text-xs text-red-400 mt-1.5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 animate-in fade-in duration-500"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/packages")}
            className="p-2 bg-navy-900 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {mode === "create" ? "Create Package" : "Edit Package"}
            </h1>
            <p className="text-sm text-slate-400">
              {mode === "create"
                ? "Design a new premium expedition."
                : `Editing: ${form.name || "Untitled"}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/packages")}
            className="px-4 py-2 bg-navy-800 text-white rounded-lg text-sm font-semibold hover:bg-navy-700 transition-colors border border-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-teal-500 text-navy-950 rounded-lg text-sm font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} strokeWidth={2.5} />
            )}
            {saving
              ? "Saving..."
              : mode === "create"
              ? "Create Package"
              : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
        {/* Left Column — Main Fields */}
        <div className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-teal-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Basic Information
              </h2>
            </div>

            <div>
              <label className={labelClass}>Package Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. Kolukkumalai Sunrise Expedition"
                className={inputClass}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label className={labelClass}>Tagline *</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                placeholder="A short, exciting hook for the card..."
                className={inputClass}
              />
              {errors.tagline && (
                <p className={errorClass}>{errors.tagline}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Full Description *</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="The complete immersive story of this journey..."
                className={`${inputClass} resize-none`}
              />
              {errors.description && (
                <p className={errorClass}>{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Tier Badge *</label>
                <input
                  type="text"
                  value={form.tierBadge}
                  onChange={(e) => updateField("tierBadge", e.target.value)}
                  placeholder="e.g. HIGH-ALTITUDE JOURNEYS"
                  list="tier-suggestions"
                  className={inputClass}
                />
                <datalist id="tier-suggestions">
                  {TIER_SUGGESTIONS.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
                {errors.tierBadge && (
                  <p className={errorClass}>{errors.tierBadge}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Capacity Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee size={18} className="text-teal-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Pricing & Capacity
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Bundle Price (₹) *</label>
                <div className="relative">
                  <IndianRupee
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="number"
                    value={form.bundlePrice}
                    onChange={(e) =>
                      updateField("bundlePrice", e.target.value)
                    }
                    placeholder="85000"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.bundlePrice && (
                  <p className={errorClass}>{errors.bundlePrice}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Duration *</label>
                <div className="relative">
                  <Clock
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                    placeholder="14 Days"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.duration && (
                  <p className={errorClass}>{errors.duration}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Max Seats *</label>
                <div className="relative">
                  <Users
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="number"
                    value={form.maxSeats}
                    onChange={(e) =>
                      updateField("maxSeats", e.target.value)
                    }
                    placeholder="12"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.maxSeats && (
                  <p className={errorClass}>{errors.maxSeats}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Filled Seats</label>
                <input
                  type="number"
                  value={form.filledSeats}
                  onChange={(e) =>
                    updateField("filledSeats", e.target.value)
                  }
                  placeholder="0"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon size={18} className="text-teal-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Media
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Cover Image URL *</label>
                <div className="relative">
                  <ImageIcon
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => updateField("imageUrl", e.target.value)}
                    placeholder="/images/places/kashmir.png"
                    className={`${inputClass} pl-10`}
                  />
                </div>
                {errors.imageUrl && (
                  <p className={errorClass}>{errors.imageUrl}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Video URL (optional)</label>
                <div className="relative">
                  <Video
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={(e) => updateField("videoUrl", e.target.value)}
                    placeholder="https://..."
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>

            {/* Image preview */}
            {form.imageUrl && (
              <div className="rounded-xl border border-white/10 overflow-hidden h-40 bg-navy-950">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Itinerary Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-teal-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Itinerary
                </h2>
              </div>
              <button
                onClick={addItineraryStep}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg text-xs font-bold hover:bg-teal-500/20 transition-colors border border-teal-500/20"
              >
                <Plus size={14} /> Add Day
              </button>
            </div>

            {errors.itinerary && (
              <p className={errorClass}>{errors.itinerary}</p>
            )}

            <div className="space-y-4">
              {form.itinerary.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-navy-950 border border-white/5 rounded-xl p-4 space-y-3 relative group"
                >
                  {form.itinerary.length > 1 && (
                    <button
                      onClick={() => removeItineraryStep(index)}
                      className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Day</label>
                      <input
                        type="text"
                        value={step.day}
                        onChange={(e) =>
                          updateItineraryStep(index, "day", e.target.value)
                        }
                        placeholder="Day 1"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Location</label>
                      <input
                        type="text"
                        value={step.location}
                        onChange={(e) =>
                          updateItineraryStep(
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="Manali"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) =>
                        updateItineraryStep(index, "title", e.target.value)
                      }
                      placeholder="Basecamp Acclimatization"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={2}
                      value={step.description}
                      onChange={(e) =>
                        updateItineraryStep(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Arrival and briefing..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar */}
        <div className="space-y-6">
          {/* Inclusions Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-teal-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Inclusions
                </h2>
              </div>
              <button
                onClick={addInclusion}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg text-xs font-bold hover:bg-teal-500/20 transition-colors border border-teal-500/20"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            {errors.inclusions && (
              <p className={errorClass}>{errors.inclusions}</p>
            )}

            <div className="space-y-2">
              {form.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inclusion}
                    onChange={(e) => updateInclusion(index, e.target.value)}
                    placeholder="e.g. Premium Basecamp Stays"
                    className={`${inputClass} text-xs`}
                  />
                  {form.inclusions.length > 1 && (
                    <button
                      onClick={() => removeInclusion(index)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Included Trip IDs Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-teal-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Included Trip IDs
                </h2>
              </div>
              <button
                onClick={addTripId}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg text-xs font-bold hover:bg-teal-500/20 transition-colors border border-teal-500/20"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="space-y-2">
              {form.includedTripIds.map((tripId, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tripId}
                    onChange={(e) => updateTripId(index, e.target.value)}
                    placeholder="trip-id-1"
                    className={`${inputClass} text-xs font-mono`}
                  />
                  {form.includedTripIds.length > 1 && (
                    <button
                      onClick={() => removeTripId(index)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Status Card */}
          <div className="bg-navy-900 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-teal-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Publish Status
              </h2>
            </div>

            <div className="space-y-2">
              {["Draft", "Published", "Archived"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateField("status", status)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                    form.status === status
                      ? status === "Published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : status === "Draft"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                      : "bg-navy-950 text-slate-400 border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      form.status === status
                        ? status === "Published"
                          ? "bg-emerald-400"
                          : status === "Draft"
                          ? "bg-amber-400"
                          : "bg-red-400"
                        : "bg-slate-600"
                    }`}
                  />
                  {status}
                  {status === "Published" && (
                    <span className="ml-auto text-[10px] text-slate-500 font-normal">
                      Visible to public
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

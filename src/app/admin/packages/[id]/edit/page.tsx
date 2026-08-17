"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import AdminPackageForm, { PackageFormData } from "@/components/admin/AdminPackageForm";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { Toaster } from "react-hot-toast";

interface EditPackagePageProps {
  params: Promise<{ id: string }>;
}

export default function EditPackagePage({ params }: EditPackagePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<PackageFormData | null>(null);

  useEffect(() => {
    async function loadPackage() {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        const res = await fetch(`/api/admin/packages/${id}`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Package not found");
          }
          const errData = await res.json();
          throw new Error(errData.error || "Failed to load package");
        }

        const data = await res.json();

        // Safely parse JSON fields
        let parsedItinerary = [{ day: "Day 1", title: "", description: "", location: "" }];
        try {
          if (Array.isArray(data.itinerary)) {
            parsedItinerary = data.itinerary;
          } else if (typeof data.itinerary === "string") {
            parsedItinerary = JSON.parse(data.itinerary);
          }
        } catch {
          console.warn("Failed to parse itinerary JSON, using fallback");
        }

        let parsedInclusions = [""];
        try {
          if (Array.isArray(data.inclusions)) {
            parsedInclusions = data.inclusions;
          } else if (typeof data.inclusions === "string") {
            parsedInclusions = JSON.parse(data.inclusions);
          }
        } catch {
          console.warn("Failed to parse inclusions JSON, using fallback");
        }

        let parsedTripIds = [""];
        try {
          if (Array.isArray(data.includedTripIds)) {
            parsedTripIds = data.includedTripIds;
          } else if (typeof data.includedTripIds === "string") {
            parsedTripIds = JSON.parse(data.includedTripIds);
          }
        } catch {
          console.warn("Failed to parse includedTripIds JSON, using fallback");
        }

        setPackageData({
          id: data.id,
          name: data.name || "",
          tagline: data.tagline || "",
          description: data.description || "",
          tierBadge: data.tierBadge || "",
          bundlePrice: data.bundlePrice ?? "",
          duration: data.duration || "",
          maxSeats: data.maxSeats ?? "",
          filledSeats: data.filledSeats ?? 0,
          imageUrl: data.imageUrl || "",
          videoUrl: data.videoUrl || "",
          status: data.status || "Draft",
          itinerary: parsedItinerary.length > 0 ? parsedItinerary : [{ day: "Day 1", title: "", description: "", location: "" }],
          inclusions: parsedInclusions.length > 0 ? parsedInclusions : [""],
          includedTripIds: parsedTripIds.length > 0 ? parsedTripIds : [""],
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error loading package";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPackage();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-teal-400" />
        <p className="text-sm text-slate-400">Loading package details...</p>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-navy-900 border border-white/5 rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Failed to Load Package</h2>
        <p className="text-sm text-slate-400 mb-6">{error || "The requested package could not be found."}</p>
        <button
          onClick={() => router.push("/admin/packages")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-800 text-white rounded-xl text-sm font-semibold hover:bg-navy-700 transition-colors border border-white/5"
        >
          <ArrowLeft size={16} /> Back to Packages
        </button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AdminPackageForm mode="edit" initialData={packageData} />
    </>
  );
}

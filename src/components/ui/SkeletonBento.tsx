import React from "react";

export function SkeletonCard({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";
  const shimmerClass = isDark ? "skeleton-shimmer-dark" : "skeleton-shimmer";

  return (
    <div
      className={`p-6 md:p-8 rounded-[1.75rem] border ${
        isDark
          ? "bg-[#150408] border-[#F7B538]/10"
          : "bg-white border-[rgba(255,255,255,0.06)]"
      } space-y-4 ${className}`}
    >
      {/* Top Tag Skeleton */}
      <div className="flex items-center justify-between">
        <div className={`w-24 h-5 rounded-full ${shimmerClass}`} />
        <div className={`w-16 h-5 rounded-full ${shimmerClass}`} />
      </div>

      {/* Main Image / Media Area */}
      <div className={`w-full h-44 rounded-2xl ${shimmerClass}`} />

      {/* Title & Subtitle */}
      <div className="space-y-2 pt-2">
        <div className={`w-3/4 h-6 rounded-lg ${shimmerClass}`} />
        <div className={`w-full h-4 rounded-md ${shimmerClass}`} />
        <div className={`w-2/3 h-4 rounded-md ${shimmerClass}`} />
      </div>

      {/* Footer Price & Button */}
      <div className="flex items-center justify-between pt-4 border-t border-black/5">
        <div className={`w-20 h-7 rounded-lg ${shimmerClass}`} />
        <div className={`w-28 h-9 rounded-full ${shimmerClass}`} />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  variant = "light",
}: {
  count?: number;
  variant?: "light" | "dark";
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
}

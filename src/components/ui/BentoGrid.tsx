import React from "react";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
}

export function BentoGrid({ children, className = "", cols = 3 }: BentoGridProps) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${colClasses[cols]} gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "crimson" | "gold";
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  headerBadge?: string;
  scriptSubtitle?: string;
  onClick?: () => void;
}

export function BentoCard({
  children,
  className = "",
  variant = "light",
  colSpan = 1,
  rowSpan = 1,
  headerBadge,
  scriptSubtitle,
  onClick,
}: BentoCardProps) {
  const variantClass = {
    light: "bento-card bg-white text-slate-800",
    dark: "bento-card bento-card-dark text-white",
    crimson: "bento-card bento-card-crimson text-white",
    gold: "bento-card bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F5E8D3] border-[#F7B538]/40 text-[#150408]",
  }[variant];

  const colSpanClass = {
    1: "",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
  }[colSpan];

  const rowSpanClass = {
    1: "",
    2: "lg:row-span-2",
  }[rowSpan];

  return (
    <div
      onClick={onClick}
      className={`relative p-6 md:p-8 rounded-[1.75rem] flex flex-col justify-between group overflow-hidden ${variantClass} ${colSpanClass} ${rowSpanClass} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Decorative ambient radial reflection */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7B538]/10 rounded-full blur-[70px] pointer-events-none -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />

      {/* Optional Top Badges */}
      {(headerBadge || scriptSubtitle) && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
          {headerBadge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#780116]/10 text-[#780116] border border-[#780116]/20">
              {headerBadge}
            </span>
          )}
          {scriptSubtitle && (
            <span className="font-script text-lg text-[#F7B538] drop-shadow-sm ml-auto">
              {scriptSubtitle}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

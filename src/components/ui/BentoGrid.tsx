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

export type BentoVariant =
  | "lavender"
  | "blush"
  | "sage"
  | "champagne"
  | "gold"
  | "crimson"
  | "white"
  | "sky";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: BentoVariant;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  title?: string;
  description?: string;
  scriptSubtitle?: string;
  headerBadge?: string;
  onClick?: () => void;
}

export function BentoCard({
  children,
  className = "",
  variant = "white",
  colSpan = 1,
  rowSpan = 1,
  title,
  description,
  scriptSubtitle,
  headerBadge,
  onClick,
}: BentoCardProps) {
  const variantClass = {
    lavender: "bento-lavender",
    blush: "bento-blush",
    sage: "bento-sage",
    champagne: "bento-champagne",
    gold: "bento-gold",
    crimson: "bento-crimson",
    white: "bento-white",
    sky: "bento-sky",
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

  const isDark = variant === "crimson";

  return (
    <div
      onClick={onClick}
      className={`bento-card-base ${variantClass} ${colSpanClass} ${rowSpanClass} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Optional Top Badges */}
      {(headerBadge || scriptSubtitle) && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
          {headerBadge && (
            <span
              className={`inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                isDark
                  ? "bg-white/15 text-[#F7B538] border border-[#F7B538]/30"
                  : "bg-white text-[#780116] border border-[#780116]/15 shadow-sm"
              }`}
            >
              {headerBadge}
            </span>
          )}
          {scriptSubtitle && (
            <span
              className={`font-script text-xl ${
                isDark ? "text-[#F7B538]" : "text-[#780116]"
              } ml-auto`}
            >
              {scriptSubtitle}
            </span>
          )}
        </div>
      )}

      {/* Title & Description if provided */}
      {(title || description) && (
        <div className="mb-4 relative z-10">
          {title && (
            <h3
              className={`text-2xl font-extrabold tracking-tight mb-2 ${
                isDark ? "text-white" : "text-[#150408]"
              }`}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={`text-xs md:text-sm leading-relaxed ${
                isDark ? "text-slate-200" : "text-slate-600"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Main Content & Floating Mockups */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

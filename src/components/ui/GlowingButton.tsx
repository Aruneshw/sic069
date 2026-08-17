import React from 'react';
import Link from 'next/link';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'gold' | 'crimson';
  children: React.ReactNode;
}

export default function GlowingButton({
  href,
  className,
  variant = 'gold',
  children,
  ...props
}: GlowingButtonProps) {
  const isCrimson = variant === 'crimson';

  const content = (
    <div className="relative inline-block group w-full sm:w-auto">
      {/* Ambient Glow Backdrop */}
      <div 
        className={`absolute inset-[-2px] rounded-[16px] blur-[12px] opacity-70 pointer-events-none transition-all duration-400 ease-out group-hover:opacity-100 group-hover:scale-[1.03] ${
          isCrimson
            ? "bg-gradient-to-r from-[#780116] to-[#BE1232]"
            : "bg-gradient-to-r from-[#F7B538] to-[#D49018]"
        }`}
        aria-hidden="true"
      />
      {/* Main Button Body */}
      <div 
        className={`relative flex items-center justify-center cursor-pointer font-bold text-[14px] uppercase tracking-wider rounded-[14px] transition-transform duration-200 ease-out hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] w-full h-full shadow-lg ${
          isCrimson
            ? "bg-gradient-to-r from-[#780116] to-[#4A000E] text-white border border-[#F7B538]/30 shadow-[#780116]/30"
            : "bg-gradient-to-r from-[#F7B538] to-[#D49018] text-[#150408] border border-white/40 shadow-[#F7B538]/30"
        } ${className || 'px-[32px] py-[14px]'}`}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block w-full sm:w-auto no-underline" onClick={props.onClick as any}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="inline-block w-full sm:w-auto border-none bg-transparent p-0" {...props}>
      {content}
    </button>
  );
}

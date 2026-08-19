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
        className="absolute inset-[-2px] rounded-[16px] blur-[14px] opacity-50 pointer-events-none transition-all duration-400 ease-out group-hover:opacity-80 group-hover:scale-[1.03]"
        style={{
          background: isCrimson
            ? "linear-gradient(135deg, var(--danger), rgba(248,113,113,0.5))"
            : "linear-gradient(135deg, var(--gold-500), var(--gold-700))",
        }}
        aria-hidden="true"
      />
      {/* Main Button Body */}
      <div 
        className={`relative flex items-center justify-center cursor-pointer font-bold text-[13px] uppercase tracking-wider rounded-[14px] transition-transform duration-200 ease-out hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] w-full h-full ${className || 'px-[32px] py-[14px]'}`}
        style={{
          background: isCrimson
            ? "linear-gradient(135deg, #991B1B, #7F1D1D)"
            : "linear-gradient(135deg, var(--gold-500), var(--gold-700))",
          color: isCrimson ? "var(--text-primary)" : "var(--bg-primary)",
          border: isCrimson
            ? "1px solid rgba(248,113,113,0.25)"
            : "1px solid rgba(200,165,92,0.35)",
          boxShadow: isCrimson
            ? "0 8px 24px rgba(153,27,27,0.30)"
            : "0 8px 24px rgba(200,165,92,0.25)",
          letterSpacing: "0.06em",
        }}
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

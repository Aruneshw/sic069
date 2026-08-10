import React from 'react';
import Link from 'next/link';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function GlowingButton({
  href,
  className,
  children,
  ...props
}: GlowingButtonProps) {
  const content = (
    <div className={`relative inline-block group w-full sm:w-auto`}>
      <div 
        className="absolute inset-[-2px] rounded-[14px] bg-gradient-to-r from-[oklch(0.65_0.26_328)] to-[oklch(0.75_0.15_195)] blur-[14px] opacity-60 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-[1.02] group-focus-within:opacity-100 group-focus-within:scale-[1.02]" 
        aria-hidden="true"
      />
      <div 
        className={`relative flex items-center justify-center cursor-pointer border border-white/12 rounded-[12px] font-semibold text-[15px] text-white bg-[oklch(0.15_0.02_270)] transition-transform duration-200 ease-out hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] w-full h-full ${className || 'px-[34px] py-[16px]'}`}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block w-full sm:w-auto" onClick={props.onClick as any}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="inline-block w-full sm:w-auto" {...props}>
      {content}
    </button>
  );
}

import React from 'react';
import SkeletonGrid from '@/components/ui/SkeletonGrid';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5]">
      <section className="relative pt-40 pb-28 md:pt-48 md:pb-40 px-4 md:px-8">
        <div className="container-main relative z-10 flex flex-col items-center text-center">
          <div className="h-6 w-24 bg-[#F7B538]/15 rounded-full mb-6 animate-pulse"></div>
          <div className="h-12 w-3/4 max-w-lg bg-[#780116]/8 rounded-2xl mb-4 animate-pulse"></div>
          <div className="h-12 w-1/2 max-w-md bg-[#780116]/6 rounded-2xl mb-6 animate-pulse"></div>
          <div className="h-5 w-2/3 max-w-sm bg-slate-200/60 rounded-lg mb-10 animate-pulse"></div>
          <div className="flex gap-4 justify-center">
             <div className="h-12 w-36 bg-[#F7B538]/20 rounded-full animate-pulse"></div>
             <div className="h-12 w-36 bg-[#780116]/12 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="container-main">
          <SkeletonGrid />
        </div>
      </section>
    </div>
  );
}

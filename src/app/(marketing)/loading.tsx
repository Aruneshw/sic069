import React from 'react';
import SkeletonGrid from '@/components/ui/SkeletonGrid';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-40 pb-32 md:pt-48 md:pb-48 bg-slate-900">
        <div className="container-main relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <div className="h-16 w-3/4 bg-white/10 rounded-xl mb-6 mx-auto md:mx-0 animate-pulse"></div>
            <div className="h-16 w-1/2 bg-white/10 rounded-xl mb-6 mx-auto md:mx-0 animate-pulse"></div>
            <div className="h-6 w-2/3 bg-white/10 rounded-md mb-10 mx-auto md:mx-0 animate-pulse"></div>
            <div className="flex gap-4 justify-center md:justify-start">
               <div className="h-14 w-40 bg-white/10 rounded-full animate-pulse"></div>
               <div className="h-14 w-40 bg-white/10 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main">
          <SkeletonGrid />
        </div>
      </section>
    </div>
  );
}

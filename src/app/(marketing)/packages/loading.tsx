import React from 'react';
import SkeletonGrid from '@/components/ui/SkeletonGrid';

export default function Loading() {
  return (
    <div className="container-main pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mb-12">
        <div className="h-8 w-48 bg-slate-200 rounded-md animate-pulse mb-4"></div>
        <div className="h-12 w-3/4 bg-slate-200 rounded-md animate-pulse mb-6"></div>
        <div className="h-6 w-full bg-slate-200 rounded-md animate-pulse"></div>
      </div>
      <SkeletonGrid />
    </div>
  );
}

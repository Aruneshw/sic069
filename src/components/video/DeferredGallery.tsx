"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ImmersiveVideoGallery = dynamic(
  () => import("./ImmersiveVideoGallery"),
  { ssr: false, loading: () => <div className="h-[500px] w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-500">Loading gallery...</div> }
);

export default function DeferredGallery() {
  return <ImmersiveVideoGallery />;
}

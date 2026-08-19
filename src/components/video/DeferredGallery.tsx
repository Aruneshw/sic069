"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ImmersiveVideoGallery = dynamic(
  () => import("./ImmersiveVideoGallery"),
  { loading: () => <div className="h-[500px] w-full bg-slate-950 flex items-center justify-center text-slate-300">Loading gallery...</div> }
);

export default function DeferredGallery() {
  return <ImmersiveVideoGallery />;
}

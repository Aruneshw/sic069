"use client";

import dynamic from "next/dynamic";

const HeroSceneDynamic = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
});

export default function HeroSceneWrapper() {
  return <HeroSceneDynamic />;
}

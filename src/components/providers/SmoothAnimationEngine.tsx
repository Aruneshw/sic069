"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function SmoothAnimationEngine({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins safely on client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Force GSAP to use RAF and high-performance ticker
      gsap.ticker.lagSmoothing(1000, 16);
      
      // Global smooth scroll trigger refresh
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });

      // Hardware accelerate elements with data-speed or data-gsap
      const gpuElements = document.querySelectorAll("[data-gsap-gpu]");
      gpuElements.forEach((el) => {
        gsap.set(el, { force3D: true, backfaceVisibility: "hidden" });
      });
    }
  }, []);

  return <>{children}</>;
}

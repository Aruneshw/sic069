"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  stagger?: number;
  yOffset?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  yOffset = 50,
}: ScrollRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;

      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: direction === "up" ? yOffset : direction === "down" ? -yOffset : 0,
          x: direction === "left" ? yOffset : direction === "right" ? -yOffset : 0,
        },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}

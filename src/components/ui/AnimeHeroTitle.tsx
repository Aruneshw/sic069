'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimeHeroTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimeHeroTitle({ children, className = '' }: AnimeHeroTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use anime.js with GPU-accelerated transforms for silk-smooth hero entrance
    anime.timeline({ loop: false })
      .add({
        targets: containerRef.current.querySelectorAll('.anime-word'),
        scale: [2.5, 1],
        translateY: [20, 0],
        opacity: [0, 1],
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
        duration: 900,
        delay: anime.stagger(120)
      })
      .add({
        targets: containerRef.current.querySelectorAll('.anime-underline'),
        width: ['0%', '100%'],
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
        duration: 600,
        offset: '-=400'
      });
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

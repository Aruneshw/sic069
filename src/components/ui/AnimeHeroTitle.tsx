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

    // Use anime.js to create a staggering, scaling entrance animation for the hero title
    anime.timeline({ loop: false })
      .add({
        targets: containerRef.current.querySelectorAll('.anime-word'),
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: anime.stagger(200)
      })
      .add({
        targets: containerRef.current.querySelectorAll('.anime-underline'),
        width: ['0%', '100%'],
        easing: "easeInOutQuad",
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

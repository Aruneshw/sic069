'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface RunningLettersProps {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export default function RunningLetters({ 
  text, 
  className = '', 
  delay = 0,
  as: Component = 'h1' 
}: RunningLettersProps) {
  const textRef = useRef<HTMLElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!textRef.current || hasRun) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasRun(true);
          
          anime.timeline({ loop: false })
            .add({
              targets: textRef.current?.querySelectorAll('.letter'),
              opacity: [0, 1],
              translateY: [20, 0],
              translateZ: 0,
              easing: "easeOutExpo",
              duration: 800,
              delay: anime.stagger(30, { start: delay })
            });
            
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [hasRun, delay]);

  // Split text into words, then words into letters, preserving spaces
  const words = text.split(' ');

  return (
    <Component ref={textRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="letter inline-block opacity-0"
            >
              {char}
            </span>
          ))}
          {/* Add a non-breaking space after each word except the last one */}
          {wordIndex !== words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}

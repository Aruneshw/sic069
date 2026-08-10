import React from 'react';
import './WaveDivider.css';

interface WaveDividerProps {
  className?: string;
}

export default function WaveDivider({ className = '' }: WaveDividerProps) {
  return (
    <>
      <div className={`wave-divider-container wave-divider-back ${className}`} aria-hidden="true">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" focusable="false">
          <path d="M0,80 C240,112 420,44 720,74 C1020,104 1200,42 1440,80 C1680,112 1860,44 2160,74 C2460,104 2640,42 2880,80 L2880,120 L0,120 Z" />
        </svg>
      </div>
      <div className={`wave-divider-container wave-divider-front ${className}`} aria-hidden="true">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" focusable="false">
          <path d="M0,62 C180,20 360,104 720,62 C1080,20 1260,104 1440,62 C1620,20 1800,104 2160,62 C2520,20 2700,104 2880,62 L2880,120 L0,120 Z" />
        </svg>
      </div>
    </>
  );
}

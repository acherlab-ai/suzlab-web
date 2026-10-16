import React from 'react';

interface SuzLabLogoProps {
  className?: string;
  size?: number;
}

export const SuzLabLogo: React.FC<SuzLabLogoProps> = ({ className = 'w-7 h-7', size }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="suzlabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="suzlabInnerGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      
      {/* Outer Hexagonal Shield */}
      <path
        d="M16 3 L27.5 9.5 L27.5 22.5 L16 29 L4.5 22.5 L4.5 9.5 Z"
        stroke="url(#suzlabGrad)"
        strokeWidth="1.75"
        strokeLinejoin="round"
        className="opacity-95"
      />
      
      {/* Inner Lab Core & Coordinate Rays */}
      <path
        d="M16 8.5 L22.5 12.25 L22.5 19.75 L16 23.5 L9.5 19.75 L9.5 12.25 Z"
        fill="url(#suzlabInnerGrad)"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Center Quantum / Prism Node */}
      <circle cx="16" cy="16" r="2.2" fill="#ffffff" />
      
      {/* Precision Node Crosshairs */}
      <line x1="16" y1="3" x2="16" y2="8.5" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="16" y1="23.5" x2="16" y2="29" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="4.5" y1="16" x2="9.5" y2="16" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 1" />
      <line x1="22.5" y1="16" x2="27.5" y2="16" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 1" />
    </svg>
  );
};

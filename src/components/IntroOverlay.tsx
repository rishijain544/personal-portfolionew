import React, { useState, useEffect } from 'react';

type Phase = 'idle' | 'entering' | 'exiting' | 'done';

export const IntroOverlay: React.FC = () => {
  const [phase, setPhase] = useState<Phase>(() => {
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('rj_portfolio_intro_seen')) {
        return 'done';
      }
    } catch (e) {
      // ignore storage errors
    }
    return 'idle';
  });

  useEffect(() => {
    if (phase === 'done') return;

    // Trigger entrance phase
    setPhase('entering');

    // Phase 2: Start exit transition after 600ms
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 600);

    // Hard completion: Remove completely at 1100ms
    const doneTimer = setTimeout(() => {
      setPhase('done');
      try {
        sessionStorage.setItem('rj_portfolio_intro_seen', 'true');
      } catch (e) {
        // ignore
      }
    }, 1100);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // When phase is done, completely remove from DOM
  if (phase === 'done') return null;

  const isExiting = phase === 'exiting';

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden pointer-events-none select-none transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-105 blur-sm' : 'opacity-100 scale-100 blur-none'
      }`}
    >
      {/* Circuit Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF6A00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Central Circuit & Monogram Stage */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        
        {/* SVG Connecting Circuit Lines & Snap Nodes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Dotted Circuit Orbit */}
          <circle
            cx="160"
            cy="160"
            r="110"
            stroke="#FF6A00"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.35"
            className="transition-opacity duration-500"
          />

          {/* Connecting Circuit Line 1 (Top Right) */}
          <path
            d="M160 110 L160 50 L195 50"
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={phase === 'entering' || phase === 'exiting' ? '0' : '100'}
            className="transition-all duration-500 ease-in-out"
          />
          <circle cx="195" cy="50" r="3.5" fill="#FF6A00" />

          {/* Connecting Circuit Line 2 (Bottom Right) */}
          <path
            d="M195 195 L245 245 L270 245"
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="120"
            strokeDashoffset={phase === 'entering' || phase === 'exiting' ? '0' : '120'}
            className="transition-all duration-500 ease-in-out"
          />
          <circle cx="270" cy="245" r="3.5" fill="#FF6A00" />

          {/* Connecting Circuit Line 3 (Bottom Left) */}
          <path
            d="M125 195 L75 245 L50 245"
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="120"
            strokeDashoffset={phase === 'entering' || phase === 'exiting' ? '0' : '120'}
            className="transition-all duration-500 ease-in-out"
          />
          <circle cx="50" cy="245" r="3.5" fill="#FF6A00" />

          {/* Connecting Circuit Line 4 (Top Left) */}
          <path
            d="M125 125 L70 70 L50 70"
            stroke="#FF6A00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="120"
            strokeDashoffset={phase === 'entering' || phase === 'exiting' ? '0' : '120'}
            className="transition-all duration-500 ease-in-out"
          />
          <circle cx="50" cy="70" r="3.5" fill="#FF6A00" />
        </svg>

        {/* Central Logo Monogram Badge */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            phase === 'entering' || phase === 'exiting'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-[#1A1A1A] border-2 border-[#FF6A00] shadow-[0_0_35px_rgba(255,106,0,0.4)]">
            <img
              src="/rj-logo.svg"
              alt="Rishi Jain Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>

          {/* Subtitle Label */}
          <div className="mt-3 flex items-center gap-1.5 font-mono text-xs font-bold text-[#FF6A00] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-ping" />
            <span>Rishi Jain</span>
          </div>
        </div>

      </div>
    </div>
  );
};

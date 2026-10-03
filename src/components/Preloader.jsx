import React, { useEffect, useState } from 'react';
import { useContent } from '../data/contentContext';
import { Sparkles, Camera } from 'lucide-react';

export default function Preloader({ onLoaded }) {
  const { siteConfig } = useContent();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Disable background scrolling while preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds smooth cinematic ramp

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsComplete(true);
            document.body.style.overflow = originalOverflow;
            if (onLoaded) onLoaded();
          }, 700); // fade out duration
        }, 200);
      }
    }, 25);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onLoaded]);

  if (isComplete) return null;

  const getStatusText = (val) => {
    if (val < 25) return "INITIALIZING CINEMA OPTICS...";
    if (val < 55) return "LOADING SACRED HEIRLOOM FRAMES...";
    if (val < 85) return "CALIBRATING 3D PERSPECTIVE...";
    if (val < 100) return "PERFECTING GOLDEN FRAMES...";
    return "WELCOME TO NS PHOTOGRAPHY";
  };

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsComplete(true);
      document.body.style.overflow = '';
      if (onLoaded) onLoaded();
    }, 400);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[250] bg-[#050507] flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-out select-none ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      title="Click anywhere to skip"
    >
      {/* Deep Luxury Ambient Golden Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#d4af37]/8 blur-[160px] pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Animated Camera Aperture Rings & Logo Centerpiece */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
          
          {/* Ring 1: Outermost slow-spinning notched aperture ring */}
          <div
            className="absolute inset-0 rounded-full border border-[#d4af37]/30 border-dashed animate-spin"
            style={{ animationDuration: '22s' }}
          />

          {/* Ring 2: Reverse rotating gold ticks ring */}
          <div
            className="absolute inset-2 rounded-full border border-white/10"
            style={{
              animation: 'spinReverse 14s linear infinite',
            }}
          />

          {/* Ring 3: Aperture F-Stop markers */}
          <div className="absolute inset-4 rounded-full border border-[#d4af37]/20 flex items-center justify-between px-1 text-[8px] font-mono text-[#d4af37]/60 pointer-events-none">
            <span>f/1.2</span>
            <span>f/1.4</span>
            <span>f/2.8</span>
            <span>f/4.0</span>
          </div>

          {/* Ring 4: Pulsing gold aperture ring */}
          <div className="absolute inset-5 rounded-full border-2 border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] animate-pulse" />

          {/* Central Logo Container with Golden Bezel */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#d4af37] via-[#aa820a] to-[#f5e297] shadow-[0_0_40px_rgba(212,175,55,0.35)] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
              <img
                src={siteConfig.brand.logoImage || '/assets/images/brand/ns-official-logo-hd.jpg'}
                alt="NS Photography Logo"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle gold specular sheen sweep */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                style={{
                  animation: 'shimmerSweep 2.5s infinite linear',
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[10px] font-mono tracking-widest text-[#d4af37] uppercase mb-1">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>CINEMATIC ARCHIVES</span>
          </div>
          <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.25em] text-white">
            {siteConfig.brand.name || "NS PHOTOGRAPHY"}
          </h1>
          <p className="text-[10px] font-mono tracking-widest text-[#9090a2] uppercase">
            {siteConfig.brand.officialTagline || "CAPTURING REAL STORIES"}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-56 sm:w-64 space-y-2">
          {/* Progress track */}
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] via-[#f7e099] to-[#d4af37] rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Numeric Percentage & Status */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#a0a0b4] pt-1">
            <span className="text-[#88889a] text-[9px] uppercase tracking-wider truncate max-w-[170px]">
              {getStatusText(progress)}
            </span>
            <span className="text-[#d4af37] font-bold font-mono tracking-wider">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>
        </div>

        {/* Click to skip hint */}
        <div className="mt-8 text-[10px] font-mono text-neutral-600 hover:text-neutral-400 transition-colors uppercase tracking-widest">
          Click anywhere to enter →
        </div>

      </div>
    </div>
  );
}

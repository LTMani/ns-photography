import React from 'react';
import { useContent } from '../data/contentContext';

/**
 * High-performance 2D/CSS 3D fallback for mobile devices or environments without WebGL.
 * Features layered depth, warm golden rim lights, and floating photograph compositions.
 */
export default function HeroFallback() {
  const { siteConfig } = useContent();
  const photos = siteConfig.hero.heroImages || [];

  return (
    <div className="relative w-full h-full min-h-[550px] flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Background Golden Atmospheric Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#d4af37]/20 via-[#b8901a]/10 to-transparent blur-[100px] -z-10" />

      {/* Floating Photo Card - Left Back */}
      {photos[0] && (
        <div
          className="absolute -left-2 sm:left-6 top-1/4 w-36 sm:w-52 h-48 sm:h-68 rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] -rotate-6 transition-transform duration-700 hover:rotate-0 hover:scale-105 pointer-events-auto"
          style={{ transform: 'perspective(800px) rotateY(15deg) rotateZ(-6deg)' }}
        >
          <img
            src={photos[0].url}
            alt={photos[0].alt}
            className="w-full h-full object-cover filter brightness-95 hover:brightness-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-3">
            <span className="text-[10px] text-[#d4af37] font-mono uppercase tracking-wider">
              {photos[0].category}
            </span>
          </div>
        </div>
      )}

      {/* Floating Photo Card - Right Back */}
      {photos[1] && (
        <div
          className="absolute -right-2 sm:right-8 bottom-1/4 w-36 sm:w-52 h-48 sm:h-68 rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] rotate-8 transition-transform duration-700 hover:rotate-0 hover:scale-105 pointer-events-auto"
          style={{ transform: 'perspective(800px) rotateY(-15deg) rotateZ(8deg)' }}
        >
          <img
            src={photos[1].url}
            alt={photos[1].alt}
            className="w-full h-full object-cover filter brightness-95 hover:brightness-105 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-3">
            <span className="text-[10px] text-[#d4af37] font-mono uppercase tracking-wider">
              {photos[1].category}
            </span>
          </div>
        </div>
      )}

      {/* Central Metallic NS Emblem & Lens Ring */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-auto">
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full border-2 border-[#d4af37]/50 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.25)] bg-gradient-to-b from-[#14151b]/90 to-[#070709]/98 backdrop-blur-xl p-3">
          {/* Inner Golden Ring with Aperture Tick Marks */}
          <div className="absolute inset-3 rounded-full border border-dashed border-[#d4af37]/35" />
          <div className="absolute inset-5 rounded-full border border-[#d4af37]/60" />

          {/* Official Brand Logo Image */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden flex items-center justify-center bg-black/60 shadow-inner">
            <img
              src={siteConfig.brand.logoImage || '/assets/images/brand/ns-official-logo-hd.jpg'}
              alt="NS Photography"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        <div className="mt-4 flex flex-col items-center">
          <span className="font-cinzel text-xs tracking-[0.4em] text-[#d4af37] font-bold uppercase">
            NS PHOTOGRAPHY
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#8a8a9c] uppercase mt-0.5">
            CAPTURING TIMELESS MEMORIES
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useContent } from '../data/contentContext';
import ThreeDHero from './ThreeDHero';
import HeroFallback from './HeroFallback';
import ShowreelModal from './ShowreelModal';
import { Play, ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const { siteConfig } = useContent();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [forceFallback, setForceFallback] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const { hero } = siteConfig;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 md:px-16 overflow-hidden bg-gradient-to-b from-[#070709] via-[#090a0e] to-[#070709]"
    >
      {/* 3D WebGL Scene on Desktop OR Layered Fallback on Mobile/Non-WebGL */}
      {!isMobile && !forceFallback ? (
        <ThreeDHero onFallbackRequired={() => setForceFallback(true)} />
      ) : (
        <div className="absolute inset-0 z-0">
          <HeroFallback />
        </div>
      )}

      {/* Atmospheric Top Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#d4af37]/12 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Hero Badge */}
      <div className="relative z-20 flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-black/60 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#d4af37] uppercase">
            {hero.badge || "CINEMATIC INDIAN STORYTELLING"}
          </span>
        </div>
      </div>

      {/* Main Grid: LEFT / CENTER / RIGHT Composition */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
        {/* LEFT COLUMN: Small Statement Typography */}
        <div className="hidden md:flex md:col-span-3 flex-col items-start text-left space-y-4">
          <div className="w-8 h-[2px] bg-[#d4af37]" />
          <p className="font-cinzel text-lg sm:text-xl font-medium tracking-[0.2em] leading-relaxed text-[#c6c6d4] whitespace-pre-line">
            {hero.leftSmallText || "PHOTOGRAPHY\nTHAT FEELS\nREAL"}
          </p>
          <p className="text-xs text-[#808092] tracking-wider font-sans leading-relaxed">
            South Indian rituals, timeless emotions, and golden heirloom cinema.
          </p>
        </div>

        {/* CENTER COLUMN: Central 3D camera space */}
        <div className="md:col-span-6 flex flex-col items-center justify-end text-center py-6 sm:py-12 min-h-[380px] pointer-events-none">
          <div className="mt-auto pointer-events-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-[#d4af37]/30 text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
              <span>3D INTERACTIVE CINEMA RIG</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Large Typography + Script Accent + Showreel CTA */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right space-y-4">
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] whitespace-pre-line">
            {hero.rightTitle || "CAPTURING\nREAL\nSTORIES"}
          </h1>

          <div className="font-script text-3xl sm:text-4xl text-[#d4af37] -rotate-2 origin-top-left md:origin-top-right">
            {hero.rightScriptAccent || "Through My Lens"}
          </div>

          <p className="text-xs sm:text-sm text-[#a0a0b2] max-w-xs leading-relaxed font-sans">
            {hero.supportingText || "Moments, people and emotions captured in timeless frames."}
          </p>

          {/* CTA: Watch Showreel */}
          <div className="pt-2">
            <button
              onClick={() => setShowreelOpen(true)}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[#d4af37] border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] transform hover:scale-105"
            >
              <span className="w-7 h-7 rounded-full bg-[#d4af37] group-hover:bg-black text-black group-hover:text-[#d4af37] flex items-center justify-center transition-colors">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              <span>{hero.ctaShowreelText || "WATCH SHOWREEL"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM: Scroll to Explore Indicator */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-8">
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-2 text-[#9a9aa8] hover:text-[#d4af37] transition-colors focus:outline-none"
          aria-label="Scroll down to explore"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium group-hover:tracking-[0.4em] transition-all">
            {hero.ctaExploreText || "SCROLL TO EXPLORE"}
          </span>
          <div className="w-7 h-11 rounded-full border border-white/20 group-hover:border-[#d4af37] flex justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-[#d4af37] animate-bounce" />
          </div>
        </button>
      </div>

      {/* Showreel Video Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        videoUrl={hero.showreelVideoUrl}
        title="NS Photography — Cinema Showreel"
      />
    </section>
  );
}

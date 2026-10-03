import React, { useEffect } from 'react';
import { X, Play, Volume2, Sparkles } from 'lucide-react';

export default function ShowreelModal({ isOpen, onClose, videoUrl, title = "NS Photography Showreel" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl transition-all duration-500">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-black transition-all duration-300"
        aria-label="Close showreel modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video Box Container */}
      <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-[0_0_80px_rgba(212,175,55,0.2)] bg-black">
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Top bar info overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="font-cinzel text-xs tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
              {title}
            </span>
          </div>
          <span className="text-[11px] font-sans text-neutral-400 tracking-wider">
            CINEMATIC SOUTH INDIAN MASTERWORKS
          </span>
        </div>
      </div>
    </div>
  );
}

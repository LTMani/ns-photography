import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function Lightbox({ isOpen, onClose, images = [], currentIndex = 0, onIndexChange }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentImage = images[currentIndex] || images[0];

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || !currentImage) return null;

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    if (onIndexChange) onIndexChange(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    if (onIndexChange) onIndexChange(prevIdx);
  };

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        handleNext(); // swipe left
      } else {
        handlePrev(); // swipe right
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-all duration-300 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Counter & Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 z-30 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        {/* Left: Counter & Title */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-[#d4af37] bg-white/5 border border-[#d4af37]/30 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="hidden sm:inline font-cinzel text-xs tracking-[0.2em] text-white uppercase">
            {currentImage.title || "NS Photography"}
          </span>
        </div>

        {/* Right: Zoom & Close Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-3 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-black transition-all"
            aria-label="Toggle zoom"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-black transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 hover:bg-[#d4af37] border border-white/10 hover:border-[#d4af37] text-white hover:text-black transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/5 hover:bg-[#d4af37] border border-white/10 hover:border-[#d4af37] text-white hover:text-black transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image View */}
      <div className="relative max-w-6xl max-h-[82vh] w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden">
        <img
          src={currentImage.url}
          alt={currentImage.alt || currentImage.title}
          className={`max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 shadow-2xl ${
            isZoomed ? 'scale-150 cursor-grab active:cursor-grabbing' : 'scale-100'
          }`}
        />
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/90 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-cinzel text-base font-bold text-white tracking-wide">
            {currentImage.title}
          </h4>
          {currentImage.caption && (
            <p className="text-xs text-[#a0a0b2] font-sans max-w-xl">
              {currentImage.caption}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#d4af37]">
          {currentImage.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentImage.location}</span>
            </div>
          )}
          {currentImage.category && (
            <span className="px-2.5 py-0.5 rounded-full border border-[#d4af37]/40 uppercase text-[10px]">
              {currentImage.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

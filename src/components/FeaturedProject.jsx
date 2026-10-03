import React, { useState } from 'react';
import { useContent } from '../data/contentContext';
import ImageWithFallback from './ImageWithFallback';
import ShowreelModal from './ShowreelModal';
import { Play, Eye, Sparkles, MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

export default function FeaturedProject({ onOpenLightbox }) {
  const { projectsData } = useContent();
  const currentProject = projectsData[0] || {};
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFilmModal, setShowFilmModal] = useState(false);

  const images = currentProject.gallery || [
    {
      id: "th-main",
      title: currentProject.title,
      url: currentProject.mainImage,
      caption: currentProject.description,
    },
  ];

  const activeImage = images[activeImageIndex] || images[0];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="featured" className="py-28 px-6 sm:px-12 lg:px-20 bg-[#08080a] relative overflow-hidden border-t border-b border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f14]/50 via-transparent to-[#0e0f14]/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                FEATURED CINEMATIC ARCHIVE
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {currentProject.title || "A STORY OF TWO HEARTS"}
            </h2>
            {currentProject.subtitle && (
              <p className="font-serif-luxury italic text-xl text-[#d4af37]">
                {currentProject.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#a0a0b2]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{currentProject.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{currentProject.year}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 text-[#d4af37] uppercase text-[10px]">
              {currentProject.category}
            </span>
          </div>
        </div>

        {/* Main Cinema Viewport Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.9)] group">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <ImageWithFallback
              src={activeImage.url}
              alt={activeImage.title || currentProject.title}
              aspectRatio="aspect-full"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            />

            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

            {/* Top Controls: Prev / Next buttons */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <button
                onClick={prevImage}
                className="p-3 rounded-full bg-black/60 border border-white/20 hover:border-[#d4af37] hover:bg-[#d4af37] text-white hover:text-black transition-all backdrop-blur-md"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="p-3 rounded-full bg-black/60 border border-white/20 hover:border-[#d4af37] hover:bg-[#d4af37] text-white hover:text-black transition-all backdrop-blur-md"
                aria-label="Next image"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Overlay: Title, Description, and Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">
                  FRAME {activeImageIndex + 1} OF {images.length} — {activeImage.title}
                </span>
                <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed">
                  {activeImage.caption || currentProject.description}
                </p>
                {currentProject.highlightQuote && (
                  <p className="hidden sm:block text-xs font-serif-luxury italic text-[#f3e5ab]/80 border-l-2 border-[#d4af37] pl-3 py-0.5">
                    {currentProject.highlightQuote}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (onOpenLightbox) {
                      onOpenLightbox(images, activeImageIndex);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-md border border-white/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW FULL GALLERY</span>
                </button>

                <button
                  onClick={() => setShowFilmModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>WATCH FILM</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Thumbnail Strip */}
          <div className="p-4 sm:p-6 bg-[#090a0d] border-t border-white/10 flex items-center gap-4 overflow-x-auto no-scrollbar">
            {images.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-shrink-0 w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeImageIndex === idx
                    ? 'border-[#d4af37] scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.title || `Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Showreel Modal */}
      <ShowreelModal
        isOpen={showFilmModal}
        onClose={() => setShowFilmModal(false)}
        videoUrl={currentProject.videoShowreelUrl}
        title={`${currentProject.title} — Wedding Cinema`}
      />
    </section>
  );
}

import React, { useState } from 'react';
import { useContent } from '../data/contentContext';
import ImageWithFallback from './ImageWithFallback';
import { Sparkles, Grid, StretchHorizontal, Eye, MapPin } from 'lucide-react';

export default function Gallery({ activeCategory, onSelectCategory, onOpenLightbox }) {
  const { galleryItems } = useContent();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'horizontal'

  const categories = ['ALL', 'WEDDINGS', 'PORTRAITS', 'EVENTS', 'TRAVEL', 'COMMERCIAL'];

  const filteredItems = activeCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter((item) => item.category?.toUpperCase() === activeCategory?.toUpperCase());

  return (
    <section id="gallery" className="py-28 px-6 sm:px-12 lg:px-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                CURATED ARCHIVE
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white">
              GALLERY OF FRAMES
            </h2>
          </div>

          {/* View Mode Toggle: Grid vs Horizontal Strip */}
          <div className="flex items-center gap-2 bg-[#121318] p-1.5 rounded-full border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#d4af37] text-black shadow-lg'
                  : 'text-[#8e8ea2] hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('horizontal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                viewMode === 'horizontal'
                  ? 'bg-[#d4af37] text-black shadow-lg'
                  : 'text-[#8e8ea2] hover:text-white'
              }`}
            >
              <StretchHorizontal className="w-3.5 h-3.5" />
              <span>Cinema Strip</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'bg-[#121318] text-[#a0a0b2] hover:text-white hover:border-[#d4af37]/40 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GALLERY DISPLAY: GRID OR HORIZONTAL CINEMA STRIP */}
        {viewMode === 'grid' ? (
          /* Masonry Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => onOpenLightbox(filteredItems, idx)}
                data-cursor="view"
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 bg-[#0e0f14] transition-all duration-700 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.12)]"
              >
                <div className={`relative w-full overflow-hidden ${
                  item.aspectRatio === 'tall' ? 'aspect-[3/4]' : item.aspectRatio === 'wide' ? 'aspect-[16/10]' : 'aspect-square'
                }`}>
                  <ImageWithFallback
                    src={item.url}
                    alt={item.alt || item.title}
                    aspectRatio="aspect-full"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Gradient Hover Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase bg-black/70 border border-[#d4af37]/30 text-[#d4af37] backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Center Floating View Eye Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/90 text-black flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Text Information */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-gold-gradient transition-colors">
                      {item.title}
                    </h3>
                    {item.location && (
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-[#a0a0b2] font-mono">
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Horizontal Cinema Strip */
          <div className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar scroll-smooth">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => onOpenLightbox(filteredItems, idx)}
                data-cursor="view"
                className="group relative flex-shrink-0 w-80 sm:w-96 rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 bg-[#0e0f14] cursor-pointer transition-all duration-500 hover:scale-102"
              >
                <div className="aspect-[3/4] w-full relative overflow-hidden">
                  <ImageWithFallback
                    src={item.url}
                    alt={item.alt || item.title}
                    aspectRatio="aspect-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-cinzel text-lg font-bold text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a0a0b2] mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

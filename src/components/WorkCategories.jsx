import React from 'react';
import { useContent } from '../data/contentContext';
import ImageWithFallback from './ImageWithFallback';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function WorkCategories({ onSelectCategory }) {
  const { workCategories } = useContent();

  const handleCardClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 px-6 sm:px-12 lg:px-20 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                PORTFOLIO DISCIPLINES
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white">
              OUR WORK
            </h2>
          </div>
          <p className="text-sm text-[#8e8ea2] max-w-md font-sans leading-relaxed">
            Floating physical photograph aesthetics capturing the soul of South Indian heritage, celebrations, and editorial craftsmanship.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workCategories.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.category)}
              data-cursor="explore"
              className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 bg-[#0e0f14] transition-all duration-700 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Card Image with Zoom */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden">
                <ImageWithFallback
                  src={card.image}
                  alt={card.imageAlt || card.title}
                  aspectRatio="aspect-full"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-0.5 filter brightness-95 group-hover:brightness-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-10 flex items-center justify-between w-[calc(100%-40px)]">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 border border-white/10 text-[#d4af37] backdrop-blur-md">
                    {card.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                    {card.count}
                  </span>
                </div>

                {/* Bottom Content & Arrow */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex items-end justify-between">
                  <div className="space-y-1.5 max-w-[85%]">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-gold-gradient transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9e9eb4] font-sans line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Circular Hover Arrow Button */}
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 group-hover:bg-[#d4af37] group-hover:text-black text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 flex-shrink-0 ml-3">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

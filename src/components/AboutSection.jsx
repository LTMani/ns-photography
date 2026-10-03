import React from 'react';
import { useContent } from '../data/contentContext';
import ImageWithFallback from './ImageWithFallback';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

export default function AboutSection() {
  const { siteConfig } = useContent();
  const { about } = siteConfig;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#08080a] overflow-hidden">
      {/* Decorative Golden Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Visual Composition with Large Image & Floating Frames */}
          <div className="lg:col-span-6 relative">
            {/* Main Central Cinematic Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 group">
              <ImageWithFallback
                src={about.image}
                alt={about.imageAlt || "Photographer behind the lens"}
                aspectRatio="aspect-[4/5]"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-cinzel tracking-[0.2em] text-[#d4af37] uppercase">
                    HERITAGE & EMOTION
                  </span>
                  <p className="text-sm font-sans text-neutral-300">
                    Documenting Telugu rituals with deep reverence
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Top-Right Mini Frame */}
            {about.secondaryImage && (
              <div
                className="hidden sm:block absolute -top-8 -right-8 w-44 h-56 rounded-xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl z-20 hover:scale-105 transition-transform duration-500"
                style={{ transform: 'rotate(4deg)' }}
              >
                <ImageWithFallback
                  src={about.secondaryImage}
                  alt="Sacred South Indian moments"
                  aspectRatio="aspect-full"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Floating Bottom-Left Luxury Gold Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 z-20 p-4 rounded-xl bg-[#111216]/90 border border-[#d4af37]/40 backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-cinzel text-xs font-bold text-white tracking-wider">
                  MASTER STORYTELLER
                </p>
                <p className="text-[10px] text-[#a0a0b0] font-sans">
                  Crafting Timeless Heirlooms
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Narrative, Heading, and Stats */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                {about.sectionTag || "ABOUT THE VISION"}
              </span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] whitespace-pre-line">
              {about.heading || "MORE THAN\nPHOTOGRAPHS"}
            </h2>

            {about.scriptSubheading && (
              <p className="font-script text-3xl text-[#d4af37] -mt-4">
                {about.scriptSubheading}
              </p>
            )}

            <p className="text-base sm:text-lg text-[#b8b8cc] leading-relaxed font-sans font-light">
              {about.description ||
                "At NS Photography, we capture emotions, real moments and beautiful stories — turning them into timeless visuals that you'll cherish forever."}
            </p>

            {/* CTA Button */}
            <div>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-gradient-to-r from-transparent hover:from-[#d4af37]/20 to-transparent text-white hover:text-[#d4af37] font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300"
              >
                <span>{about.ctaText || "OUR STORY"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              {about.stats?.map((stat) => (
                <div key={stat.id} className="flex flex-col space-y-1">
                  <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-gold-gradient">
                    {stat.value}
                  </span>
                  <span className="text-xs font-sans text-[#8e8ea2] tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

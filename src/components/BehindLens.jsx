import React from 'react';
import { useContent } from '../data/contentContext';
import ImageWithFallback from './ImageWithFallback';
import InstagramIcon from './icons/InstagramIcon';
import { Sparkles, Camera, ArrowRight } from 'lucide-react';

export default function BehindLens() {
  const { siteConfig, contactData } = useContent();
  const { behindLens } = siteConfig;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="behind-lens" className="py-28 px-6 sm:px-12 lg:px-20 bg-[#070709] relative overflow-hidden border-t border-white/5">
      {/* Golden Ambient Blur */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text narrative & Signature */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                {behindLens.sectionTag || "BEHIND THE LENS"}
              </span>
            </div>

            <h2 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              {behindLens.heading || "HI, I'M NARASIMHA RAO"}
            </h2>

            <p className="font-serif-luxury italic text-xl text-[#d4af37]">
              {behindLens.subheading || "Founder, Principal Photographer & Visual Storyteller"}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#b0b0c4] font-sans font-light leading-relaxed">
              {behindLens.bio?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Gear Strip */}
            {behindLens.gear && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3">
                  PRIMARY ARSENAL
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {behindLens.gear.map((item, gIdx) => (
                    <div key={gIdx} className="p-3 rounded-xl bg-[#0f1015] border border-white/5">
                      <p className="text-xs font-bold text-white font-mono">{item.name}</p>
                      <p className="text-[10px] text-[#8a8a9c]">{item.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Handwritten Signature and CTA */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="font-script text-4xl sm:text-5xl text-[#d4af37] tracking-wider block -rotate-3">
                  {behindLens.signatureText || "Narasimha Rao"}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  FOUNDER & PRINCIPAL ARTIST
                </span>
              </div>


              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 border border-[#E1306C]/40 hover:border-[#E1306C] text-white hover:text-[#f8b500] font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-[0_0_20px_rgba(225,48,108,0.25)]"
                  title="Follow Narasimha Rao on Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                  <span>INSTAGRAM</span>
                  <span className="text-[10px] text-[#E1306C] group-hover:translate-x-0.5 transition-transform">↗</span>
                </a>

                <button
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-semibold text-xs tracking-widest uppercase transition-all"
                >
                  <span>{behindLens.ctaText || "KNOW MORE"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Photographer Portrait Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
              <ImageWithFallback
                src={behindLens.photographerImage}
                alt={behindLens.photographerImageAlt || "NS Lead Photographer"}
                aspectRatio="aspect-[4/5]"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="font-cinzel text-xs text-[#d4af37] tracking-widest uppercase font-semibold">
                    CINEMATIC VISION
                  </span>
                  <p className="text-sm text-neutral-300 font-sans mt-0.5">
                    "Every frame is a prayer to memory."
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Gold Frame Border Offset */}
            <div className="absolute -inset-3 rounded-3xl border border-[#d4af37]/20 pointer-events-none -z-10 translate-x-2 translate-y-2 hidden sm:block" />
          </div>

        </div>
      </div>
    </section>
  );
}

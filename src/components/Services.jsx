import React from 'react';
import { useContent } from '../data/contentContext';
import { Camera, Film, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Services() {
  const { servicesData, contactData } = useContent();

  const iconMap = {
    Camera: Camera,
    Film: Film,
    Sparkles: Sparkles,
    Compass: Compass,
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-28 px-6 sm:px-12 lg:px-20 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-black/60">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#d4af37] uppercase">
              EXPERTISE & DISCIPLINES
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {servicesData.heading || "TURNING MOMENTS INTO TIMELESS ART"}
          </h2>

          <p className="text-sm sm:text-base text-[#a0a0b2] font-sans font-light">
            {servicesData.subheading ||
              "Bespoke photography and visual cinema tailored for discerning families and creative visionaries."}
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.services?.map((svc, idx) => {
            const IconComponent = iconMap[svc.iconName] || Camera;

            return (
              <div
                key={svc.id || idx}
                className="group relative rounded-2xl p-8 bg-[#0f1015] border border-white/10 hover:border-[#d4af37]/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between"
              >
                {/* Top Badge */}
                {svc.badge && (
                  <span className="absolute top-5 right-5 text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
                    {svc.badge}
                  </span>
                )}

                <div>
                  {/* Glowing Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1b1c24] to-[#0e0f14] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-110 group-hover:border-[#d4af37] transition-all duration-300 mb-6 shadow-md">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-gold-gradient transition-colors mb-2">
                    {svc.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-3">
                    {svc.shortDesc}
                  </p>

                  <p className="text-xs text-[#9090a4] font-sans leading-relaxed mb-6">
                    {svc.fullDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-4 border-t border-white/5 mb-6">
                    {svc.deliverables?.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] text-[#b0b0c2]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button for this service */}
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 rounded-xl border border-white/10 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] text-[#c0c0d0] group-hover:text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>INQUIRE NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Package Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#12131a] via-[#1a1712] to-[#12131a] border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-cinzel text-xl font-bold text-white">
              NEED A BESPOKE WEDDING & CINEMA PACKAGE?
            </h4>
            <p className="text-xs text-[#a0a0b2]">
              We customize multi-day wedding coverage, destination shoots, and cinematic teasers to suit your exact timeline.
            </p>
          </div>
          <a
            href={contactData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex-shrink-0"
          >
            DISCUSS WITH NS ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}

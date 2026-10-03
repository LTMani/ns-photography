import React from 'react';
import { useContent } from '../data/contentContext';
import InstagramIcon from './icons/InstagramIcon';
import { ChevronUp, Phone, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  const { siteConfig, contactData, setIsAdminOpen } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Featured', href: '#featured' },
    { name: 'Services', href: '#services' },
    { name: 'Stories', href: '#stories' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#050507] text-[#a0a0b2] pt-20 pb-12 px-6 sm:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border border-[#d4af37]/50 overflow-hidden bg-black/90 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.25)] flex-shrink-0">
                <img
                  src={siteConfig.brand.logoImage || '/assets/images/brand/ns-official-logo-hd.jpg'}
                  alt="NS Photography Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-cinzel font-bold text-lg tracking-[0.2em] text-white">
                  {siteConfig.brand.name}
                </h3>
                <p className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                  {siteConfig.brand.officialTagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#808092] leading-relaxed max-w-sm font-sans font-light">
              Crafting bespoke wedding cinema, authentic rituals, and heirloom visual poetry across Andhra Pradesh, Telangana, and global destinations.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{contactData.primaryPhone}</span>
              </div>
              <span>•</span>
              <a
                href={contactData.googleMapsUrl || "https://www.google.com/maps/place/16%C2%B017'09.0%22N+80%C2%B026'23.7%22E/@16.285836,80.439902,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.285836!4d80.439902?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors cursor-pointer group"
                title="Open Studio Location on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                <span className="underline decoration-transparent group-hover:decoration-[#d4af37] transition-all">
                  {contactData.location || "Andhra Pradesh & Telangana"}
                </span>
              </a>
            </div>

            {/* Official Instagram Profile Link */}
            <div className="pt-2">
              <a
                href={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E1306C]/30 hover:border-[#E1306C] text-[#c0c0d4] hover:text-[#E1306C] text-xs font-mono transition-all group"
                title="Follow NS Photography on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <span>Instagram: {contactData.instagramHandle || "@chinnanerella1982"}</span>
                <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>


          {/* Quick Navigation (Cols 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block mb-4">
              EXPLORE
            </span>
            <ul className="space-y-2">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-xs text-[#8a8a9c] hover:text-[#d4af37] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines & Categories (Cols 9-10) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block mb-4">
              DISCIPLINES
            </span>
            <ul className="space-y-2 text-xs text-[#8a8a9c]">
              <li>Telugu Weddings</li>
              <li>Bridal Heritage</li>
              <li>Pre-Wedding Stories</li>
              <li>Haldi & Celebrations</li>
              <li>4K Cinema Films</li>
              <li>Aerial Drone</li>
            </ul>
          </div>

          {/* Brand Vision Quote (Cols 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs tracking-widest uppercase text-white font-semibold block mb-4">
              PHILOSOPHY
            </span>
            <p className="font-serif-luxury italic text-xs text-[#d4af37]/90 leading-relaxed">
              "We do not merely take photographs. We preserve the sacred fleeting breath of today for tomorrow's remembrance."
            </p>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="mt-4 text-[10px] font-mono tracking-widest uppercase text-[#606070] hover:text-[#d4af37] underline transition-colors block"
            >
              CMS / Admin Portal
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Credits & Back To Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#666678]">
          {/* Left: Copyright & Credits */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {siteConfig.brand.name}. All Rights Reserved.</p>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span className="text-[#8a8a9e]">Built by</span>
              <a
                href="https://rmvswebservices.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4af37] font-semibold hover:underline"
              >
                RMVS WebServices
              </a>
              <span className="text-neutral-700">•</span>
              <span className="text-[#8a8a9e]">Dev:</span>
              <a
                href="https://rmvswebservices.onrender.com/developers/ltmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#d4af37] underline font-medium"
              >
                LTMani
              </a>
            </div>
          </div>

          {/* Right: Instagram, Slogan & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#8a8a9e] hover:text-[#E1306C] transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>@chinnanerella1982</span>
            </a>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span>Moments. People. Places. Stories.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#a0a0b2] hover:text-[#d4af37] transition-colors p-1"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

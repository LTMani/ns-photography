import React, { useState, useEffect } from 'react';
import { useContent } from '../data/contentContext';
import { Menu, X, ArrowUpRight, Settings, Phone } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

export default function Navbar() {
  const { siteConfig, setIsAdminOpen, contactData } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['home', 'about', 'work', 'featured', 'services', 'stories', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'WORK', href: '#work', id: 'work' },
    { name: 'SERVICES', href: '#services', id: 'services' },
    { name: 'STORIES', href: '#stories', id: 'stories' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070709]/85 backdrop-blur-md border-b border-[#222129]/60 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 rounded-full border border-[#d4af37]/50 overflow-hidden bg-black/90 flex items-center justify-center transition-all duration-300 group-hover:border-[#d4af37] group-hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <img
                src={siteConfig.brand.logoImage || '/assets/images/brand/ns-official-logo-hd.jpg'}
                alt="NS Photography Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-sm tracking-[0.25em] text-white group-hover:text-[#d4af37] transition-colors">
                {siteConfig.brand.name}
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#9090a0] uppercase font-sans">
                {siteConfig.brand.officialTagline || 'TIMELESS CINEMA'}
              </span>
            </div>
          </a>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`relative font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 py-1 ${
                  activeSection === link.id
                    ? 'text-[#d4af37] font-semibold'
                    : 'text-[#a6a6b8] hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#d4af37] transition-all" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Admin / Content Manager Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              title="Open Content Manager / Edit Site"
              className="p-2 text-[#9a9aae] hover:text-[#d4af37] hover:bg-white/5 rounded-full transition-all"
              aria-label="Content Manager"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Direct Instagram Link */}
            <a
              href={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#b0b0c4] hover:text-[#E1306C] hover:bg-white/5 rounded-full transition-all"
              title="Instagram @chinnanerella1982"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Direct WhatsApp Call/Chat */}
            <a
              href={`tel:${contactData.primaryPhone}`}
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#b8b8c8] hover:text-[#d4af37] px-3 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/40 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono">{contactData.primaryPhone}</span>
            </a>

            {/* LET'S TALK CTA Button */}
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black hover:opacity-95 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform active:scale-95"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#d4af37] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070709]/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 transition-opacity duration-300">
          <div className="flex flex-col gap-6 text-center">
            <div className="font-cinzel text-lg tracking-[0.3em] text-[#d4af37] mb-4">
              NS PHOTOGRAPHY
            </div>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="font-cinzel text-xl tracking-[0.2em] text-[#e0e0ea] hover:text-[#d4af37] transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4 items-center">
              <a
                href={contactData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-[#25D366] text-black text-center shadow-lg"
              >
                WHATSAPP CHAT
              </a>
              <a
                href={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-center shadow-lg flex items-center justify-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>INSTAGRAM PROFILE</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="flex items-center gap-2 text-xs text-[#a0a0b0] hover:text-[#d4af37]"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Manage Site Content</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

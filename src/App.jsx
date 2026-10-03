import React, { useEffect, useState } from 'react';
import { ContentProvider, useContent } from './data/contentContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import WorkCategories from './components/WorkCategories';
import FeaturedProject from './components/FeaturedProject';
import Gallery from './components/Gallery';
import Services from './components/Services';
import BehindLens from './components/BehindLens';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Lightbox from './components/Lightbox';
import AdminContentManager from './components/AdminContentManager';
import Preloader from './components/Preloader';
import Lenis from 'lenis';

function MainApp() {
  const { setIsAdminOpen } = useContent();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    // Check if URL has /admin or #admin
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, [setIsAdminOpen]);

  const handleOpenLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#e2e2e8] selection:bg-[#d4af37]/30 selection:text-white">
      {/* Brand Logo Preloader & Entrance Animation */}
      <Preloader onLoaded={() => setIsAppLoaded(true)} />

      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section with 3D Metallic NS Logo & Parallax */}
      <Hero />

      {/* About Section & Floating Frames */}
      <AboutSection />

      {/* Work Disciplines Floating Cards */}
      <WorkCategories onSelectCategory={(cat) => setActiveCategory(cat)} />

      {/* Featured Cinematic Project: A Story of Two Hearts */}
      <FeaturedProject onOpenLightbox={handleOpenLightbox} />

      {/* Filterable Curated Gallery with Grid & Cinema Strip */}
      <Gallery
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Services & Deliverables */}
      <Services />

      {/* Behind The Lens Story & Signature */}
      <BehindLens />

      {/* Contact Section & WhatsApp Inquiry */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Full-Screen Interactive Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />

      {/* Internal Content Manager / CMS Panel */}
      <AdminContentManager />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainApp />
    </ContentProvider>
  );
}

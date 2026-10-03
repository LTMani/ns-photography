/**
 * Centralized Site Configuration
 * All global brand texts, hero settings, about metrics, and visual parameters.
 */
export const initialSiteConfig = {
  brand: {
    name: "NS PHOTOGRAPHY",
    shortName: "NS",
    subText: "PHOTOGRAPHY",
    tagline: "CAPTURING REAL STORIES THROUGH MY LENS",
    subTagline: "Moments. People. Places. Stories.",
    officialTagline: "CAPTURING TIMELESS MEMORIES",
    logoImage: "/assets/images/brand/ns-official-logo-hd.jpg",
    foundedYear: "2019",
  },
  hero: {
    badge: "CINEMATIC INDIAN STORYTELLING",
    leftSmallText: "PHOTOGRAPHY\nTHAT FEELS\nREAL",
    centerTitle: "NS",
    centerSubtitle: "PHOTOGRAPHY",
    rightTitle: "CAPTURING\nREAL\nSTORIES",
    rightScriptAccent: "Through My Lens",
    supportingText: "Moments, people and sacred emotions captured in timeless, cinematic frames across South India & beyond.",
    ctaShowreelText: "WATCH SHOWREEL",
    ctaExploreText: "SCROLL TO EXPLORE",
    showreelVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-indian-bride-dressed-for-her-wedding-48419-large.mp4",
    heroImages: [
      {
        id: "hero-1",
        title: "South Indian Bride & Sacred Gold",
        category: "Weddings",
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
        alt: "South Indian traditional bride with gold jewelry and silk saree",
      },
      {
        id: "hero-2",
        title: "Royal Telugu Groom",
        category: "Groom Portrait",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        alt: "Indian groom in traditional sherwani and kanduva",
      },
      {
        id: "hero-3",
        title: "Talambralu Emotion",
        category: "Rituals",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
        alt: "Emotional South Indian wedding moment",
      },
      {
        id: "hero-4",
        title: "Deccan Temple Sunset",
        category: "Travel",
        url: "https://images.unsplash.com/photo-1600100397608-f010f443b749?auto=format&fit=crop&w=1200&q=80",
        alt: "South Indian heritage temple architecture",
      },
    ],
  },
  about: {
    sectionTag: "ABOUT THE VISION",
    heading: "MORE THAN\nPHOTOGRAPHS",
    scriptSubheading: "A canvas of raw devotion & love",
    description: "At NS Photography, we capture emotions, real moments and beautiful stories — turning them into timeless visuals that you'll cherish forever. Rooted in the rich cultural tapestry of South Indian traditions, we blend documentary intimacy with grand cinematic art.",
    ctaText: "OUR STORY",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cinematic portrait of photographer with professional camera",
    secondaryImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    stats: [
      { id: "stat-1", value: "5+", label: "Years Experience", numeric: 5 },
      { id: "stat-2", value: "500+", label: "Happy Clients", numeric: 500 },
      { id: "stat-3", value: "1000+", label: "Memorable Moments", numeric: 1000 },
      { id: "stat-4", value: "50+", label: "Destination Weddings", numeric: 50 },
    ],
  },
  behindLens: {
    sectionTag: "BEHIND THE LENS",
    heading: "HI, I'M NARASIMHA RAO",
    subheading: "Founder, Principal Photographer & Visual Storyteller",
    bio: [
      "I am Narasimha Rao, founder and lead artist behind NS Photography. For over half a decade, I have dedicated my craft to documenting the sacred emotions, rituals, and unforgettable milestones of South Indian families.",
      "In South Indian and Telugu weddings, every ritual carries profound spiritual depth — from the auspicious Jeelakarra Bellam on the crown to the joyous showers of golden Talambralu pearls. My philosophy is to stay attentive to the real, unscripted glances that make each family's story truly unique.",
      "Whether shooting in the sacred temple halls of Andhra Pradesh, heritage palaces in Hyderabad, or destination celebrations worldwide, I bring cinematic light, artistic precision, and deep cultural reverence to every frame."
    ],
    photographerImage: "/assets/images/about/narasimharao-photographer.jpg",
    photographerImageAlt: "Narasimha Rao - Founder & Lead Photographer, NS Photography",
    signatureText: "Narasimha Rao",
    ctaText: "GET IN TOUCH",
    gear: [
      { name: "Sony FX3 & Alpha 1", role: "Primary 4K Cinema & Stills" },
      { name: "G-Master F/1.2 & F/1.4", role: "Dreamlike Depth of Field" },
      { name: "DJI Mavic 3 Pro", role: "Aerial Perspectives" },
      { name: "Profoto B10X Lights", role: "Subtle Golden Lighting" },
    ],
  },

};

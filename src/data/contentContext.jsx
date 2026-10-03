import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSiteConfig } from './siteConfig';
import { initialGalleryItems, initialWorkCategories } from './galleryData';
import { initialProjectsData } from './projectsData';
import { initialServicesData } from './servicesData';
import { initialBlogData } from './blogData';
import { initialContactData } from './contactData';

const STORAGE_KEY = 'ns_photography_content_v1';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  // Load saved content or fallback to defaults
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_site`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.brand) {
          parsed.brand.logoImage = '/assets/images/brand/ns-official-logo-hd.jpg';
        }

        if (parsed.behindLens) {
          parsed.behindLens.heading = "HI, I'M NARASIMHA RAO";
          parsed.behindLens.photographerImage = "/assets/images/about/narasimharao-photographer.jpg";
          parsed.behindLens.signatureText = "Narasimha Rao";
        }
        return parsed;
      }

      return initialSiteConfig;
    } catch {
      return initialSiteConfig;
    }
  });


  const [galleryItems, setGalleryItems] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      return saved ? JSON.parse(saved) : initialGalleryItems;
    } catch {
      return initialGalleryItems;
    }
  });

  const [workCategories, setWorkCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
      return saved ? JSON.parse(saved) : initialWorkCategories;
    } catch {
      return initialWorkCategories;
    }
  });

  const [projectsData, setProjectsData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : initialProjectsData;
    } catch {
      return initialProjectsData;
    }
  });

  const [servicesData, setServicesData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
      return saved ? JSON.parse(saved) : initialServicesData;
    } catch {
      return initialServicesData;
    }
  });

  const [blogData, setBlogData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_blog`);
      return saved ? JSON.parse(saved) : initialBlogData;
    } catch {
      return initialBlogData;
    }
  });

  const [contactData, setContactData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_contact`);
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.googleMapsUrl = initialContactData.googleMapsUrl;
        parsed.instagramUrl = initialContactData.instagramUrl;
        parsed.instagramHandle = initialContactData.instagramHandle;
        if (Array.isArray(parsed.socials)) {
          const ig = parsed.socials.find((s) => s.name?.toLowerCase() === 'instagram');
          if (ig) {
            ig.url = initialContactData.instagramUrl;
            ig.handle = initialContactData.instagramHandle;
          }
        }
        return parsed;
      }
      return initialContactData;
    } catch {
      return initialContactData;
    }
  });


  // Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_site`, JSON.stringify(siteConfig));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(galleryItems));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(workCategories));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [workCategories]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projectsData));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [projectsData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(servicesData));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [servicesData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_blog`, JSON.stringify(blogData));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [blogData]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_contact`, JSON.stringify(contactData));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [contactData]);

  // Reset function
  const resetToDefaults = () => {
    setSiteConfig(initialSiteConfig);
    setGalleryItems(initialGalleryItems);
    setWorkCategories(initialWorkCategories);
    setProjectsData(initialProjectsData);
    setServicesData(initialServicesData);
    setBlogData(initialBlogData);
    setContactData(initialContactData);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_site`);
      localStorage.removeItem(`${STORAGE_KEY}_gallery`);
      localStorage.removeItem(`${STORAGE_KEY}_categories`);
      localStorage.removeItem(`${STORAGE_KEY}_projects`);
      localStorage.removeItem(`${STORAGE_KEY}_services`);
      localStorage.removeItem(`${STORAGE_KEY}_blog`);
      localStorage.removeItem(`${STORAGE_KEY}_contact`);
    } catch (e) {
      console.warn("Reset error", e);
    }
  };

  // Export JSON
  const exportDataAsJson = () => {
    const backup = {
      siteConfig,
      galleryItems,
      workCategories,
      projectsData,
      servicesData,
      blogData,
      contactData,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ns-photography-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const importDataFromJson = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteConfig) setSiteConfig(data.siteConfig);
      if (data.galleryItems) setGalleryItems(data.galleryItems);
      if (data.workCategories) setWorkCategories(data.workCategories);
      if (data.projectsData) setProjectsData(data.projectsData);
      if (data.servicesData) setServicesData(data.servicesData);
      if (data.blogData) setBlogData(data.blogData);
      if (data.contactData) setContactData(data.contactData);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        siteConfig,
        setSiteConfig,
        galleryItems,
        setGalleryItems,
        workCategories,
        setWorkCategories,
        projectsData,
        setProjectsData,
        servicesData,
        setServicesData,
        blogData,
        setBlogData,
        contactData,
        setContactData,
        isAdminOpen,
        setIsAdminOpen,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}

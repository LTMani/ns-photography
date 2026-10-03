import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSiteConfig } from './siteConfig';
import { initialGalleryItems, initialWorkCategories } from './galleryData';
import { initialProjectsData } from './projectsData';
import { initialServicesData } from './servicesData';
import { initialBlogData } from './blogData';
import { initialContactData } from './contactData';
import {
  fetchLiveContentFromCloud,
  saveLiveContentToCloud,
  getFirebaseConfig,
} from '../lib/firebase';

const STORAGE_KEY = 'ns_photography_content_v1';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  // Load saved content or fallback to defaults without destructive overwrites
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_site`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialSiteConfig,
          ...parsed,
          brand: {
            ...initialSiteConfig.brand,
            ...parsed.brand,
            logoImage: parsed.brand?.logoImage || initialSiteConfig.brand.logoImage,
          },
          hero: {
            ...initialSiteConfig.hero,
            ...parsed.hero,
          },
          about: {
            ...initialSiteConfig.about,
            ...parsed.about,
          },
          behindLens: {
            ...initialSiteConfig.behindLens,
            ...parsed.behindLens,
            heading: parsed.behindLens?.heading || initialSiteConfig.behindLens.heading,
            photographerImage: parsed.behindLens?.photographerImage || initialSiteConfig.behindLens.photographerImage,
            signatureText: parsed.behindLens?.signatureText || initialSiteConfig.behindLens.signatureText,
          },
        };
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
        return {
          ...initialContactData,
          ...parsed,
          googleMapsUrl: parsed.googleMapsUrl || initialContactData.googleMapsUrl,
          instagramUrl: parsed.instagramUrl || initialContactData.instagramUrl,
          instagramHandle: parsed.instagramHandle || initialContactData.instagramHandle,
        };
      }
      return initialContactData;
    } catch {
      return initialContactData;
    }
  });

  // Storage status tracker
  const [storageStatus, setStorageStatus] = useState({
    state: 'saved', // 'saved' | 'saving' | 'error'
    lastSaved: Date.now(),
    errorMessage: '',
  });

  const safeSave = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setStorageStatus({ state: 'saved', lastSaved: Date.now(), errorMessage: '' });
      return true;
    } catch (e) {
      console.warn("Storage error for", key, e);
      let msg = "Storage error occurred while saving.";
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        msg = "Browser storage limit reached! Please use online image URLs (Unsplash/Imgur) instead of large base64 data.";
      }
      setStorageStatus({ state: 'error', lastSaved: Date.now(), errorMessage: msg });
      return false;
    }
  };

  // Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCloudConnected, setIsCloudConnected] = useState(!!getFirebaseConfig());

  // Attempt to load live data from Firestore on mount
  useEffect(() => {
    async function loadCloudData() {
      const cloudData = await fetchLiveContentFromCloud();
      if (cloudData) {
        setIsCloudConnected(true);
        if (cloudData.siteConfig) setSiteConfig(cloudData.siteConfig);
        if (cloudData.galleryItems) setGalleryItems(cloudData.galleryItems);
        if (cloudData.workCategories) setWorkCategories(cloudData.workCategories);
        if (cloudData.servicesData) setServicesData(cloudData.servicesData);
        if (cloudData.contactData) setContactData(cloudData.contactData);
      }
    }
    loadCloudData();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    safeSave(`${STORAGE_KEY}_site`, siteConfig);
  }, [siteConfig]);

  useEffect(() => {
    safeSave(`${STORAGE_KEY}_gallery`, galleryItems);
  }, [galleryItems]);

  useEffect(() => {
    safeSave(`${STORAGE_KEY}_categories`, workCategories);
  }, [workCategories]);

  useEffect(() => {
    safeSave(`${STORAGE_KEY}_projects`, projectsData);
  }, [projectsData]);

  useEffect(() => {
    safeSave(`${STORAGE_KEY}_services`, servicesData);
  }, [servicesData]);

  useEffect(() => {
    safeSave(`${STORAGE_KEY}_blog`, blogData);
  }, [blogData]);

  useEffect(() => {
    safeSave(`${STORAGE_KEY}_contact`, contactData);
  }, [contactData]);

  const saveAllChanges = async () => {
    try {
      safeSave(`${STORAGE_KEY}_site`, siteConfig);
      safeSave(`${STORAGE_KEY}_gallery`, galleryItems);
      safeSave(`${STORAGE_KEY}_categories`, workCategories);
      safeSave(`${STORAGE_KEY}_projects`, projectsData);
      safeSave(`${STORAGE_KEY}_services`, servicesData);
      safeSave(`${STORAGE_KEY}_contact`, contactData);

      // Save to Cloud Firestore if connected
      let cloudResult = null;
      if (getFirebaseConfig()) {
        cloudResult = await saveLiveContentToCloud({
          siteConfig,
          galleryItems,
          workCategories,
          servicesData,
          contactData,
        });
      }

      return {
        success: true,
        cloudSaved: cloudResult ? cloudResult.success : false,
        cloudError: cloudResult && !cloudResult.success ? cloudResult.error : null,
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

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
        storageStatus,
        saveAllChanges,
        isCloudConnected,
        setIsCloudConnected,
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

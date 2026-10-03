import React, { useState } from 'react';
import { useContent } from '../data/contentContext';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit2,
  Check,
  Sparkles,
  Phone,
  Layers,
  FileText,
  Sliders,
  LogOut,
  Key,
  Shield,
  ShieldCheck,
  Lock,
  AlertCircle,
  CheckCircle2,
  Cloud,
  Database,
  Globe,
  RefreshCw,
} from 'lucide-react';
import AdminLogin, {
  SESSION_STORAGE_KEY,
  getStoredCredentials,
  saveCredentials,
} from './AdminLogin';
import {
  getFirebaseConfig,
  saveFirebaseConfig,
  saveLiveContentToCloud,
} from '../lib/firebase';

export default function AdminContentManager() {
  const {
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
    storageStatus,
    saveAllChanges,
    isCloudConnected,
    setIsCloudConnected,
    isAdminOpen,
    setIsAdminOpen,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
  } = useContent();

  const [saveToast, setSaveToast] = useState('');
  const [cloudStatus, setCloudStatus] = useState({ type: '', message: '' });
  const [firebaseForm, setFirebaseForm] = useState(() => {
    const existing = getFirebaseConfig();
    return {
      apiKey: existing?.apiKey || '',
      projectId: existing?.projectId || '',
      authDomain: existing?.authDomain || '',
      storageBucket: existing?.storageBucket || '',
      appId: existing?.appId || '',
    };
  });

  const handleManualSave = async () => {
    setSaveToast('Saving changes...');
    const res = await saveAllChanges();
    if (res && res.success) {
      if (res.cloudSaved) {
        setSaveToast('Saved to browser storage & Synced LIVE to Cloud Firestore ☁️✓');
      } else {
        setSaveToast('Saved to browser storage ✓ (Connect Cloud Sync to update mobile/worldwide)');
      }
      setTimeout(() => setSaveToast(''), 3500);
    } else {
      setSaveToast(`Save warning: ${res?.error || 'Failed to save'}`);
      setTimeout(() => setSaveToast(''), 4000);
    }
  };

  const handleSaveFirebaseConfig = async (e) => {
    e.preventDefault();
    setCloudStatus({ type: '', message: '' });
    if (!firebaseForm.apiKey || !firebaseForm.projectId) {
      setCloudStatus({ type: 'error', message: 'API Key and Project ID are required.' });
      return;
    }

    const saved = saveFirebaseConfig({
      apiKey: firebaseForm.apiKey.trim(),
      projectId: firebaseForm.projectId.trim(),
      authDomain: firebaseForm.authDomain.trim() || `${firebaseForm.projectId.trim()}.firebaseapp.com`,
      storageBucket: firebaseForm.storageBucket.trim() || `${firebaseForm.projectId.trim()}.appspot.com`,
      appId: firebaseForm.appId.trim(),
    });

    if (saved) {
      setIsCloudConnected(true);
      setCloudStatus({ type: 'success', message: 'Testing connection and uploading live content to Cloud Firestore...' });
      
      const syncRes = await saveLiveContentToCloud({
        siteConfig,
        galleryItems,
        workCategories,
        servicesData,
        contactData,
      });

      if (syncRes.success) {
        setCloudStatus({ type: 'success', message: 'Firebase Firestore connected & synced successfully! All devices now load live content. 🚀' });
      } else {
        setCloudStatus({ type: 'error', message: `Connected, but initial sync failed: ${syncRes.error}` });
      }
    } else {
      setCloudStatus({ type: 'error', message: 'Failed to save Firebase configuration to browser.' });
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return (
        sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true' ||
        localStorage.getItem(SESSION_STORAGE_KEY) === 'true'
      );
    } catch {
      return false;
    }
  });

  const [passwordForm, setPasswordForm] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });

  const [activeTab, setActiveTab] = useState('hero');
  const [importStatus, setImportStatus] = useState('');
  const [newGalleryPhoto, setNewGalleryPhoto] = useState({
    title: '',
    category: 'WEDDINGS',
    url: '',
    location: '',
    caption: '',
    aspectRatio: 'square',
  });

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.warn('Logout error', e);
    }
    setIsAuthenticated(false);
    setIsAdminOpen(false);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setPasswordStatus({ type: '', message: '' });
    const creds = getStoredCredentials();

    if (passwordForm.currentPassword !== creds.password) {
      setPasswordStatus({ type: 'error', message: 'Current password does not match.' });
      return;
    }

    if (passwordForm.newPassword.length < 4) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 4 characters.' });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    const updated = {
      ...creds,
      username: passwordForm.username.trim() || creds.username,
      password: passwordForm.newPassword.trim(),
    };

    saveCredentials(updated);
    setPasswordStatus({ type: 'success', message: 'Admin ID & Password updated successfully!' });
    setPasswordForm({
      username: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (!isAdminOpen) return null;

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onCancel={() => setIsAdminOpen(false)}
      />
    );
  }

  // Gallery CRUD
  const handleAddGalleryPhoto = (e) => {
    e.preventDefault();
    if (!newGalleryPhoto.url || !newGalleryPhoto.title) return;
    const newItem = {
      ...newGalleryPhoto,
      id: `gal-${Date.now()}`,
    };
    setGalleryItems([newItem, ...galleryItems]);
    setNewGalleryPhoto({
      title: '',
      category: 'WEDDINGS',
      url: '',
      location: '',
      caption: '',
      aspectRatio: 'square',
    });
  };

  const handleDeleteGalleryItem = (id) => {
    setGalleryItems(galleryItems.filter((item) => item.id !== id));
  };

  const handleUpdateGalleryItem = (id, field, value) => {
    setGalleryItems(
      galleryItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Import handler
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importDataFromJson(event.target.result);
      if (res.success) {
        setImportStatus('Configuration imported successfully!');
      } else {
        setImportStatus(`Import failed: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0c0d12] border border-[#d4af37]/40 shadow-[0_0_100px_rgba(212,175,55,0.15)] text-white overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="p-6 bg-[#08090c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel font-bold text-lg text-white">
                  NS PHOTOGRAPHY — CONTENT ARCHITECT
                </h3>
                {isCloudConnected ? (
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                    ☁️ Cloud Sync Active
                  </span>
                ) : storageStatus?.state === 'error' ? (
                  <span className="text-[10px] font-mono text-red-400 bg-red-950/70 border border-red-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ⚠️ Storage Warning
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-green-400 bg-green-950/70 border border-green-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    ● Local Storage
                  </span>
                )}
              </div>
              <p className="text-[10px] font-mono text-[#8a8a9a] uppercase">
                Centralized Live Content & Image Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleManualSave}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c158] text-black font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              title="Save all changes directly to persistent storage"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={exportDataAsJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#d4af37] border border-[#d4af37]/30 transition-all"
              title="Download JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm("Reset all content back to factory defaults?")) {
                  resetToDefaults();
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-xs font-mono text-red-300 border border-red-800/40 transition-all"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-xs font-mono text-white border border-red-700/50 transition-all"
              title="Log out of admin"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Log Out</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-black transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-[#090a0e] border-b border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'hero', label: 'Brand & Hero' },
            { id: 'about', label: 'About & Stats' },
            { id: 'gallery', label: 'Gallery (Add/Edit)' },
            { id: 'categories', label: 'Categories' },
            { id: 'services', label: 'Services' },
            { id: 'contact', label: 'Contact Details' },
            { id: 'cloud', label: 'Cloud Sync ☁️' },
            { id: 'security', label: 'Security & Password 🔒' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#d4af37] text-black font-bold shadow'
                  : 'text-[#8e8ea0] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {saveToast && (
            <div className="p-3.5 rounded-xl bg-green-950/80 border border-green-500/50 text-green-300 text-xs font-mono flex items-center gap-2.5 animate-fade-in shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span>{saveToast}</span>
            </div>
          )}

          {storageStatus?.state === 'error' && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono flex items-center gap-2.5 shadow-lg">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{storageStatus.errorMessage}</span>
            </div>
          )}
          
          {/* TAB: BRAND & HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
                Brand Identity & Hero Texts
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={siteConfig.brand.name}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        brand: { ...siteConfig.brand, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Official Tagline
                  </label>
                  <input
                    type="text"
                    value={siteConfig.brand.officialTagline}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        brand: { ...siteConfig.brand, officialTagline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Hero Right Title
                  </label>
                  <textarea
                    rows={2}
                    value={siteConfig.hero.rightTitle}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        hero: { ...siteConfig.hero, rightTitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Hero Script Accent
                  </label>
                  <input
                    type="text"
                    value={siteConfig.hero.rightScriptAccent}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        hero: { ...siteConfig.hero, rightScriptAccent: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Hero Supporting Description
                </label>
                <textarea
                  rows={2}
                  value={siteConfig.hero.supportingText}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      hero: { ...siteConfig.hero, supportingText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Showreel Video URL (MP4 / WebM)
                </label>
                <input
                  type="text"
                  value={siteConfig.hero.showreelVideoUrl}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      hero: { ...siteConfig.hero, showreelVideoUrl: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                />
              </div>

              {/* 3D Floating Hero Images */}
              <div className="pt-4 border-t border-white/10">
                <h5 className="font-cinzel text-sm font-bold text-white mb-3">
                  3D Hero Floating Photographs (4 Key Planes)
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteConfig.hero.heroImages?.map((img, i) => (
                    <div key={img.id || i} className="p-4 rounded-xl bg-[#08090d] border border-white/10 flex gap-4 items-center">
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-black flex-shrink-0">
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={img.title}
                          onChange={(e) => {
                            const newHeroImages = [...siteConfig.hero.heroImages];
                            newHeroImages[i].title = e.target.value;
                            setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, heroImages: newHeroImages } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs text-white"
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={img.url}
                          onChange={(e) => {
                            const newHeroImages = [...siteConfig.hero.heroImages];
                            newHeroImages[i].url = e.target.value;
                            setSiteConfig({ ...siteConfig, hero: { ...siteConfig.hero, heroImages: newHeroImages } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs text-[#a0a0b2]"
                          placeholder="Image URL"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT & STATS */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
                About Section & Metric Counters
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Heading
                  </label>
                  <textarea
                    rows={2}
                    value={siteConfig.about.heading}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        about: { ...siteConfig.about, heading: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Script Subheading
                  </label>
                  <input
                    type="text"
                    value={siteConfig.about.scriptSubheading}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        about: { ...siteConfig.about, scriptSubheading: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Narrative Description
                </label>
                <textarea
                  rows={3}
                  value={siteConfig.about.description}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      about: { ...siteConfig.about, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Primary Cinematic Image URL
                </label>
                <input
                  type="text"
                  value={siteConfig.about.image}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      about: { ...siteConfig.about, image: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                />
              </div>

              {/* Stats Counters */}
              <div className="pt-4 border-t border-white/10">
                <h5 className="font-cinzel text-sm font-bold text-white mb-3">
                  Statistics Metrics
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {siteConfig.about.stats?.map((stat, sIdx) => (
                    <div key={stat.id || sIdx} className="p-3 rounded-xl bg-[#08090d] border border-white/10 space-y-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...siteConfig.about.stats];
                          newStats[sIdx].value = e.target.value;
                          setSiteConfig({ ...siteConfig, about: { ...siteConfig.about, stats: newStats } });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-sm font-bold text-[#d4af37]"
                        placeholder="Value (e.g. 5+)"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...siteConfig.about.stats];
                          newStats[sIdx].label = e.target.value;
                          setSiteConfig({ ...siteConfig, about: { ...siteConfig.about, stats: newStats } });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs text-[#a0a0b2]"
                        placeholder="Label"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Behind the Lens Profile */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h5 className="font-cinzel text-sm font-bold text-[#d4af37]">
                  Photographer Profile (Behind The Lens)
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                      Photographer Name / Heading
                    </label>
                    <input
                      type="text"
                      value={siteConfig.behindLens?.heading || "HI, I'M NARASIMHA RAO"}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          behindLens: { ...siteConfig.behindLens, heading: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                      Photographer Title / Subheading
                    </label>
                    <input
                      type="text"
                      value={siteConfig.behindLens?.subheading || "Founder, Principal Photographer & Visual Storyteller"}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          behindLens: { ...siteConfig.behindLens, subheading: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Photographer Portrait Photo URL
                  </label>
                  <input
                    type="text"
                    value={siteConfig.behindLens?.photographerImage || "/assets/images/about/narasimharao-photographer.jpg"}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        behindLens: { ...siteConfig.behindLens, photographerImage: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}


          {/* TAB: GALLERY ADD & EDIT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Photo Form */}
              <div className="p-5 rounded-2xl bg-[#08090d] border border-[#d4af37]/30 space-y-4">
                <h4 className="font-cinzel text-sm font-bold text-[#d4af37] flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW PHOTOGRAPH TO GALLERY</span>
                </h4>

                <form onSubmit={handleAddGalleryPhoto} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Photo Title *"
                    required
                    value={newGalleryPhoto.title}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, title: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#111218] border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL *"
                    required
                    value={newGalleryPhoto.url}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, url: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#111218] border border-white/10 text-xs text-white"
                  />
                  <select
                    value={newGalleryPhoto.category}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, category: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#111218] border border-white/10 text-xs text-white"
                  >
                    <option value="WEDDINGS">WEDDINGS</option>
                    <option value="PORTRAITS">PORTRAITS</option>
                    <option value="EVENTS">EVENTS</option>
                    <option value="TRAVEL">TRAVEL</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Location (e.g. Hyderabad)"
                    value={newGalleryPhoto.location}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, location: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#111218] border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Short Caption"
                    value={newGalleryPhoto.caption}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, caption: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-[#111218] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    + ADD PHOTO
                  </button>
                </form>
              </div>

              {/* Gallery Items List */}
              <div className="space-y-3">
                <h4 className="font-cinzel text-sm font-bold text-white">
                  Existing Gallery Items ({galleryItems.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#08090d] border border-white/10 flex gap-3 items-center"
                    >
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-black flex-shrink-0">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateGalleryItem(item.id, 'title', e.target.value)}
                          className="w-full px-2.5 py-1 rounded bg-[#111218] border border-white/5 text-xs text-white"
                        />
                        <div className="flex gap-2">
                          <select
                            value={item.category}
                            onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                            className="px-2 py-1 rounded bg-[#111218] border border-white/5 text-[10px] text-[#d4af37]"
                          >
                            <option value="WEDDINGS">WEDDINGS</option>
                            <option value="PORTRAITS">PORTRAITS</option>
                            <option value="EVENTS">EVENTS</option>
                            <option value="TRAVEL">TRAVEL</option>
                            <option value="COMMERCIAL">COMMERCIAL</option>
                          </select>
                          <input
                            type="text"
                            value={item.location || ''}
                            onChange={(e) => handleUpdateGalleryItem(item.id, 'location', e.target.value)}
                            placeholder="Location"
                            className="flex-1 px-2 py-1 rounded bg-[#111218] border border-white/5 text-[10px] text-neutral-300"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => handleUpdateGalleryItem(item.id, 'url', e.target.value)}
                          className="w-full px-2.5 py-1 rounded bg-[#111218] border border-white/5 text-[10px] text-[#8e8ea2]"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* TAB: CONTACT DETAILS */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
                Official Contact Numbers & WhatsApp
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Primary Phone Number (From Official Card)
                  </label>
                  <input
                    type="text"
                    value={contactData.primaryPhone}
                    onChange={(e) =>
                      setContactData({ ...contactData, primaryPhone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Secondary Phone Number (From Official Card)
                  </label>
                  <input
                    type="text"
                    value={contactData.secondaryPhone}
                    onChange={(e) =>
                      setContactData({ ...contactData, secondaryPhone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Studio Location
                  </label>
                  <input
                    type="text"
                    value={contactData.location}
                    onChange={(e) =>
                      setContactData({ ...contactData, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) =>
                      setContactData({ ...contactData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Google Maps URL (Direct Link to Studio)
                </label>
                <input
                  type="text"
                  value={contactData.googleMapsUrl || "https://www.google.com/maps/place/16%C2%B017'09.0%22N+80%C2%B026'23.7%22E/@16.285836,80.439902,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.285836!4d80.439902?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"}
                  onChange={(e) =>
                    setContactData({ ...contactData, googleMapsUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Official Instagram URL
                </label>
                <input
                  type="text"
                  value={contactData.instagramUrl || "https://www.instagram.com/chinnanerella1982?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="}
                  onChange={(e) => {
                    const newUrl = e.target.value;
                    const updatedSocials = Array.isArray(contactData.socials)
                      ? contactData.socials.map((s) =>
                          s.name?.toLowerCase() === 'instagram' ? { ...s, url: newUrl } : s
                        )
                      : contactData.socials;
                    setContactData({
                      ...contactData,
                      instagramUrl: newUrl,
                      socials: updatedSocials,
                    });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  placeholder="https://www.instagram.com/..."
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#a0a0b2] block mb-1">
                  Instagram Handle / Username
                </label>
                <input
                  type="text"
                  value={contactData.instagramHandle || "@chinnanerella1982"}
                  onChange={(e) =>
                    setContactData({ ...contactData, instagramHandle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090d] border border-white/10 text-white text-sm"
                  placeholder="@yourhandle"
                />
              </div>


              {/* JSON Backup import */}
              <div className="pt-6 border-t border-white/10 space-y-2">
                <label className="text-xs font-mono text-[#d4af37] block">
                  Restore from JSON File
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="text-xs text-[#a0a0b2]"
                />
                {importStatus && (
                  <p className="text-xs text-green-400 mt-1 font-mono">{importStatus}</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
                Services & Deliverables
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicesData.services?.map((svc, i) => (
                  <div key={svc.id || i} className="p-4 rounded-xl bg-[#08090d] border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = [...servicesData.services];
                        updated[i].title = e.target.value;
                        setServicesData({ ...servicesData, services: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs font-bold text-white"
                    />
                    <textarea
                      rows={2}
                      value={svc.fullDesc}
                      onChange={(e) => {
                        const updated = [...servicesData.services];
                        updated[i].fullDesc = e.target.value;
                        setServicesData({ ...servicesData, services: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs text-[#a0a0b2]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <h4 className="font-cinzel text-base font-bold text-[#d4af37]">
                Disciplines / Categories
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workCategories.map((cat, i) => (
                  <div key={cat.id || i} className="p-4 rounded-xl bg-[#08090d] border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const updated = [...workCategories];
                        updated[i].title = e.target.value;
                        setWorkCategories(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={cat.image}
                      onChange={(e) => {
                        const updated = [...workCategories];
                        updated[i].image = e.target.value;
                        setWorkCategories(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#111218] border border-white/10 text-xs text-[#a0a0b2]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CLOUD SYNC */}
          {activeTab === 'cloud' && (
            <div className="max-w-3xl mx-auto space-y-6 py-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                    <span>GLOBAL CLOUD DATABASE SYNCHRONIZATION</span>
                    {isCloudConnected ? (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded-full">
                        NOT CONNECTED
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#8a8a9a] font-sans">
                    Connect Google Firebase Firestore to instantly broadcast every edit made here to all mobile phones & visitors globally.
                  </p>
                </div>
              </div>

              {cloudStatus.message && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-xs font-mono border ${
                    cloudStatus.type === 'success'
                      ? 'bg-green-950/60 border-green-500/40 text-green-300'
                      : 'bg-red-950/60 border-red-500/40 text-red-300'
                  }`}
                >
                  {cloudStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  )}
                  <span>{cloudStatus.message}</span>
                </div>
              )}

              {/* Status explanation card */}
              <div className="p-4 rounded-2xl bg-[#08090d] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#d4af37]">
                  <Database className="w-4 h-4" />
                  <span>How Global Cloud Sync Works</span>
                </div>
                <p className="text-xs text-[#a0a0b2] leading-relaxed">
                  1. When connected, every change you save in this admin panel uploads in real time to your Cloud Firestore database.<br />
                  2. Whenever anyone visits your website on mobile or laptop anywhere in the world, the website automatically loads the latest live photos and details from the cloud!
                </p>
              </div>

              {/* Firebase Credentials Form */}
              <form onSubmit={handleSaveFirebaseConfig} className="p-6 rounded-2xl bg-[#08090d] border border-[#d4af37]/30 space-y-4">
                <h5 className="font-cinzel text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#d4af37]" />
                  <span>Firebase Firestore Credentials</span>
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      Firebase API Key *
                    </label>
                    <input
                      type="text"
                      required
                      value={firebaseForm.apiKey}
                      onChange={(e) => setFirebaseForm({ ...firebaseForm, apiKey: e.target.value })}
                      placeholder="AIzaSy..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f1015] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      Project ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={firebaseForm.projectId}
                      onChange={(e) => setFirebaseForm({ ...firebaseForm, projectId: e.target.value })}
                      placeholder="ns-photography-12345"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f1015] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      Auth Domain
                    </label>
                    <input
                      type="text"
                      value={firebaseForm.authDomain}
                      onChange={(e) => setFirebaseForm({ ...firebaseForm, authDomain: e.target.value })}
                      placeholder="your-project.firebaseapp.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#0f1015] border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      Storage Bucket
                    </label>
                    <input
                      type="text"
                      value={firebaseForm.storageBucket}
                      onChange={(e) => setFirebaseForm({ ...firebaseForm, storageBucket: e.target.value })}
                      placeholder="your-project.appspot.com"
                      className="w-full px-3 py-2 rounded-xl bg-[#0f1015] border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      App ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={firebaseForm.appId}
                      onChange={(e) => setFirebaseForm({ ...firebaseForm, appId: e.target.value })}
                      placeholder="1:123456789:web:abcdef"
                      className="w-full px-3 py-2 rounded-xl bg-[#0f1015] border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>SAVE & CONNECT FIREBASE CLOUD</span>
                  </button>

                  {isCloudConnected && (
                    <button
                      type="button"
                      onClick={async () => {
                        setCloudStatus({ type: '', message: 'Syncing all current site data to Cloud Firestore...' });
                        const res = await saveLiveContentToCloud({
                          siteConfig,
                          galleryItems,
                          workCategories,
                          servicesData,
                          contactData,
                        });
                        if (res.success) {
                          setCloudStatus({ type: 'success', message: 'All website content synced to Cloud Firestore live! 🚀' });
                        } else {
                          setCloudStatus({ type: 'error', message: `Sync failed: ${res.error}` });
                        }
                      }}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
                    >
                      <RefreshCw className="w-4 h-4 text-[#d4af37]" />
                      <span>Sync All To Cloud</span>
                    </button>
                  )}
                </div>
              </form>

              {/* Quick instructions accordion */}
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/10 text-xs text-[#8a8a9a] space-y-2">
                <span className="font-bold text-white block">
                  Quick 2-Minute Setup on Firebase (100% Free):
                </span>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Go to <strong className="text-white">console.firebase.google.com</strong> and click "Add Project" (e.g. <code>ns-photography</code>).</li>
                  <li>In left sidebar, click <strong className="text-white">Build ➔ Firestore Database</strong>, then click "Create database" (Start in test mode).</li>
                  <li>Click Project Settings (Gear icon) ➔ scroll down to "Your apps" ➔ Web app (&lt;/&gt;) ➔ Copy <code>apiKey</code> and <code>projectId</code> and paste above!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white">
                    ADMIN AUTHENTICATION & CREDENTIALS
                  </h4>
                  <p className="text-xs text-[#8a8a9a] font-sans">
                    Update your secret Admin ID and password used to unlock this panel.
                  </p>
                </div>
              </div>

              {passwordStatus.message && (
                <div
                  className={`p-4 rounded-xl flex items-center gap-3 text-xs font-mono border ${
                    passwordStatus.type === 'success'
                      ? 'bg-green-950/60 border-green-500/40 text-green-300'
                      : 'bg-red-950/60 border-red-500/40 text-red-300'
                  }`}
                >
                  {passwordStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  )}
                  <span>{passwordStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-5 bg-[#08090d] p-6 rounded-2xl border border-white/10">
                {/* Current Active ID info */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8a8a9a]">Current Active Admin ID:</span>
                  <span className="text-[#d4af37] font-bold">
                    {getStoredCredentials().username}
                  </span>
                </div>

                {/* New Admin ID (optional change) */}
                <div>
                  <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                    New Admin ID / Username (Leave blank to keep current)
                  </label>
                  <input
                    type="text"
                    value={passwordForm.username}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, username: e.target.value })
                    }
                    placeholder={getStoredCredentials().username}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f1015] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                {/* Current Password */}
                <div>
                  <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f1015] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                {/* New Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                      }
                      placeholder="Min 4 characters"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f1015] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a0a0b2] uppercase mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                      }
                      placeholder="Repeat new password"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0f1015] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8901a] text-black font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    <span>UPDATE ADMIN CREDENTIALS</span>
                  </button>
                </div>
              </form>

              {/* Reset to Factory Credentials option */}
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#8a8a9a]">
                  Need to restore default credentials (admin / nsphotography)?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Restore default admin login credentials (admin / nsphotography)?")) {
                      localStorage.removeItem(AUTH_STORAGE_KEY);
                      setPasswordStatus({ type: 'success', message: 'Restored to default credentials: ID: admin, Password: nsphotography' });
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-[#d4af37] hover:bg-white/5 font-mono text-xs"
                >
                  Reset Login
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Footer in Admin */}
        <div className="p-4 bg-[#08090c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8a8a9a]">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span>Changes persist in your browser across sessions. Click "Export JSON" anytime to back up your custom configuration.</span>
          </div>
          <button
            onClick={() => {
              saveAllChanges();
              setIsAdminOpen(false);
            }}
            className="px-6 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.25)] flex-shrink-0"
          >
            Done Editing
          </button>
        </div>

      </div>
    </div>
  );
}

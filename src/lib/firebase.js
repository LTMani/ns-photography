import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

import defaultFirebaseConfig from './firebaseConfig.json';

export const FIREBASE_CONFIG_KEY = 'ns_firebase_config_v1';

// Default empty config or read from localStorage / Vite env / firebaseConfig.json
export function getFirebaseConfig() {
  try {
    const saved = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse Firebase config', e);
  }

  // Fallback to Vite env variables if set
  if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    };
  }

  // Fallback to firebaseConfig.json
  if (defaultFirebaseConfig && defaultFirebaseConfig.apiKey && defaultFirebaseConfig.projectId) {
    return defaultFirebaseConfig;
  }

  return null;
}

export function saveFirebaseConfig(config) {
  try {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Failed to save Firebase config', e);
    return false;
  }
}

let firebaseApp = null;
let firestoreDb = null;

export function getDb() {
  const config = getFirebaseConfig();
  if (!config) return null;

  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(config);
    } else {
      firebaseApp = getApp();
    }
    firestoreDb = getFirestore(firebaseApp);
    return firestoreDb;
  } catch (err) {
    console.warn('Firebase initialization error', err);
    return null;
  }
}

// Fetch live content from Firestore
export async function fetchLiveContentFromCloud() {
  const db = getDb();
  if (!db) return null;

  try {
    const docRef = doc(db, 'portfolio', 'content');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn('Firestore fetch error', err);
  }
  return null;
}

// Save content to Firestore
export async function saveLiveContentToCloud(payload) {
  const db = getDb();
  if (!db) return { success: false, error: 'Database not connected. Please provide Firebase credentials.' };

  try {
    const docRef = doc(db, 'portfolio', 'content');
    await setDoc(docRef, {
      ...payload,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    return { success: true };
  } catch (err) {
    console.error('Firestore save error', err);
    return { success: false, error: err.message };
  }
}

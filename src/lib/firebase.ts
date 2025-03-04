import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only in browser environment
let analytics = null;

if (typeof window !== 'undefined') {
  try {
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    
    // Enable analytics collection
    setAnalyticsCollectionEnabled(analytics, true);
    
    // Log app_start event
    logEvent(analytics, 'app_start');
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
}

// Analytics event logging helper
export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error('Failed to log analytics event:', error);
    }
  }
};

// Export analytics instance
export const getFirebaseAnalytics = () => analytics;
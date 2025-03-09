import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics';

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID'
] as const;

const missingEnvVars = requiredEnvVars.filter(
  varName => !import.meta.env[varName]
);

if (missingEnvVars.length > 0) {
  console.warn(
    'Missing required Firebase environment variables:',
    missingEnvVars.join(', ')
  );
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only in browser environment and if all config values are present
let analytics = null;

if (typeof window !== 'undefined' && !missingEnvVars.length) {
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
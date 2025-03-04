import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isFullscreen: boolean;
  isOrientationLocked: boolean;
  safeAreaInset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  contentSafeAreaInset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  SettingsButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  initData: string;
  initDataUnsafe: Record<string, any>;
  requestFullscreen: () => void;
  exitFullscreen: () => void;
  version: string;
  isVersionAtLeast: (version: string) => boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const isTelegramWebApp = () => {
  try {
    return !!window.Telegram?.WebApp && !!window.Telegram.WebApp.initData;
  } catch {
    return false;
  }
};

export const useTelegramWebApp = () => {
  if (!isTelegramWebApp()) {
    return null;
  }
  return window.Telegram.WebApp;
};

export const useTelegramBackButton = (shouldShow: boolean) => {
  const webApp = useTelegramWebApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!webApp) return;

    const handleBackClick = () => {
      navigate('/');
    };

    if (shouldShow) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(handleBackClick);
    } else {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(handleBackClick);
    }

    return () => {
      if (webApp) {
        webApp.BackButton.offClick(handleBackClick);
      }
    };
  }, [webApp, shouldShow, navigate]);
};

export const initTelegramWebApp = () => {
  // Only initialize if we're actually in Telegram
  if (!isTelegramWebApp()) {
    return false;
  }

  try {
    const webApp = window.Telegram.WebApp;
    
    // Initialize the web app
    webApp.ready();
    webApp.expand();

    // Show settings button in Telegram menu
    if (webApp.isVersionAtLeast('7.0')) {
      webApp.SettingsButton.show();
      webApp.SettingsButton.onClick(() => {
        window.location.href = '/settings';
      });
    }

    // Request fullscreen mode if supported (Bot API 8.0+) and on mobile devices
    if (webApp.isVersionAtLeast('8.0') && isMobileDevice()) {
      try {
        webApp.requestFullscreen();
      } catch (error) {
        console.debug('Fullscreen mode not supported');
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to initialize Telegram Web App:', error);
    return false;
  }
};

// Helper function to detect mobile devices
function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}
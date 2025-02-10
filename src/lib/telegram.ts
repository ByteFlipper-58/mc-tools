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
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const isTelegramWebApp = () => {
  return !!window.Telegram?.WebApp;
};

export const useTelegramWebApp = () => {
  if (!isTelegramWebApp()) {
    return null;
  }
  return window.Telegram.WebApp;
};

export const initTelegramWebApp = () => {
  if (isTelegramWebApp()) {
    const webApp = window.Telegram.WebApp;
    webApp.ready();
    webApp.expand();

    // Show settings button in Telegram menu
    webApp.SettingsButton.show();
    webApp.SettingsButton.onClick(() => {
      window.location.href = '/settings';
    });

    // Request fullscreen mode
    webApp.requestFullscreen();
  }
};
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

// Define our color palette
export const colors = {
  accent: {
    50: '#8bc34b',
    100: '#84b94a',
    200: '#7daf48',
    300: '#76a447',
    400: '#6f9a45',
    500: '#689044',
    600: '#5c8444',
    700: '#5e8644',
    800: '#618944',
    900: '#638b44',
    950: '#668e44',
  },
  muted: {
    50: '#39503c',
    100: '#34403c',
    200: '#3c4444',
    300: '#4c4747',
  },
  light: {
    50: '#ffffff',
    100: '#f4faef',
    200: '#eaf4de',
    300: '#dfefce',
    400: '#d5e9be',
    500: '#cae4ad',
    600: '#c0de9d',
    700: '#b5d98c',
    800: '#abd37c',
    900: '#a0ce6c',
    950: '#96c85b',
  },
  dark: {
    50: '#000000',
    100: '#0d1207',
    200: '#19230e',
    300: '#263514',
    400: '#33471b',
    500: '#3f5922',
    600: '#4c6a29',
    700: '#587c30',
    800: '#658e37',
    900: '#72a03d',
    950: '#7eb144',
  },
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'auto',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
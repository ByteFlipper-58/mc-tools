import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// We're removing light and auto modes, keeping only dark
export type ThemeMode = 'dark';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

// Updated color palette with darker shades
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
  // Removed light colors
  dark: {
    50: '#000000',
    100: '#080c05',
    200: '#101c0a',
    300: '#19230e',
    400: '#1e2a12',
    500: '#263514',
    600: '#2d3f19',
    700: '#344a1e',
    800: '#3b5423',
    900: '#425f28',
    950: '#4a692d',
  },
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// No longer needed as we only have dark mode
export const getSystemTheme = (): 'dark' => {
  return 'dark';
};
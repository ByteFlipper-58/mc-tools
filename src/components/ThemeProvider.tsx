import React, { useEffect } from 'react';
import { useThemeStore } from '../lib/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useThemeStore();

  useEffect(() => {
    // Always apply dark theme
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }, [mode]);

  return <>{children}</>;
}

export default ThemeProvider;
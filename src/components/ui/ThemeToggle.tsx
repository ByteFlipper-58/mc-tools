import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, ThemeMode } from '../../lib/theme';

function ThemeToggle() {
  const { mode, setMode } = useThemeStore();

  const themes: { value: ThemeMode; icon: React.ReactNode }[] = [
    { value: 'light', icon: <Sun className="w-5 h-5" /> },
    { value: 'dark', icon: <Moon className="w-5 h-5" /> },
    { value: 'auto', icon: <Monitor className="w-5 h-5" /> },
  ];

  const currentIndex = themes.findIndex(t => t.value === mode);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  return (
    <button
      onClick={() => setMode(nextTheme.value)}
      className="p-2 hover:bg-accent-600/20 rounded-lg transition-colors"
      aria-label="Toggle theme"
    >
      {themes.find(t => t.value === mode)?.icon}
    </button>
  );
}

export default ThemeToggle;
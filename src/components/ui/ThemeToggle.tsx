import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, ThemeMode } from '../../lib/theme';

function ThemeToggle() {
  const { mode, setMode } = useThemeStore();

  const themes: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'auto', icon: <Monitor className="w-4 h-4" />, label: 'Auto' },
  ];

  return (
    <div className="flex items-center gap-2 p-2 bg-accent-600/10 rounded-lg">
      {themes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
            mode === value
              ? 'bg-accent-600 text-light-50'
              : 'hover:bg-accent-600/20 text-muted-100 dark:text-light-100'
          }`}
          aria-label={`Switch to ${label} theme`}
        >
          {icon}
          <span className="hidden md:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
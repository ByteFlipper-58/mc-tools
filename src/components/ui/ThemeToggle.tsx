import React from 'react';
import { Moon } from 'lucide-react';

// This component is simplified since we only have dark mode now
function ThemeToggle() {
  return (
    <button
      className="p-2 rounded-lg transition-colors cursor-default"
      aria-label="Dark theme"
    >
      <Moon className="w-5 h-5" />
    </button>
  );
}

export default ThemeToggle;
import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n, languages, Language } from '../../lib/i18n';

function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useI18n();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-accent-600/20 rounded-lg transition-colors flex items-center gap-2"
        aria-label="Toggle language"
      >
        <Globe className="w-5 h-5" />
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div 
        className={`absolute right-0 mt-2 w-40 bg-light-200 dark:bg-dark-300 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform origin-top ${
          isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
        }`}
      >
        {(Object.entries(languages) as [Language, string][]).map(([code, name]) => (
          <button
            key={code}
            onClick={() => {
              setLanguage(code);
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-3 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors ${
              language === code ? 'text-accent-500' : ''
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageToggle;
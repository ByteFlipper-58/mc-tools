import React, { useState } from 'react';
import { Moon, Sun, Monitor, Globe, ChevronDown, Info } from 'lucide-react';
import { useThemeStore, ThemeMode } from '../lib/theme';
import { useI18n, languages, Language } from '../lib/i18n';
import { useTranslation } from '../lib/i18n';

const themes: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
  { value: 'light', icon: <Sun className="w-5 h-5" />, label: 'Light' },
  { value: 'dark', icon: <Moon className="w-5 h-5" />, label: 'Dark' },
  { value: 'auto', icon: <Monitor className="w-5 h-5" />, label: 'System' },
];

function Settings() {
  const { mode, setMode } = useThemeStore();
  const { language, setLanguage } = useI18n();
  const t = useTranslation();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Get current version and environment from import.meta.env
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const environment = import.meta.env.MODE;

  const getCurrentThemeLabel = () => {
    return t.settings.themes[mode];
  };

  const getCurrentLanguageLabel = () => {
    return languages[language];
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 md:pt-0">
      <h1 className="text-3xl font-minecraft mb-8 text-center">
        {t.settings.title}
      </h1>

      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-minecraft mb-6 text-dark-200 dark:text-light-100">
            {t.settings.appearance}
          </h2>
          
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="w-full flex items-center justify-between p-4 bg-light-100 dark:bg-dark-200 rounded-lg hover:bg-light-300 dark:hover:bg-dark-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                {themes.find(t => t.value === mode)?.icon}
                <span className="text-dark-200 dark:text-light-100">{getCurrentThemeLabel()}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isThemeOpen ? 'rotate-180' : ''}`} />
            </button>

            {isThemeOpen && (
              <div className="absolute w-full mt-2 bg-light-100 dark:bg-dark-200 rounded-lg shadow-lg overflow-hidden z-10">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => {
                      setMode(theme.value);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors ${
                      mode === theme.value ? 'text-accent-500' : 'text-dark-200 dark:text-light-100'
                    }`}
                  >
                    {theme.icon}
                    <span>{t.settings.themes[theme.value]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-minecraft mb-6 text-dark-200 dark:text-light-100">
            {t.settings.language}
          </h2>

          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full flex items-center justify-between p-4 bg-light-100 dark:bg-dark-200 rounded-lg hover:bg-light-300 dark:hover:bg-dark-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span className="text-dark-200 dark:text-light-100">{getCurrentLanguageLabel()}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageOpen && (
              <div className="absolute w-full mt-2 bg-light-100 dark:bg-dark-200 rounded-lg shadow-lg overflow-hidden z-10">
                {(Object.entries(languages) as [Language, string][]).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors ${
                      language === code ? 'text-accent-500' : 'text-dark-200 dark:text-light-100'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Version Info */}
        <div className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-accent-500" />
            <div>
              <h2 className="text-xl font-minecraft text-dark-200 dark:text-light-100">
                {t.settings.version}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-100 dark:text-light-300">Version:</span>
                <span className="text-sm font-minecraft text-accent-500">{version}</span>
                <span className="text-sm px-2 py-0.5 rounded-full bg-accent-500 text-light-100 uppercase text-xs">
                  {environment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
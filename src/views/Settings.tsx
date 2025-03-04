import React, { useState } from 'react';
import { Globe, ChevronDown, Info } from 'lucide-react';
import { useI18n, languages, Language } from '../lib/i18n';
import { useTranslation } from '../lib/i18n';

function Settings() {
  const { language, setLanguage } = useI18n();
  const t = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Get current version and environment from import.meta.env
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const environment = import.meta.env.MODE;

  const getCurrentLanguageLabel = () => {
    return languages[language];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-minecraft mb-6 text-light-100">
        {t.settings.title}
      </h1>

      <div className="space-y-6">
        {/* Removed Theme Settings since we only have dark mode now */}

        {/* Language Settings */}
        <div className="bg-dark-300 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-minecraft mb-4 text-light-100">
            {t.settings.language}
          </h2>

          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full flex items-center justify-between p-4 bg-dark-200 rounded-lg hover:bg-dark-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span className="text-light-100">{getCurrentLanguageLabel()}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageOpen && (
              <div className="absolute w-full mt-2 bg-dark-200 rounded-lg shadow-lg overflow-hidden z-10">
                {(Object.entries(languages) as [Language, string][]).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-dark-400 transition-colors ${
                      language === code ? 'text-accent-500' : 'text-light-100'
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
        <div className="bg-dark-300 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-accent-500" />
            <div>
              <h2 className="text-xl font-minecraft text-light-100">
                {t.settings.version}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-light-300">Version:</span>
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
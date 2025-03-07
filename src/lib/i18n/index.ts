import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en from './en';
import ru from './ru';
import pl from './pl';
import pt from './pt';

export const languages = {
  en: 'English',
  ru: 'Русский',
  pl: 'Polski',
  pt: 'Português',
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof en;

const translations = {
  en,
  ru,
  pl,
  pt,
} as const;

// Get browser language and match it to available languages
function detectLanguage(): Language {
  try {
    // Get browser language (e.g., 'en-US' or 'ru-RU')
    const browserLang = navigator.language.toLowerCase();
    
    // Try to match the full language code first
    const fullMatch = Object.keys(languages).find(lang => 
      browserLang === lang.toLowerCase() || 
      browserLang === `${lang.toLowerCase()}-${lang.toLowerCase()}`
    );
    if (fullMatch) return fullMatch as Language;
    
    // Try to match just the language part (e.g., 'en' from 'en-US')
    const langPart = browserLang.split('-')[0];
    const partialMatch = Object.keys(languages).find(lang => 
      langPart === lang.toLowerCase()
    );
    if (partialMatch) return partialMatch as Language;
    
    // Default to English if no match found
    return 'en';
  } catch (error) {
    // Fallback to English if there's any error
    console.warn('Failed to detect language:', error);
    return 'en';
  }
}

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18n = create<I18nStore>()(
  persist(
    (set) => ({
      language: detectLanguage(),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);

export function useTranslation() {
  const { language } = useI18n();
  return translations[language];
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en from './en';
import ru from './ru';

export const languages = {
  en: 'English',
  ru: 'Русский',
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof en;

const translations = {
  en,
  ru,
} as const;

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useI18n = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'en',
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
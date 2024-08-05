import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import ru from './locales/ru.json';

const messages = {
  en,
  ru,
};

const i18n = createI18n({
  locale: 'ru', // Язык по умолчанию
  fallbackLocale: 'en', // Язык, используемый, если перевод отсутствует
  messages,
});

export default i18n;
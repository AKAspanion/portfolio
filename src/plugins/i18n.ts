import { createI18n } from 'vue-i18n';

import en from '@/assets/i18n/en/lang.json';
import hi from '@/assets/i18n/hi/lang.json';
import { initialLocale } from '@/util/preferences';

export type MessageSchema = typeof en;
export type Locale = 'en' | 'hi';
export const locales: Locale[] = ['en', 'hi'];

export default createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: initialLocale(),
  fallbackLocale: 'en',
  messages: { en, hi },
});

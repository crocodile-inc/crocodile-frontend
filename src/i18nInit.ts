import { addLocale, useLocale as localize } from 'ttag';

export type Locale = 'ru' | 'en';
const LOCALE_KEY = '__locale';

export const locales: Locale[] = ['ru', 'en'];

export const getLocale = () => {
  const locale = (localStorage.getItem(LOCALE_KEY) || '') as Locale;
  if (locales.includes(locale)) {
    return locale;
  } else {
    saveLocale('en');
    return 'en';
  }
};

export const saveLocale = (locale: Locale) => {
  localStorage.setItem(LOCALE_KEY, locale);
};

const locale = getLocale();

if (locale !== 'en') {
  const translationsObj = await import(`../i18n/${locale}.po.json`);
  addLocale(locale, { ...translationsObj });
  localize(locale);
  document.documentElement.setAttribute('lang', locale);
}

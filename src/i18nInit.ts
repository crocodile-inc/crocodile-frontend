import { addLocale, useLocale as localize } from 'ttag';
import ruTranslations from '../i18n/ru.po.json';

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

switch (locale) {
  case 'en': {
    localize(locale);
    document.documentElement.setAttribute('lang', locale);
    break;
  }
  case 'ru': {
    addLocale(locale, ruTranslations);
    localize(locale);
    document.documentElement.setAttribute('lang', locale);
    break;
  }
}

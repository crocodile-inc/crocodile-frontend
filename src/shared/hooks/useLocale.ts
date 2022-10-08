import { getLocale, Locale, locales, saveLocale } from '~/i18nInit';
import { MouseEvent } from 'react';

export const useLocale = () => {
  const setLocale = (locale: Locale) => (e: MouseEvent) => {
    e.preventDefault();
    saveLocale(locale);
    window.history.replaceState({}, document.title);
    window.location.reload();
  };

  return { setLocale, getLocale, locales };
};

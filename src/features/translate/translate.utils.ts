import { availableLanguages, LS_KEY } from "./translate.const";
import type { Language } from "./translate.types";

export function getLanguageFromLS(): Language {
  const language = localStorage.getItem(LS_KEY);
  if (!language) {
    // Get browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (availableLanguages.has(browserLanguage as Language)) {
      return browserLanguage as Language;
    }
    return 'fr';
  }
  return 'fr';
}
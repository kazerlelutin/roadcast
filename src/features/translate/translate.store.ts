import { createStore } from "@utils/proxy-sub";
import type { Language, TranslateStore, UiTranslation } from "./translate.types";
import { getLanguageFromLS } from "./translate.utils";
import { UI } from "./translate.const";
import { t } from "./translate";

export const setCurrentLanguage = (language: Language) => {
  translateStore.currentLanguage = language;
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach((element) => {
    const translate: keyof UiTranslation = element.getAttribute('data-translate') ?? '';
    if (typeof translate !== 'undefined') {
      const translation = UI[translate];
      if (translation) {
        (element as HTMLElement).innerText = t(translation);
      }
    }
  });
}

export const translateStore = createStore<TranslateStore>({
  currentLanguage: getLanguageFromLS() || 'fr',
  setCurrentLanguage,
}, {
  notifyOnProps: ['currentLanguage'],
  transformData: (_prop, value) => value
});
export type Language = 'fr' | 'en' | 'ko';

export type Translation = {
  fr: string;
  en?: string;
  ko?: string;
};


export type TranslateStore = {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
};


export type UiTranslation = {
  [key: string]: Translation;
};
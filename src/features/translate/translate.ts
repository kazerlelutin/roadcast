import { translateStore } from "./translate.store";
import type { Translation } from "./translate.types";

export const t = (translations: Translation): string => {
  return translations?.[translateStore.currentLanguage] || translations?.fr || 'Not found';
}


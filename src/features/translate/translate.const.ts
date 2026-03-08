import type { UiTranslation } from "./translate.types";

export const LS_KEY = 'bento_language';
export const availableLanguages = new Set(['fr', 'en', 'ko']);

export const UI: UiTranslation = {
  "home": {
    "fr": "Accueil",
    "en": "Home",
    "ko": "홈"
  },
  "about": {
    "fr": "À propos",
    "en": "About",
    "ko": "정보"
  },
  "cancel": {
    "fr": "Annuler",
    "en": "Cancel",
    "ko": "취소"
  },
  "follow-updates": {
    "fr": "Suivre les mises à jour",
    "en": "Follow updates",
    "ko": "업데이트 팔로우"
  },
  "app-description": {
    "fr": "Anki Speak génère automatiquement des cartes Anki avec voix. Crée des cartes classiques ou des textes à trous (chaque mot devient une carte avec trou automatique). Exporte un ZIP contenant les médias audio et le fichier CSV à importer dans Anki.",
    "en": "Anki Speak automatically generates Anki cards with voice. Creates classic cards or cloze deletion cards (each word becomes a card with automatic gap). Exports a ZIP containing audio media and CSV file to import into Anki.",
    "ko": "Anki Speak는 음성과 함께 Anki 카드를 자동으로 생성합니다. 클래식 카드나 빈칸 채우기 카드(각 단어가 자동 빈칸이 있는 카드가 됨)를 만듭니다. Anki에 가져올 오디오 미디어와 CSV 파일이 포함된 ZIP을 내보냅니다."
  },
  "cloze-checkbox": {
    "fr": "Textes à trous",
    "en": "Cloze deletion",
    "ko": "빈칸 채우기"
  },
  "classic-checkbox": {
    "fr": "Cartes classiques",
    "en": "Classic cards",
    "ko": "클래식 카드"
  },
  "dropzone-description": {
    "fr": "Glissez et déposez votre fichier CSV ici ou cliquez pour charger, ou Ctrl+V pour coller",
    "en": "Drag and drop your CSV file here or click to load, or Ctrl+V to paste",
    "ko": "CSV 파일을 여기로 끌어다 놓거나 클릭하여 불러오세요, 또는 Ctrl+V로 붙여넣기"
  },
  "csv-format": {
    "fr": "Format CSV : langue source, langue cible, tags, infos additionnelles. Séparateur : , ou ;",
    "en": "CSV format: source language, target language, tags, additional info. Separator: , or ;",
    "ko": "CSV 형식: 소스 언어, 대상 언어, 태그, 추가 정보. 구분자: , 또는 ;"
  },
  "anki-link": {
    "fr": "Site officiel d'Anki",
    "en": "Official Anki site",
    "ko": "Anki 공식 사이트"
  }
} as const;

import { describe, it, expect, beforeEach } from 'bun:test';
import { t } from './translate';
import { translateStore } from './translate.store';
import type { Translation } from './translate.types';

describe('translate', () => {
  beforeEach(() => {
    // Reset the store to a known state
    translateStore.currentLanguage = 'fr';
  });

  describe('t function', () => {
    it('should return French translation when current language is French', () => {
      translateStore.currentLanguage = 'fr';
      const translation: Translation = {
        fr: 'Bonjour',
        en: 'Hello',
        ko: '안녕하세요'
      };

      const result = t(translation);
      expect(result).toBe('Bonjour');
    });

    it('should return English translation when current language is English', () => {
      translateStore.currentLanguage = 'en';
      const translation: Translation = {
        fr: 'Bonjour',
        en: 'Hello',
        ko: '안녕하세요'
      };

      const result = t(translation);
      expect(result).toBe('Hello');
    });

    it('should return Korean translation when current language is Korean', () => {
      translateStore.currentLanguage = 'ko';
      const translation: Translation = {
        fr: 'Bonjour',
        en: 'Hello',
        ko: '안녕하세요'
      };

      const result = t(translation);
      expect(result).toBe('안녕하세요');
    });

    it('should fallback to French when current language translation is missing', () => {
      translateStore.currentLanguage = 'en';
      const translation: Translation = {
        fr: 'Bonjour',
        ko: '안녕하세요'
        // Missing 'en'
      };

      const result = t(translation);
      expect(result).toBe('Bonjour');
    });

    it('should fallback to French when Korean translation is missing', () => {
      translateStore.currentLanguage = 'ko';
      const translation: Translation = {
        fr: 'Bonjour',
        en: 'Hello'
        // Missing 'ko'
      };

      const result = t(translation);
      expect(result).toBe('Bonjour');
    });

    it('should fallback to French when current language translation is missing', () => {
      translateStore.currentLanguage = 'en';
      const translation: Translation = {
        fr: 'Bonjour'
        // Missing 'en' and 'ko'
      };

      const result = t(translation);
      expect(result).toBe('Bonjour');
    });

    it('should return empty string for empty French translation', () => {
      translateStore.currentLanguage = 'fr';
      const translation: Translation = {
        fr: ''
      };

      const result = t(translation);
      expect(result).toBe('Not found');
    });

    it('should return "Not found" when French translation is missing', () => {
      translateStore.currentLanguage = 'fr';
      // @ts-ignore
      const translation: Translation = {
        en: 'Hello',
        ko: '안녕하세요'
        // Missing 'fr'
      };

      const result = t(translation);
      expect(result).toBe('Not found');
    });

    it('should handle undefined translation gracefully', () => {
      translateStore.currentLanguage = 'fr';
      const result = t(undefined as any);
      expect(result).toBe('Not found');
    });

    it('should handle null translation gracefully', () => {
      translateStore.currentLanguage = 'fr';
      const result = t(null as any);
      expect(result).toBe('Not found');
    });

    it('should work with minimal translation object', () => {
      translateStore.currentLanguage = 'fr';
      const translation: Translation = {
        fr: 'Test'
      };

      const result = t(translation);
      expect(result).toBe('Test');
    });

    it('should handle all three languages', () => {
      const translation: Translation = {
        fr: 'Français',
        en: 'English',
        ko: '한국어'
      };

      translateStore.currentLanguage = 'fr';
      expect(t(translation)).toBe('Français');

      translateStore.currentLanguage = 'en';
      expect(t(translation)).toBe('English');

      translateStore.currentLanguage = 'ko';
      expect(t(translation)).toBe('한국어');
    });
  });
});

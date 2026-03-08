import { describe, it, expect } from 'bun:test';
import { LS_KEY, availableLanguages } from './translate.const';

describe('translate.utils', () => {
  describe('availableLanguages constant', () => {
    it('should contain all supported languages', () => {
      expect(availableLanguages.has('fr')).toBe(true);
      expect(availableLanguages.has('en')).toBe(true);
      expect(availableLanguages.has('ko')).toBe(true);
    });

    it('should not contain unsupported languages', () => {
      expect(availableLanguages.has('de')).toBe(false);
      expect(availableLanguages.has('es')).toBe(false);
      expect(availableLanguages.has('zh')).toBe(false);
    });

    it('should be a Set', () => {
      expect(availableLanguages).toBeInstanceOf(Set);
    });
  });

  describe('LS_KEY constant', () => {
    it('should have correct localStorage key', () => {
      expect(LS_KEY).toBe('bento_language');
    });

    it('should be a string', () => {
      expect(typeof LS_KEY).toBe('string');
    });
  });

  describe('getLanguageFromLS function', () => {
    it('should be defined', () => {
      const { getLanguageFromLS } = require('./translate.utils');
      expect(typeof getLanguageFromLS).toBe('function');
    });

    it('should return a valid language', () => {
      const { getLanguageFromLS } = require('./translate.utils');
      const result = getLanguageFromLS();
      expect(['fr', 'en', 'ko']).toContain(result);
    });
  });
});
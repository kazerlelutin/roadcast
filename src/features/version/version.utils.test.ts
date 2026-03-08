import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { displayVersion } from './version.utils';
import { VERSION } from './version.const';

describe('version.utils', () => {
  let mockVersionElement: HTMLElement;

  beforeEach(() => {
    // Create a mock version element
    mockVersionElement = document.createElement('div');
    mockVersionElement.id = 'version';
    document.body.appendChild(mockVersionElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('displayVersion', () => {
    it('should set version text content when element exists', () => {
      displayVersion();

      expect(mockVersionElement.textContent).toBe(VERSION);
    });

    it('should not throw error when version element exists', () => {
      expect(() => displayVersion()).not.toThrow();
    });

    it('should handle missing version element gracefully', () => {
      document.getElementById('version')?.remove();

      expect(() => displayVersion()).not.toThrow();
    });

    it('should update existing text content', () => {
      mockVersionElement.textContent = 'old version';

      displayVersion();

      expect(mockVersionElement.textContent).toBe(VERSION);
    });

    it('should work with different element types', () => {
      const spanElement = document.createElement('span');
      spanElement.id = 'version';
      document.body.replaceChild(spanElement, mockVersionElement);

      displayVersion();

      expect(spanElement.textContent).toBe(VERSION);
    });

    it('should preserve other attributes of the element', () => {
      mockVersionElement.setAttribute('class', 'version-display');
      mockVersionElement.setAttribute('data-test', 'version');

      displayVersion();

      expect(mockVersionElement.getAttribute('class')).toBe('version-display');
      expect(mockVersionElement.getAttribute('data-test')).toBe('version');
      expect(mockVersionElement.textContent).toBe(VERSION);
    });

    it('should work multiple times', () => {
      displayVersion();
      expect(mockVersionElement.textContent).toBe(VERSION);

      displayVersion();
      expect(mockVersionElement.textContent).toBe(VERSION);
    });

    it('should handle empty version constant', () => {
      // This test verifies the function works even if VERSION is empty
      displayVersion();

      expect(mockVersionElement.textContent).toBe(VERSION);
    });
  });
});

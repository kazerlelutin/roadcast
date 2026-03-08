import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import aboutCtrl from './about.ctrl';
import { ABOUT_CONTAINER_ID, ABOUT_ITEMS_CONTAINER_ID, ABOUT_ITEM_TEMPLATE_ID, aboutContent } from './about.const';

describe('about.ctrl', () => {
  let mockContainer: HTMLElement;
  let mockItemsContainer: HTMLElement;
  let mockTemplate: HTMLTemplateElement;
  let mockTitle: HTMLHeadingElement;
  let mockActiveFooterLink: any;
  let mockT: any;

  beforeEach(() => {
    // Create mock DOM elements
    mockContainer = document.createElement('div');
    mockContainer.id = ABOUT_CONTAINER_ID;

    mockTitle = document.createElement('h1');
    mockContainer.appendChild(mockTitle);

    mockItemsContainer = document.createElement('div');
    mockItemsContainer.id = ABOUT_ITEMS_CONTAINER_ID;
    mockContainer.appendChild(mockItemsContainer);

    mockTemplate = document.createElement('template');
    mockTemplate.id = ABOUT_ITEM_TEMPLATE_ID;

    // Create template content
    const templateContent = document.createElement('div');
    const itemTitle = document.createElement('h2');
    const itemContent = document.createElement('p');
    const itemLink = document.createElement('a');

    templateContent.appendChild(itemTitle);
    templateContent.appendChild(itemContent);
    templateContent.appendChild(itemLink);
    mockTemplate.content.appendChild(templateContent);

    document.body.appendChild(mockContainer);
    document.body.appendChild(mockTemplate);

    // Mock functions
    mockActiveFooterLink = () => { };
    mockT = (translation: any) => {
      if (typeof translation === 'object' && translation.fr) {
        return translation.fr;
      }
      return translation;
    };

    // Mock modules
    const { mock } = require('bun:test');
    mock.module('@/utils/active-footer-link', () => ({
      activeFooterLink: mockActiveFooterLink
    }));

    mock.module('@/features/translate/translate', () => ({
      t: mockT
    }));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    const { mock } = require('bun:test');
    mock.restore();
  });

  describe('aboutCtrl structure', () => {
    it('should have init function', () => {
      expect(typeof aboutCtrl.init).toBe('function');
    });

    it('should not have cleanUp function', () => {
      expect(aboutCtrl.cleanUp).toBeUndefined();
    });
  });

  describe('init function', () => {
    it('should not throw when called with proper DOM structure', () => {
      expect(() => aboutCtrl.init?.()).not.toThrow();
    });

    it('should set the title text content', () => {
      aboutCtrl.init?.();
      expect(mockTitle.textContent).toBe('À propos');
    });

    it('should populate items container with content', () => {
      aboutCtrl.init?.();
      expect(mockItemsContainer.children.length).toBe(aboutContent.length);
    });

    it('should create items with correct structure', () => {
      aboutCtrl.init?.();

      for (let i = 0; i < aboutContent.length; i++) {
        const item = mockItemsContainer.children[i];
        const title = item.querySelector('h2');
        const content = item.querySelector('p');
        const link = item.querySelector('a');

        expect(title).toBeTruthy();
        expect(content).toBeTruthy();

        expect(title?.textContent).toBe(aboutContent[i].title.fr);
        expect(content?.textContent).toBe(aboutContent[i].content.fr);

        // Link should exist only for items that have links
        if (aboutContent[i].link && aboutContent[i].linkText) {
          expect(link).toBeTruthy();
        } else {
          expect(link).toBeFalsy();
        }
      }
    });

    it('should handle items with links correctly', () => {
      aboutCtrl.init?.();

      // Check first item (has link)
      const firstItem = mockItemsContainer.children[0];
      const firstLink = firstItem.querySelector('a');
      expect(firstLink?.href).toBe('http://bouteiller.contact/');
      expect(firstLink?.textContent).toBe('Me contacter');

      // Check second item (no link)
      const secondItem = mockItemsContainer.children[1];
      const secondLink = secondItem.querySelector('a');
      expect(secondLink).toBeFalsy(); // Should be removed
    });

    it('should throw error when container is not found', () => {
      mockContainer.remove();

      expect(() => aboutCtrl.init?.()).toThrow('Container not found');
    });

    it('should throw error when items container is not found', () => {
      mockItemsContainer.remove();

      expect(() => aboutCtrl.init?.()).toThrow('Items container not found');
    });

    it('should throw error when template is not found', () => {
      mockTemplate.remove();

      expect(() => aboutCtrl.init?.()).toThrow('Template not found');
    });

    it('should handle missing title element gracefully', () => {
      mockTitle.remove();

      expect(() => aboutCtrl.init?.()).not.toThrow();
    });

    it('should handle missing item title element gracefully', () => {
      // Remove h2 from template
      const templateContent = mockTemplate.content.firstElementChild;
      const h2 = templateContent?.querySelector('h2');
      h2?.remove();

      expect(() => aboutCtrl.init?.()).not.toThrow();
    });

    it('should handle missing item content element gracefully', () => {
      // Remove p from template
      const templateContent = mockTemplate.content.firstElementChild;
      const p = templateContent?.querySelector('p');
      p?.remove();

      expect(() => aboutCtrl.init?.()).not.toThrow();
    });

    it('should handle missing item link element gracefully', () => {
      // Remove a from template
      const templateContent = mockTemplate.content.firstElementChild;
      const a = templateContent?.querySelector('a');
      a?.remove();

      expect(() => aboutCtrl.init?.()).not.toThrow();
    });

    it('should work with different translation functions', () => {
      const customT = (translation: any) => {
        if (typeof translation === 'object' && translation.en) {
          return translation.en;
        }
        return translation;
      };

      // Mock the t function to return English
      const { mock } = require('bun:test');
      mock.module('@/features/translate/translate', () => ({
        t: customT
      }));

      aboutCtrl.init?.();

      expect(mockTitle.textContent).toBe('About');

      const firstItem = mockItemsContainer.children[0];
      const title = firstItem.querySelector('h2');
      const content = firstItem.querySelector('p');

      expect(title?.textContent).toBe('Who am I ?');
      expect(content?.textContent).toContain('I am Benoist Bouteiller');
    });

    it('should handle empty aboutContent array', () => {
      // Mock empty content
      const { mock } = require('bun:test');
      mock.module('./about.const', () => ({
        aboutContent: []
      }));

      aboutCtrl.init?.();
      expect(mockItemsContainer.children.length).toBe(0);
    });
  });

  describe('integration', () => {
    it('should be able to call init multiple times', () => {
      expect(() => {
        aboutCtrl.init?.();
        aboutCtrl.init?.();
      }).not.toThrow();
    });

    it('should handle complex DOM structure', () => {
      // Add some extra elements to test robustness
      const extraDiv = document.createElement('div');
      extraDiv.textContent = 'Extra content';
      mockContainer.appendChild(extraDiv);

      expect(() => aboutCtrl.init?.()).not.toThrow();
      expect(mockItemsContainer.children.length).toBe(aboutContent.length);
    });
  });
});

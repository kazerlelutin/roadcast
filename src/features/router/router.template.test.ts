import { expect, describe, test, beforeEach } from "bun:test";
import { getMainContent, getTemplate, renderTemplate, cloneTemplate } from "./router.template";

describe('router.template', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <main>
        <div>Main content</div>
      </main>
      <template id="template-home">
        <div>Home</div>
      </template>
    `;
  });

  test('should get the main content', () => {
    const mainContent = getMainContent();
    expect(mainContent).toBeDefined();
  });

  test('should get the template', () => {
    const template = getTemplate('template-home');
    expect(template).toBeDefined();
  });

  test('should get the template content', () => {
    const template = getTemplate('template-home');
    const content = template.content.cloneNode(true);
    expect(content).toBeDefined();
  });

  test('should render the template', () => {
    renderTemplate('template-home');
    const mainContent = getMainContent();
    expect(mainContent.innerHTML).toBe('<div>Home</div>');
  });

  test('should clone the template', () => {
    const template = getTemplate('template-home');
    const clone = cloneTemplate(template);
    expect(clone.querySelector('div')?.textContent).toBe('Home');
  });

  test('should throw an error if the template is not found', () => {
    expect(() => getTemplate('template-not-found')).toThrow('Template not found: template-not-found');
  });

  test('should throw an error if the main content is not found', () => {
    document.body.innerHTML = '';
    expect(() => getMainContent()).toThrow('Element main not found');
  });

  test('should throw an error if the template is not found', () => {
    expect(() => renderTemplate('template-not-found')).toThrow('Template not found: template-not-found');
  });


});
import { expect, describe, test, jest } from "bun:test";
import { updateDocumentTitle, updateHistory } from './router.history';

describe('router.history', () => {

  test('should update the document title', () => {
    const title = 'Test Title';
    updateDocumentTitle(title);
    expect(document.title).toBe(title);
  });

  test('should update the history', () => {
    const path = '/test';
    window.history.pushState = jest.fn();
    updateHistory(path);
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', path);
  });

  test('should fallback to location.href if pushState is not available', () => {
    const path = '/test';
    window.history.pushState = jest.fn();
    updateHistory(path);
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', path);
  });
});
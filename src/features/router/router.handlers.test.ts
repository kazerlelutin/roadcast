import { describe, test, expect, beforeEach, afterEach, afterAll, jest } from "bun:test";
import { handleRouteChange, handleLinkClick } from "./router.handlers";
import { routerState } from "./router.state";
import * as routerTemplate from "./router.template";

// Mock renderTemplate
const mockRenderTemplate = jest.fn();
jest.spyOn(routerTemplate, 'renderTemplate').mockImplementation(mockRenderTemplate);

describe("router.handlers", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main></main>
      <title></title>
      <template id="test-template">Test content</template>
      <template id="ctrl-template">Ctrl content</template>
      <template id="no-ctrl-template">No ctrl content</template>
    `;
    routerState.currentPage = "/";
    routerState.cleanUp = undefined;
    mockRenderTemplate.mockClear();
  });

  afterEach(() => {
    mockRenderTemplate.mockClear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should update the document title and render the template", () => {
    const route = {
      title: "Test Page",
      templateId: "test-template"
    };
    handleRouteChange(route as any);
    expect(document.title).toBe("Test Page");
    expect(mockRenderTemplate).toHaveBeenCalledWith("test-template");
  });

  test("should call ctrl.init and set cleanUp", () => {
    const ctrl = {
      init: jest.fn(),
      cleanUp: jest.fn()
    };
    const route = {
      title: "With Ctrl",
      templateId: "ctrl-template",
      ctrl
    };
    handleRouteChange(route as any);
    expect(ctrl.init).toHaveBeenCalled();
    expect(routerState.cleanUp).toBe(ctrl.cleanUp);
  });

  test("should handle missing ctrl gracefully", () => {
    const route = {
      title: "No Ctrl",
      templateId: "no-ctrl-template"
    };
    expect(() => handleRouteChange(route as any)).not.toThrow();
    expect(routerState.cleanUp).toBeUndefined();
  });

  test("should update currentPage and pushState on link click", () => {
    const event = {
      preventDefault: jest.fn(),
      currentTarget: {
        getAttribute: () => "/about"
      }
    } as any;
    handleLinkClick(event);
    expect(routerState.currentPage).toBe("/about");
  });

  test("should default to '/' if href is missing", () => {
    const event = {
      preventDefault: jest.fn(),
      currentTarget: {
        getAttribute: () => null
      }
    } as any;
    handleLinkClick(event);
    expect(routerState.currentPage).toBe("/");
  });
}); 
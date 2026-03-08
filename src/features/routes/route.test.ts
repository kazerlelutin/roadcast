import { describe, it, expect } from 'bun:test';
import { routes } from './routes';
import type { Route } from './routes.type';

describe('routes', () => {
  describe('routes Map', () => {
    it('should be a Map', () => {
      expect(routes).toBeInstanceOf(Map);
    });

    it('should contain route definitions', () => {
      expect(routes.size).toBeGreaterThan(0);
    });

    it('should have home route', () => {
      expect(routes.has('/')).toBe(true);
    });

    it('should have about route', () => {
      expect(routes.has('/about')).toBe(true);
    });

    it('should have valid route structure', () => {
      for (const [path, route] of routes.entries()) {
        expect(typeof path).toBe('string');
        expect(typeof route).toBe('object');
        expect(route).toHaveProperty('path');
        expect(route).toHaveProperty('title');
        expect(route).toHaveProperty('templateId');
        expect(typeof route.path).toBe('string');
        expect(typeof route.title).toBe('string');
        expect(typeof route.templateId).toBe('string');
      }
    });

    it('should have correct home route properties', () => {
      const homeRoute = routes.get('/');
      expect(homeRoute).toBeDefined();
      expect(homeRoute?.path).toBe('/');
      expect(homeRoute?.title).toBe('BEN(TO)');
      expect(homeRoute?.templateId).toBe('crafter-template');
      expect(homeRoute?.ctrl).toBeDefined();
    });

    it('should have correct about route properties', () => {
      const aboutRoute = routes.get('/about');
      expect(aboutRoute).toBeDefined();
      expect(aboutRoute?.path).toBe('/about');
      expect(aboutRoute?.title).toBe('À propos');
      expect(aboutRoute?.templateId).toBe('about-template');
      expect(aboutRoute?.ctrl).toBeDefined();
    });

    it('should have unique paths', () => {
      const paths = Array.from(routes.keys());
      const uniquePaths = new Set(paths);
      expect(paths.length).toBe(uniquePaths.size);
    });

    it('should have unique template IDs', () => {
      const templateIds = Array.from(routes.values()).map(route => route.templateId);
      const uniqueTemplateIds = new Set(templateIds);
      expect(templateIds.length).toBe(uniqueTemplateIds.size);
    });

    it('should have non-empty paths', () => {
      for (const path of routes.keys()) {
        expect(path.length).toBeGreaterThan(0);
      }
    });

    it('should have non-empty titles', () => {
      for (const route of routes.values()) {
        expect(route.title.length).toBeGreaterThan(0);
      }
    });

    it('should have non-empty template IDs', () => {
      for (const route of routes.values()) {
        expect(route.templateId.length).toBeGreaterThan(0);
      }
    });

    it('should have controllers with init method', () => {
      for (const route of routes.values()) {
        if (route.ctrl) {
          expect(typeof route.ctrl.init).toBe('function');
        }
      }
    });

    it('should have controllers with cleanUp method when available', () => {
      for (const route of routes.values()) {
        if (route.ctrl && route.ctrl.cleanUp) {
          expect(typeof route.ctrl.cleanUp).toBe('function');
        }
      }
    });
  });

  describe('Route type validation', () => {
    it('should have correct TypeScript types', () => {
      // This test ensures the routes conform to the Route type
      for (const [path, route] of routes.entries()) {
        const typedRoute: Route = route;
        expect(typedRoute.path).toBe(path);
        expect(typeof typedRoute.title).toBe('string');
        expect(typeof typedRoute.templateId).toBe('string');
      }
    });
  });
});

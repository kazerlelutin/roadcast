import type { Route } from "@features/routes/routes.type";
import { routes } from "@features/routes/routes";

export const routerState = new Proxy<{
  currentPage: string;
  cleanUp: undefined | (() => void)
  routes: Map<string, Route>;
  onRouteChange?: (route: Route) => void;
}>(
  {
    currentPage: '/',
    routes,
    onRouteChange: undefined,
    cleanUp: undefined
  },
  {
    get(target, prop) {
      return target[prop as keyof typeof target];
    },
    set(target, prop, value) {

      if (target?.cleanUp) {
        target.cleanUp()
        target.cleanUp = undefined // delete for prevent re-trigger
      }

      if (prop === 'currentPage') {
        const route = target.routes.get(value);
        if (route) {
          target.onRouteChange?.(route);
        }
      }

      target[prop as keyof typeof target] = value;
      return true;
    }
  }
); 
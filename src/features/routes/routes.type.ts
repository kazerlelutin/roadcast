export type Ctrl = {
  init?: () => Promise<void> | void
  cleanUp?: () => Promise<void> | void
}

export interface Route {
  path: string;
  title: string;
  templateId: string;
  ctrl?: Ctrl
}

export type RouteDef = [string, Route]
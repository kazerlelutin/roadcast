export type Listener<T = any> = (data: T) => void;
export type Unsubscribe = () => void;

export interface SubscribableStore<T = any> {
  listeners: Set<Listener<T>>;
  subscribe: (listener: Listener<T>) => Unsubscribe;
  notify: (data: T) => void;
}

export function createSubscribableStore<T = any>(): SubscribableStore<T> {
  return {
    listeners: new Set<Listener<T>>(),

    subscribe(listener: Listener<T>): Unsubscribe {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    },

    notify(data: T) {
      this.listeners.forEach((listener: Listener<T>) => listener(data));
    }
  };
}

export function createStore<T extends object>(
  initialState: T,
  options?: {
    notifyOnProps?: string[];
    transformData?: (prop: string, value: any) => any;
  }
): T & SubscribableStore {
  const subscribableStore = createSubscribableStore();

  const store = {
    ...initialState,
    ...subscribableStore
  };

  return new Proxy(store, {
    get(target, prop) {
      // @ts-ignore
      return target[prop];
    },

    set(target, prop, value) {
      // @ts-ignore
      target[prop] = value;

      if (options?.notifyOnProps?.includes(prop as string)) {
        const data = options?.transformData
          ? options.transformData(prop as string, value)
          : { prop, value };
        target.notify(data);
      }

      return true;
    }
  }) as T & SubscribableStore;
}

export function createProxyWithSub<T extends object>(
  target: T & SubscribableStore,
  options?: {
    notifyOnProps?: string[];
    transformData?: (prop: string, value: any) => any;
  }
): T & SubscribableStore {
  return createStore(target, options) as T & SubscribableStore;

}

export function combineStores<T extends Record<string, SubscribableStore>>(
  stores: T
): {
  subscribe: (listener: (updates: Partial<T>) => void) => Unsubscribe;
} {
  const combinedListeners = new Set<(updates: Partial<T>) => void>();

  Object.entries(stores).forEach(([storeName, store]) => {
    store.subscribe((data) => {
      const update = { [storeName]: data } as Partial<T>;
      combinedListeners.forEach(listener => listener(update));
    });
  });

  return {
    subscribe(listener) {
      combinedListeners.add(listener);
      return () => combinedListeners.delete(listener);
    }
  };
}

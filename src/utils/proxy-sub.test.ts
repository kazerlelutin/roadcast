import { describe, it, expect, vi } from 'bun:test';
import {
  createSubscribableStore,
  createStore,
  createProxyWithSub,
  combineStores
} from './proxy-sub';

describe('createSubscribableStore', () => {
  it('notifies listeners on notify', () => {
    const store = createSubscribableStore<number>();
    const listener = vi.fn();
    store.subscribe(listener);
    store.notify(42);
    expect(listener).toHaveBeenCalledWith(42);
  });

  it('unsubscribe removes the listener', () => {
    const store = createSubscribableStore<number>();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.notify(99);
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('createStore', () => {
  it('notifies only on specified properties', () => {
    const store = createStore({ a: 1, b: 2 }, { notifyOnProps: ['a'] });
    const listener = vi.fn();
    store.subscribe(listener);
    store.a = 10;
    expect(listener).toHaveBeenCalledWith({ prop: 'a', value: 10 });
    listener.mockClear();
    store.b = 20;
    expect(listener).not.toHaveBeenCalled();
  });

  it('applies transformData if provided', () => {
    const store = createStore({ x: 0 }, {
      notifyOnProps: ['x'],
      transformData: (prop, value) => ({ key: prop, val: value * 2 })
    });
    const listener = vi.fn();
    store.subscribe(listener);
    store.x = 5;
    expect(listener).toHaveBeenCalledWith({ key: 'x', val: 10 });
  });
});

describe('createProxyWithSub', () => {
  it('notifies on property change', () => {
    const base = createSubscribableStore<{ foo: string }>();
    const proxy = createProxyWithSub(base, { notifyOnProps: ['foo'] }) as unknown as { foo: string, subscribe: (listener: (data: { prop: string, value: string }) => void) => void };
    const listener = vi.fn();
    proxy.subscribe(listener);
    proxy.foo = 'bar';
    expect(listener).toHaveBeenCalledWith({ prop: 'foo', value: 'bar' });
  });
});

describe('combineStores', () => {
  it('notifies when any store notifies', () => {
    const storeA = createSubscribableStore<string>();
    const storeB = createSubscribableStore<number>();
    const combined = combineStores({ storeA, storeB });
    const listener = vi.fn();
    combined.subscribe(listener);
    storeA.notify('hello');
    expect(listener).toHaveBeenCalledWith({ storeA: 'hello' });
    storeB.notify(123);
    expect(listener).toHaveBeenCalledWith({ storeB: 123 });
  });
});

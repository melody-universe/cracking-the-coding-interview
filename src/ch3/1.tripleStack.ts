import Stack from "./Stack";

export function usingJavaScriptArray<T, U = T, V = U>(
  init?: [
    Iterable<T> | undefined,
    Iterable<U> | undefined,
    Iterable<V> | undefined
  ]
): [StackType<T>, StackType<U>, StackType<V>] {
  const store: Array<T | U | V | undefined> = [];
  const lengths = [0, 0, 0];
  const stacks = Array.from({ length: 3 }, (_, n) => {
    const stack = {
      isEmpty: () => lengths[n] === 0,
      push: (value: any) => {
        const stackLength = ++lengths[n];
        const storeIndex = (stackLength - 1) * 3 + n;
        while (store.length < storeIndex) store.push(undefined);
        if (store.length === storeIndex) {
          store.push(value);
        } else {
          store[storeIndex] = value;
        }
        return stack;
      },
      pop: () => {
        const stackLength = lengths[n]--;
        if (stackLength === 0) {
          throw new RangeError("Tried to pop an empty stack.");
        }
        const value = store[(stackLength - 1) * 3 + n];
        if (lengths.every((length) => length === 0)) {
          store.splice(0);
        } else {
          const newStoreLength =
            Math.max(...lengths.map((length, n) => (length - 1) * 3 + n)) + 1;
          store.splice(newStoreLength);
        }
        return value;
      },
      peek: () => {
        const stackLength = lengths[n];
        if (stackLength === 0) {
          throw new RangeError("Tried to peek an empty stack.");
        }
        return store[(stackLength - 1) * 3 + n];
      },
    };
    return stack;
  }) as unknown as [StackType<T>, StackType<U>, StackType<V>];
  if (init) {
    init.forEach((init, n) => {
      if (init) {
        for (const value of init!) {
          stacks[n].push(value as any);
        }
      }
    });
  }
  return stacks;
}

interface StackType<T> extends Stack<T> {}

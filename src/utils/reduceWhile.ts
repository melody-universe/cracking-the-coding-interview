export default function reduceWhile<T>(
  array: T[],
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => { returnValue: T; continue?: boolean }
): T;
export default function reduceWhile<T>(
  array: T[],
  callbackfn: (
    previousValue: T,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => { returnValue: T; continue?: boolean },
  initialValue: T
): T;
export default function reduceWhile<T, U>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => { returnValue: U; continue?: boolean },
  initialValue: U
): U;

export default function reduceWhile<T, U = T>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => { returnValue: U; continue?: boolean },
  initialValue?: U
) {
  if (array.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  let returnValue: U = initialValue ?? (array[0] as unknown as U);
  (initialValue === undefined ? array.slice(1) : array).every(
    (value, index, array) => {
      const result = callbackfn(returnValue, value, index, array);
      returnValue = result.returnValue;
      return result.continue ?? true;
    }
  );
  return returnValue;
}

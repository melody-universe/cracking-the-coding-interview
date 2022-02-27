import SinglyLinkedList from "./SinglyLinkedList";

/// O(m * n)
export const recursivelySlow: Intersection = (list1, list2) => {
  return (
    findXInY(list1, list2) ??
    (list2.next === null ? null : recursivelySlow(list1, list2.next))
  );
};
const findXInY = <T>(
  x: SinglyLinkedList<T>,
  y: SinglyLinkedList<T>
): SinglyLinkedList<T> | null => {
  if (x === y) {
    return x;
  }
  if (x.next === null) {
    return null;
  }
  return findXInY(x.next, y);
};

/// O(m + n), but consumes additional memory to maintain the Set structures
export const recursivelyFast: Intersection = (list1, list2) =>
  recursivelyFastInternal(list1, list2);
const recursivelyFastInternal = <T>(
  list1: SinglyLinkedList<T> | null,
  list2: SinglyLinkedList<T> | null,
  set: Set<SinglyLinkedList<T>> = new Set<SinglyLinkedList<T>>()
): SinglyLinkedList<T> | null => {
  if (list1 === list2) {
    return list1;
  }
  if (list1 !== null) {
    if (set.has(list1)) {
      return list1;
    }
    set.add(list1);
  }
  if (list2 !== null) {
    if (set.has(list2)) {
      return list2;
    }
    set.add(list2);
  }
  return recursivelyFastInternal(list1?.next ?? null, list2?.next ?? null, set);
};

/// O(m + n)
export const iteratively = <T>(
  list1: SinglyLinkedList<T>,
  list2: SinglyLinkedList<T>
) => {
  const set = new Set<SinglyLinkedList<T>>();
  for (
    let x: SinglyLinkedList<T> | null = list1,
      y: SinglyLinkedList<T> | null = list2;
    x !== null || y !== null;
    x = x?.next ?? null, y = y?.next ?? null
  ) {
    if (x === y) {
      return x;
    }
    if (x !== null) {
      if (set.has(x)) {
        return x;
      }
      set.add(x);
    }
    if (y !== null) {
      if (set.has(y)) {
        return y;
      }
      set.add(y);
    }
  }
  return null;
};

type Intersection = <T>(
  list1: SinglyLinkedList<T>,
  list2: SinglyLinkedList<T>
) => SinglyLinkedList<T> | null;

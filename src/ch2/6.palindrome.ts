import { returnKthToLast } from "./2.returnKthToLast";
import getLength from "./getLength";
import SinglyLinkedList from "./SinglyLinkedList";

/// O(n^2)
export const recursivelySlow: IsPalindrome = (list) => {
  const totalLength = getLength(list);
  return internalRecursivelySlow(list, totalLength, 0);
};
const internalRecursivelySlow = <T>(
  list: SinglyLinkedList<T>,
  totalLength: number,
  index: number
): boolean => {
  if (index >= (totalLength - 1) / 2) {
    return true;
  }
  return (
    list.value === returnKthToLast(list, index) &&
    internalRecursivelySlow(list.next!, totalLength, index + 1)
  );
};

/// O(n), but recreates the entire list in memory
export const recursivelyFast: IsPalindrome = (list) =>
  areEqual(list, createReverseClone(list));

const areEqual = <T>(x: SinglyLinkedList<T>, y: SinglyLinkedList<T>): boolean =>
  x.value === y.value &&
  (x.next === null) === (y.next === null) &&
  (!x.next || areEqual(x.next, y.next!));
const createReverseClone = <T>(
  list: SinglyLinkedList<T>,
  head?: SinglyLinkedList<T>
): SinglyLinkedList<T> => {
  const reverse = new SinglyLinkedList<T>(list.value);
  if (head) {
    reverse.next = head;
  }
  if (list.next === null) {
    return reverse;
  } else {
    return createReverseClone(list.next, reverse);
  }
};

type IsPalindrome = <T>(list: SinglyLinkedList<T>) => boolean;

import getLength from "./getLength";
import SinglyLinkedList from "./SinglyLinkedList";

/// O(n)
export const returnKthToLast = <T>(list: SinglyLinkedList<T>, k: number) =>
  getIth(list, getLength(list) - k - 1);

function getIth<T>(list: SinglyLinkedList<T>, i: number): T {
  if (i === 0) {
    return list.value;
  }
  return getIth(list.next!, i - 1);
}

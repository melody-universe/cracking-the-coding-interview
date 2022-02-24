import SinglyLinkedList from "./SinglyLinkedList";

export const returnKthToLast = <T>(list: SinglyLinkedList<T>, k: number) =>
  getIth(list, getLength(list) - k - 1);

function getIth<T>(list: SinglyLinkedList<T>, i: number): T {
  if (i === 0) {
    return list.value;
  }
  return getIth(list.next!, i - 1);
}

function getLength<T>(list: SinglyLinkedList<T>, runningLength = 1): number {
  if (list.next === null) {
    return runningLength;
  }
  return getLength(list.next, runningLength + 1);
}

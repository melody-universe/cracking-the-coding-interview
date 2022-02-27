import SinglyLinkedList from "./SinglyLinkedList";

/// O(n)
export default function getLength<T>(
  list: SinglyLinkedList<T>,
  runningLength = 1
): number {
  if (list.next === null) {
    return runningLength;
  }
  return getLength(list.next, runningLength + 1);
}

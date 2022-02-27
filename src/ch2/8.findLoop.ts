import SinglyLinkedList from "./SinglyLinkedList";

export const recursively = <T>(
  list: SinglyLinkedList<T>,
  set: Set<SinglyLinkedList<T>> = new Set<SinglyLinkedList<T>>()
): SinglyLinkedList<T> | null => {
  if (set.has(list)) {
    return list;
  }
  if (list.next === null) {
    return null;
  }
  set.add(list);
  return recursively(list.next, set);
};

export const interatively: FindLoop = (list) => {
  const set = new Set<SinglyLinkedList>();
  for (let node = list; node.next !== null; node = node.next) {
    if (set.has(node)) {
      return node;
    }
    set.add(node);
  }
  return null;
};

type FindLoop = <T>(list: SinglyLinkedList<T>) => SinglyLinkedList<T> | null;

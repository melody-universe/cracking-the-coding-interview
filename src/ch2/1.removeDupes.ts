import SinglyLinkedList from "./SinglyLinkedList";

export const removeDupesWithSet = <T>(list: SinglyLinkedList<T>) => {
  const set = new Set<T>([list.value]);
  for (
    let node: SinglyLinkedList<T> | null = list;
    node !== null && node.next !== null;
    node = node.next
  ) {
    while (node.next !== null && set.has(node.next.value)) {
      node.next = node.next.next;
    }
    if (node.next !== null) {
      set.add(node.next.value);
    }
  }
};

export const removeDupesRecursivelyWithSet = <T>(
  list: SinglyLinkedList<T>,
  set: Set<T> = new Set([list.value])
) => {
  if (list.next === null) {
    return;
  }
  if (set.has(list.next.value)) {
    list.next = list.next.next;
    removeDupesRecursivelyWithSet(list, set);
  } else {
    set.add(list.next.value);
    removeDupesRecursivelyWithSet(list.next, set);
  }
};

export const removeDupesWithoutStructures = <T>(list: SinglyLinkedList<T>) => {
  for (let node = list; node !== null && node.next !== null; node = node.next) {
    for (
      let dupeCheckNode: SinglyLinkedList<T> | null = node;
      dupeCheckNode !== null && dupeCheckNode.next !== null;
      dupeCheckNode = dupeCheckNode.next
    ) {
      while (
        dupeCheckNode.next !== null &&
        dupeCheckNode.next.value === node.value
      ) {
        dupeCheckNode.next = dupeCheckNode.next.next;
      }
    }
  }
};

export const removeDupesRecursivelyWithoutStructures = <T>(
  list: SinglyLinkedList<T>
) => {
  removeValueFromRemainderOfList(list);
  if (list.next !== null) {
    removeDupesRecursivelyWithoutStructures(list.next);
  }
};
const removeValueFromRemainderOfList = <T>(
  list: SinglyLinkedList<T>,
  value: T = list.value
) => {
  if (list.next === null) {
    return;
  }
  if (list.next.value === value) {
    list.next = list.next.next;
    removeValueFromRemainderOfList(list, value);
  } else {
    removeValueFromRemainderOfList(list.next, value);
  }
};

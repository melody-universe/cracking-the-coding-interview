import SinglyLinkedList from "./SinglyLinkedList";

export const recursively = <T>(list: SinglyLinkedList<T>, pivot: T) =>
  internalRecursively(list, pivot);
const internalRecursively: RecursivePartition = <T>(
  list: SinglyLinkedList<T>,
  pivot: T,
  tail: SinglyLinkedList<T> | null = null
) => {
  if (list.value < pivot) {
    if (list.next === null) {
      list.next = tail;
    } else {
      list.next = internalRecursively(list.next, pivot, tail);
    }
    return list;
  } else if (list.next === null) {
    if (tail !== null) {
      list.next = tail;
    }
    return list;
  } else {
    let next = list.next;
    list.next = tail;
    return internalRecursively(next, pivot, list);
  }
};

export const iteratively = <T>(list: SinglyLinkedList<T>, pivot: T) => {
  let head: SinglyLinkedList<T> | null = null;
  let tail: SinglyLinkedList<T> | null = null;
  let endOfHead: SinglyLinkedList<T> | null = null;
  let nextNode: SinglyLinkedList<T> | null = null;
  for (
    let iNode: SinglyLinkedList<T> | null = list;
    iNode != null;
    iNode = nextNode
  ) {
    if (iNode.value < pivot) {
      nextNode = iNode.next;
      if (head === null) {
        endOfHead = head = iNode;
      } else {
        iNode.next = head;
        head = iNode;
      }
    } else if (iNode.next === null) {
      if (tail !== null) {
        iNode.next = tail;
        tail = iNode;
      }
      if (head === null) {
        head = iNode;
      }
      break;
    } else {
      nextNode = iNode.next;
      iNode.next = tail;
      tail = iNode;
    }
  }
  if (endOfHead !== null && tail !== null) {
    endOfHead.next = tail;
  }
  return head!;
};

export const usingReduce = <T>(list: SinglyLinkedList<T>, pivot: T) =>
  flattenReduceState(createReduceState(list, pivot));
const flattenReduceState = <T>({
  headStart,
  headEnd,
  tail,
}: ReduceState<T>) => {
  if (headStart === null) {
    return tail!;
  }
  headEnd!.next = tail;
  return headStart;
};
const createReduceState = <T>(list: SinglyLinkedList<T>, pivot: T) =>
  reduce(
    list,
    ({ headStart, headEnd, tail }, node) =>
      node.value < pivot
        ? headStart === null
          ? { headStart: node, headEnd: node, tail }
          : { headStart, headEnd: (headEnd!.next = node), tail }
        : (() => {
            node.next = tail;
            return { headStart, headEnd, tail: node };
          })(),
    { headStart: null, headEnd: null, tail: null } as ReduceState<T>
  );
const reduce = <T, U>(
  list: SinglyLinkedList<T>,
  reducer: (accumulate: U, node: SinglyLinkedList<T>) => U,
  initialValue: U
) => {
  let accumulate = initialValue;
  let currentNode: SinglyLinkedList<T> | null = list;
  while (currentNode !== null) {
    let nextNode: SinglyLinkedList<T> | null = currentNode.next;
    accumulate = reducer(accumulate, currentNode);
    currentNode = nextNode;
  }
  return accumulate;
};
interface ReduceState<T> {
  headStart: SinglyLinkedList<T> | null;
  headEnd: SinglyLinkedList<T> | null;
  tail: SinglyLinkedList<T> | null;
}

interface Partition<T> {
  (list: SinglyLinkedList<T>, pivot: T): SinglyLinkedList<T>;
}
type RecursivePartition = <T>(
  ...params: [
    ...head: Parameters<Partition<T>>,
    tail?: SinglyLinkedList<T> | null
  ]
) => SinglyLinkedList<T>;

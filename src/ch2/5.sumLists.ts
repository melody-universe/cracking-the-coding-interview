import SinglyLinkedList from "./SinglyLinkedList";

export const iteratively: SumLists = (list1, list2) => {
  let digitSum = list1.value + list2.value;
  let digitValue = digitSum % 10;
  let carryOver = digitSum >= 10 ? 1 : 0;
  const sum = new SinglyLinkedList<number>(digitValue);
  let sumNode = sum;
  for (
    let node1 = list1.next, node2 = list2.next;
    node1 !== null && node2 !== null;
    node1 = node1.next, node2 = node2.next
  ) {
    digitSum = node1.value + node2.value + carryOver;
    digitValue = digitSum % 10;
    carryOver = digitSum >= 10 ? 1 : 0;
    sumNode = sumNode.next = new SinglyLinkedList<number>(digitValue);
  }
  if (carryOver) {
    sumNode.next = new SinglyLinkedList(carryOver);
  }
  return sum;
};

export const recursively: SumLists = (list1, list2) =>
  internalRecursively(list1, list2);
const internalRecursively: (
  list1: SinglyLinkedList<number> | null | undefined,
  list2: SinglyLinkedList<number> | null | undefined,
  head?: SinglyLinkedList<number>,
  previousNode?: SinglyLinkedList<number>,
  carryOver?: number
) => SinglyLinkedList<number> = (
  list1,
  list2,
  head,
  previousNode,
  carryOver
) => {
  const digitSum = (list1?.value ?? 0) + (list2?.value ?? 0) + (carryOver ?? 0);
  const digit = digitSum % 10;
  const digitCarryOver = digitSum >= 10 ? 1 : 0;
  const digitNode = new SinglyLinkedList<number>(digit);
  if (previousNode) {
    previousNode.next = digitNode;
  }
  if (list1?.next || list2?.next || digitCarryOver) {
    return internalRecursively(
      list1?.next,
      list2?.next,
      head ?? digitNode,
      digitNode,
      digitCarryOver
    );
  } else {
    return head ?? digitNode;
  }
};

type SumLists = (
  list1: SinglyLinkedList<number>,
  list2: SinglyLinkedList<number>
) => SinglyLinkedList<number>;

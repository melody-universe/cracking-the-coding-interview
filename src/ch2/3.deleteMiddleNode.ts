import SinglyLinkedList from "./SinglyLinkedList";

export const recursively = (node: SinglyLinkedList<any>) => {
  if (node.next !== null) {
    node.value = node.next.value;
    if (node.next.next === null) {
      node.next = null;
    } else {
      recursively(node.next);
    }
  }
};

export const imperatively = (node: SinglyLinkedList<any>) => {
  for (let iNode = node; iNode?.next != null; iNode = iNode.next!) {
    iNode.value = iNode.next.value;
    if (iNode.next.next === null) {
      iNode.next = null;
    }
  }
};

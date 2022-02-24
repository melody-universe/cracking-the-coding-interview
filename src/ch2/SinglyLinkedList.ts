export default class SinglyLinkedList<T> {
  public value: T;
  public next: SinglyLinkedList<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  public append(value: T): SinglyLinkedList<T> {
    let node: SinglyLinkedList<T> = this;
    while (node.next !== null) {
      node = node.next;
    }
    return (node.next = new SinglyLinkedList(value));
  }

  static fromArray<T>(array: T[]) {
    const iterator = array[Symbol.iterator]();
    const list = new SinglyLinkedList<T>(iterator.next().value);
    let node = list;
    for (const value of iterator) {
      node = node.append(value);
    }
    return list;
  }
}

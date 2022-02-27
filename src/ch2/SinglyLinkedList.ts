export default class SinglyLinkedList<T = any> {
  public value: T;
  public next: SinglyLinkedList<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  public appendNode(node: SinglyLinkedList<T>): SinglyLinkedList<T> {
    let tail: SinglyLinkedList<T> = this;
    while (tail.next !== null) {
      tail = tail.next;
    }
    return (tail.next = node);
  }

  public append(value: T): SinglyLinkedList<T> {
    return this.appendNode(new SinglyLinkedList(value));
  }

  public toArray(): T[] {
    const array: T[] = [this.value];
    let node: SinglyLinkedList<T> = this;
    while (node.next !== null) {
      node = node.next;
      array.push(node.value);
    }
    return array;
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

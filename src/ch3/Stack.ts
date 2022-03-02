export default class Stack<T> {
  head: Node<T> | undefined;

  constructor(init?: Iterable<T>) {
    if (init) {
      for (const value of init) {
        this.push(value);
      }
    }
  }

  public push(value: T) {
    const node = new Node(value);
    if (this.head === undefined) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    return this;
  }

  public pop() {
    if (this.head === undefined) {
      throw new RangeError("Tried to pop an empty stack");
    }
    const returnValue = this.head.value;
    this.head = this.head.next;
    return returnValue;
  }

  public peek() {
    if (this.head === undefined) {
      throw new RangeError("Tried to peek an empty stack");
    }
    return this.head.value;
  }

  public isEmpty() {
    return this.head === undefined;
  }
}

class Node<T> {
  public value: T;
  public next: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

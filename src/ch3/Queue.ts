import Node from "./Node";

export default class Queue<T> {
  first: Node<T> | undefined;
  last: Node<T> | undefined;

  constructor(init?: Iterable<T>) {
    if (init) {
      for (const value of init) {
        this.add(value);
      }
    }
  }

  public add(value: T): Queue<T> {
    const node = new Node(value);
    if (this.last === undefined) {
      this.first = this.last = node;
    } else {
      this.last = this.last.next = node;
    }
    return this;
  }

  public remove(): T {
    if (this.first === undefined) {
      throw new RangeError("Tried to remove from an empty queue.");
    }
    const value = this.first.value;
    this.first = this.first.next;
    return value;
  }

  public peek(): T {
    if (this.first === undefined) {
      throw new RangeError("Tried to peek an empty queue.");
    }
    return this.first.value;
  }

  public isEmpty(): boolean {
    return this.first === undefined;
  }
}

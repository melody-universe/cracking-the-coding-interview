export default class Node<T> {
  public value: T;
  public next: Node<T> | undefined = undefined;

  constructor(value: T) {
    this.value = value;
  }
}

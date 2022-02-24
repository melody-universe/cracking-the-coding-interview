import SinglyLinkedList from "./SinglyLinkedList";

test("fromArray", () => {
  const list = SinglyLinkedList.fromArray([1, 2, 3]);

  expect(list.value).toEqual(1);
  expect(list.next?.value).toEqual(2);
  expect(list.next?.next?.value).toEqual(3);
  expect(list.next?.next?.next).toBeNull();
});

test("toArray", () => {
  const list = SinglyLinkedList.fromArray([1, 2, 3]);

  expect(list.toArray()).toEqual([1, 2, 3]);
});

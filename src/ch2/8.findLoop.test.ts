import getObjectKeys from "../utils/getObjectKeys";
import * as implementations from "./8.findLoop";
import SinglyLinkedList from "./SinglyLinkedList";

getObjectKeys(implementations).forEach((name) => {
  describe(name, () => {
    const findLoop = implementations[name];
    test("returns null for a list without a loop", () => {
      const list = SinglyLinkedList.fromArray([1, 2, 3]);

      expect(findLoop(list)).toBeNull();
    });

    test("returns the head of a loop if one exists", () => {
      const head = SinglyLinkedList.fromArray([1, 2, 3]);
      const loop = SinglyLinkedList.fromArray([4, 5, 6]);
      head.appendNode(loop.appendNode(loop));

      expect(findLoop(head)).toBe(loop);
    });

    test("returns back a one-node loop", () => {
      const list = new SinglyLinkedList(1);
      list.next = list;

      expect(findLoop(list)).toBe(list);
    });
  });
});

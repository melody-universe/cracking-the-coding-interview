import getObjectKeys from "../utils/getObjectKeys";
import runTests from "../utils/runTests";
import * as implementations from "./7.intersection";
import SinglyLinkedList from "./SinglyLinkedList";

getObjectKeys(implementations).forEach((name) => {
  describe(name, () => {
    const findIntersection = implementations[name];

    test("two disjoint lists return null", () => {
      const list1 = new SinglyLinkedList(1);
      const list2 = new SinglyLinkedList(1);

      expect(findIntersection(list1, list2)).toBeNull();
    });

    test("finds the intersecting node of two lists", () => {
      const list1 = SinglyLinkedList.fromArray([1, 2, 3]);
      const list2 = SinglyLinkedList.fromArray([4, 5]);
      const intersection = SinglyLinkedList.fromArray([6, 7, 8]);
      list1.appendNode(intersection);
      list2.appendNode(intersection);

      expect(findIntersection(list1, list2)).toBe(intersection);
    });

    test("can find a single-node list at the end of a long list", () => {
      const list1 = new SinglyLinkedList(1);
      const list2 = SinglyLinkedList.fromArray(
        Array.from({ length: 100 }, (_, index) => index)
      );
      list2.appendNode(list1);

      expect(findIntersection(list1, list2)).toBe(list1);
    });
  });
});

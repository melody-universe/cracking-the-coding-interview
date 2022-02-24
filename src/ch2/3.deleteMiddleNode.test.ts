import runTests from "../utils/runTests";
import * as implementations from "./3.deleteMiddleNode";
import SinglyLinkedList from "./SinglyLinkedList";

runTests(
  implementations,
  [
    {
      input: {
        array: [[1, 2, 3]],
        selector: (list: SinglyLinkedList<number>) => list.next!,
        friendlyNth: "2nd",
      },
      output: [1, 3],
    },
  ],
  (deleteMiddleNode, input, output) => {
    const list = SinglyLinkedList.fromArray(input.array[0]);

    deleteMiddleNode(input.selector(list));

    expect(list.toArray()).toEqual(output);
  },
  (input) => `(${JSON.stringify(input.array)}, ${input.friendlyNth} node)`
);

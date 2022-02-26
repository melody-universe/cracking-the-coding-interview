import runTests from "../utils/runTests";
import * as implementations from "./5.sumLists";
import SinglyLinkedList from "./SinglyLinkedList";

runTests(
  implementations,
  [
    {
      input: [
        [7, 1, 6],
        [5, 9, 2],
      ],
      output: [2, 1, 9],
    },
    {
      input: [[1], [1]],
      output: [2],
    },
    {
      input: [[9], [9]],
      output: [8, 1],
    },
  ],
  (sumLists, input, output) => {
    const list1 = SinglyLinkedList.fromArray(input[0]);
    const list2 = SinglyLinkedList.fromArray(input[1]);

    const sum = sumLists(list1, list2);

    expect(sum.toArray()).toEqual(output);
  }
);

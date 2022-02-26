import runTests from "../utils/runTests";
import * as implementations from "./4.partition";
import SinglyLinkedList from "./SinglyLinkedList";

runTests(
  implementations,
  [
    {
      input: { array: [1, 2, 3], pivot: 2 },
      output: { left: [1], right: [2, 3] },
    },
    {
      input: { array: [3, 2, 1], pivot: 2 },
      output: { left: [1], right: [2, 3] },
    },
    {
      input: { array: [3, 5, 8, 5, 10, 2, 1], pivot: 5 },
      output: { left: [3, 1, 2], right: [10, 5, 5, 8] },
    },
  ],
  (partition, input, output) => {
    const list = SinglyLinkedList.fromArray(input.array);

    const partitionedList = partition(list, input.pivot);

    const partitionedArray = partitionedList.toArray();
    expect(partitionedArray.slice(0, output.left.length).sort()).toEqual(
      output.left.sort()
    );
    expect(partitionedArray.slice(output.left.length).sort()).toEqual(
      output.right.sort()
    );
  }
);

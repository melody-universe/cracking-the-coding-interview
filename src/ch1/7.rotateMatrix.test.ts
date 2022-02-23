import runTests from "../utils/runTests";
import * as implementations from "./7.rotateMatrix";

runTests(implementations, [
  { input: [[[0]]], output: [[0]] },
  {
    input: [
      [
        [1, 2],
        [3, 4],
      ],
    ],
    output: [
      [3, 1],
      [4, 2],
    ],
  },
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    output: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ],
  },
]);

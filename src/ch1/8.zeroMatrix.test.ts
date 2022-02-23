import runTests from "../utils/runTests";
import * as implementations from "./8.zeroMatrix";

runTests(implementations, [
  { input: [[[1]]], output: [[1]] },
  {
    input: [
      [
        [0, 1],
        [1, 1],
      ],
    ],
    output: [
      [0, 0],
      [0, 1],
    ],
  },
  {
    input: [
      [
        [1, 1, 1],
        [1, 0, 1],
      ],
    ],
    output: [
      [1, 0, 1],
      [0, 0, 0],
    ],
  },
]);

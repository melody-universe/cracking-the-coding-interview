import runTests from "../utils/runTests";
import * as implementations from "./2.arePermutations";

runTests(implementations, [
  {
    input: ["abc", "abc"],
    output: true,
    inputDescription: "equivalent strings",
  },
  {
    input: ["abc", "ab"],
    output: false,
    inputDescription: "strings of different length",
  },
  {
    input: ["abc", "cba"],
    output: true,
  },
]);

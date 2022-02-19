import runTests from "./runTests";
import { implementations } from "./getCharacterCounts";

runTests(implementations, [
  {
    input: [""],
    inputDescription: "empty string",
    output: {},
    outputDescription: "empty object",
  },
  {
    input: ["abc"],
    output: { a: 1, b: 1, c: 1 },
  },
  {
    input: ["abcaba"],
    output: { a: 3, b: 2, c: 1 },
  },
]);

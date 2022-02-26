import runTests from "../utils/runTests";
import * as implementations from "./1.isUnique";

runTests(implementations, [
  {
    input: [""],
    inputDescription: "empty string",
    output: true,
  },
  { input: ["aa"], output: false },
  { input: ["abcdefghijklmnopqrstuvwxyz"], output: true },
  { input: ["🤓🤓"], output: false },
  { input: ["🤓☕"], output: true },
  /* {
    input: [generateUniqueStringOfLength(65536)],
    inputDescription: "the longest possible string of unique characters",
    output: true,
    include: ["usingCharMap"],
  },
  {
    input: [generateUniqueStringOfLength(65537)],
    inputDescription: "a string barely too long to have all unique characters",
    output: false,
  }, */
  {
    input: [generateUniqueStringOfLength(32)],
    inputDescription: "the longest string processible using bitwise logic",
    output: true,
  },
]);

function generateUniqueStringOfLength(length: number) {
  return [...Array(length)].reduce<string>(
    (input, _, i) => `${input}${String.fromCharCode(i)}`,
    ""
  );
}

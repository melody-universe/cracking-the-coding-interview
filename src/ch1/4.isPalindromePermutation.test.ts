import runTests from "../utils/runTests";
import * as implementations from "./4.isPalindromePermutation";

runTests(implementations, [
  { input: ["a"], output: true },
  { input: ["aab"], output: true },
  { input: ["aabc"], output: false },
  { input: ["aabbcc"], output: true },
  { input: ["aaabbcc"], output: true },
]);

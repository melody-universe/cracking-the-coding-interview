import runTests from "../utils/runTests";
import * as implementations from "./6.compressString";

runTests(implementations, [
  { input: ["abc"], output: "abc" },
  { input: ["aaa"], output: "a3" },
  { input: ["aabccccaaa"], output: "a2b1c4a3" },
]);

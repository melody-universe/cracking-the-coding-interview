import runTests from "../utils/runTests";
import * as implementations from "./9.stringRotation";

runTests(implementations, [
  { input: ["abc", "def"], output: false },
  { input: ["waterbottle", "erbottlewat"], output: true },
]);

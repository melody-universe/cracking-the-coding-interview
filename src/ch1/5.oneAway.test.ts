import runTests from "../utils/runTests";
import * as implementations from "./5.oneAway";

runTests(implementations, [
  { input: ["pale", "ple"], output: true },
  { input: ["pales", "pale"], output: true },
  { input: ["pale", "bale"], output: true },
  { input: ["pale", "bake"], output: false },
  { input: ["pales", "ple"], output: false },
]);

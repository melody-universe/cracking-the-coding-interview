import runTests from "./runTests";
import { AreEqual, implementations } from "./areEqual";

runTests<AreEqual, typeof implementations>(implementations, [
  {
    input: ["a", 1],
    inputDescription: "two values of separate types",
    output: false,
  },
  {
    input: ["a", "a"],
    output: true,
  },
  {
    input: ["a", "b"],
    output: false,
  },
  {
    input: [{ a: 1 }, { a: 1 }],
    output: true,
  },
  {
    input: [{ a: 1 }, { a: 2 }],
    output: false,
  },
  {
    input: [{ a: 1 }, { a: 1, b: 1 }],
    output: false,
  },
]);

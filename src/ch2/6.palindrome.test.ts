import runTests from "../utils/runTests";
import * as implementations from "./6.palindrome";
import SinglyLinkedList from "./SinglyLinkedList";

runTests(
  implementations,
  [
    { input: [1], output: true },
    { input: [1, 2, 3, 2, 1], output: true },
    { input: [1, 2, 3], output: false },
  ],
  (isPalindrome, input, output) => {
    const list = SinglyLinkedList.fromArray(input);

    expect(isPalindrome(list)).toEqual(output);
  }
);

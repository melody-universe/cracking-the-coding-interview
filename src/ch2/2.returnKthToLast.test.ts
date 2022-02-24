import getObjectKeys from "../utils/getObjectKeys";
import * as implementations from "./2.returnKthToLast";
import SinglyLinkedList from "./SinglyLinkedList";

const tests: Test[] = [
  { input: [[1, 2, 3], 1], output: 2 },
  { input: [[1], 0], output: 1 },
  { input: [[1, 2, 3], 2], output: 1 },
  { input: [[1, 2, 3], 0], output: 3 },
];

getObjectKeys(implementations).forEach((name) => {
  describe(name, () => {
    const returnKthToLast = implementations[name];
    tests.forEach(({ input: [array, k], output }) =>
      test(`(${JSON.stringify(array)}, ${k}) => ${JSON.stringify(
        output
      )}`, () => {
        const list = SinglyLinkedList.fromArray(array);

        expect(returnKthToLast(list, k)).toEqual(output);
      })
    );
  });
});

type Test<T = any> = { input: [T[], number]; output: T };

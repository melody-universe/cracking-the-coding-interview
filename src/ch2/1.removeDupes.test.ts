import SinglyLinkedList from "./SinglyLinkedList";
import * as implementations from "./1.removeDupes";
import getObjectKeys from "../utils/getObjectKeys";

const tests: Test[] = [
  { input: [1, 2, 3, 1, 2, 3], output: [1, 2, 3] },
  { input: [1, 1, 1], output: [1] },
];

getObjectKeys(implementations).forEach((name) => {
  describe(name, () => {
    const removeDupes = implementations[name];
    tests.forEach(({ input, output }) => {
      test(`${JSON.stringify(input)} => ${JSON.stringify(output)}`, () => {
        const list = SinglyLinkedList.fromArray(input);

        removeDupes(list);

        expect(list.toArray()).toEqual(output);
      });
    });
  });
});

type Test = { input: any[]; output: any[] };

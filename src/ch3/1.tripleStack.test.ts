import getObjectKeys from "../utils/getObjectKeys";
import * as implementations from "./1.tripleStack";

getObjectKeys(implementations).forEach((name) =>
  describe(name, () => {
    const createTripleStack = implementations[name];
    test("initializes three empty stacks", () => {
      const stacks = createTripleStack();
      expect(stacks.every((stack) => stack.isEmpty())).toEqual(true);
    });

    test("can push and pop to different stacks independently", () => {
      const [stack1, stack2, stack3] = createTripleStack<number>();
      stack1.push(1).push(2);
      stack2.push(3).push(4).push(5);
      stack3.push(6).push(7);

      expect(stack1.pop()).toEqual(2);
      expect(stack2.pop()).toEqual(5);
      expect(stack2.pop()).toEqual(4);
      expect(stack3.pop()).toEqual(7);
    });

    test("can initialize from an iterable", () => {
      const [_, _1, stack3] = createTripleStack([
        undefined,
        undefined,
        [1, 2, 3],
      ]);

      expect(stack3.peek()).toEqual(3);
    });
  })
);

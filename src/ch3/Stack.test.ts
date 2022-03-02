import Stack from "./Stack";

test("pushes / pops values in last-in-first-out order", () => {
  const stack = new Stack<number>().push(1).push(2);

  expect(stack.pop()).toEqual(2);
  expect(stack.pop()).toEqual(1);
});

test("peek returns the top item, but doesn't remove it", () => {
  const stack = new Stack<number>().push(1).push(2);

  expect(stack.peek()).toEqual(2);
  expect(stack.pop()).toEqual(2);
});

test("can initialize from an iterable", () => {
  const stack = new Stack<number>([1, 2]);
  expect(stack.pop()).toEqual(2);
  expect(stack.pop()).toEqual(1);
});

describe("isEmpty", () => {
  test("initializes empty", () => expect(new Stack().isEmpty()).toEqual(true));
  test("is not empty when items are present", () => {
    const stack = new Stack([1, 2]);
    expect(stack.isEmpty()).toEqual(false);
  });
  test("is empty when all items are popped", () => {
    const stack = new Stack<number>();
    stack.push(1).pop();

    expect(stack.isEmpty()).toEqual(true);
  });
});

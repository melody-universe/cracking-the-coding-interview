import Queue from "./Queue";

test("adds / removes values in first-in-first-out order", () => {
  const queue = new Queue().add(1).add(2);

  expect(queue.remove()).toEqual(1);
  expect(queue.remove()).toEqual(2);
});

test("peek returns the first item, but doesn't remove it", () => {
  const queue = new Queue().add(1).add(2);

  expect(queue.peek()).toEqual(1);
  expect(queue.remove()).toEqual(1);
});

test("can initialize from an iterable", () => {
  const queue = new Queue([1, 2]);

  expect(queue.remove()).toEqual(1);
  expect(queue.remove()).toEqual(2);
});

describe("isEmpty", () => {
  test("initializes empty", () => expect(new Queue().isEmpty()).toEqual(true));
  test("is not empty when items are present", () => {
    const queue = new Queue([1, 2]);
    expect(queue.isEmpty()).toEqual(false);
  });
  test("is empty when all items are removed", () => {
    const queue = new Queue([1, 2]);
    queue.remove();
    queue.remove();

    expect(queue.isEmpty()).toEqual(true);
  });
});

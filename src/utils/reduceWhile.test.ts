import reduceWhile from "./reduceWhile";

test("throws for an empty array with no initial value", () => {
  expect(() => reduceWhile([], (() => {}) as any)).toThrow(
    TypeError("Reduce of empty array with no initial value")
  );
});

test("reduces the whole array if continue is never set", () => {
  const reducer = (a: number, b: number) => ({ returnValue: a + b });

  const result = reduceWhile([1, 2, 3], reducer);

  expect(result).toEqual(6);
});

test("stops reducing when continue is set to false", () => {
  const reducer = (a: number, b: number) => ({
    returnValue: a + b,
    continue: a + b < 3,
  });

  const result = reduceWhile([1, 2, 3], reducer);

  expect(result).toEqual(3);
});

test("reduces on top of any provided initial value", () => {
  const reducer = (a: number, b: number) => ({ returnValue: a + b });

  const result = reduceWhile([1, 2, 3], reducer, 4);

  expect(result).toEqual(10);
});

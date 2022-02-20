import { when } from "jest-when";
import compose from "./compose";

const identityFunction = <T extends any>(a: T) => a;

const createMockFunction = (inputArg?: Symbol) => {
  const input = inputArg ?? Symbol();
  const output = Symbol();
  const fn = jest.fn<typeof output, [typeof input]>() as unknown as (
    input: Symbol
  ) => Symbol;
  when(fn).calledWith(input).mockReturnValue(output);

  return { fn, input, output };
};

// (I o f)(x) <=> f(x)
test("left-identity property", () => {
  const { fn, input, output } = createMockFunction();
  const composition = compose(identityFunction, fn);

  expect(composition(input)).toBe(output);
});

// (f o I)(x) <=> f(x)
test("right-identity property", () => {
  const { fn, input, output } = createMockFunction();
  const composition = compose(fn, identityFunction);

  expect(composition(input)).toBe(output);
});

// f o (g o h)(x) <=> (f o g) o h(x)
test("associative property", () => {
  const { fn: h, input, output: hOutput } = createMockFunction();
  const { fn: g, output: gOutput } = createMockFunction(hOutput);
  const { fn: f } = createMockFunction(gOutput);

  const leftComposition = compose(f, compose(g, h));
  const rightComposition = compose(compose(f, g), h);

  expect(leftComposition(input)).toBe(rightComposition(input));
});

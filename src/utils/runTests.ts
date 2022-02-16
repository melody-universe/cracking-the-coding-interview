import getObjectKeys from "./getObjectKeys";

const runTests = <
  Function extends (...args: any[]) => any,
  Implementations extends { [name: string]: Function }
>(
  implementations: Implementations,
  tests: {
    input: Parameters<Function>;
    inputDescription?: string;
    output: ReturnType<Function>;
    outputDescription?: string;
    include?: (keyof Implementations)[];
    exclude?: (keyof Implementations)[];
  }[]
) =>
  getObjectKeys(implementations).forEach((name) =>
    describe(`${name}`, () =>
      tests
        .filter(
          ({ include, exclude }) =>
            (!include || include.includes(name)) && !exclude?.includes(name)
        )
        .forEach(({ input, inputDescription, output, outputDescription }) =>
          test(`${inputDescription ?? input} => ${
            outputDescription ??
            (typeof output === "object" ? JSON.stringify(output) : output)
          }`, () => expect(implementations[name](...input)).toEqual(output))
        ))
  );
export default runTests;

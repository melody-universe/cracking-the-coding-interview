import getObjectKeys from "./getObjectKeys";

const runTests = <TFunction extends (...args: any[]) => any>(
  implementations: { [name: string]: TFunction },
  tests: {
    input: Parameters<TFunction>;
    inputDescription?: string;
    output: ReturnType<TFunction>;
    outputDescription?: string;
    include?: (keyof typeof implementations)[];
    exclude?: (keyof typeof implementations)[];
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
          test(`${
            inputDescription ??
            (typeof input === "object" ? JSON.stringify(input) : input)
          } => ${
            outputDescription ??
            (typeof output === "object" ? JSON.stringify(output) : output)
          }`, () => expect(implementations[name](...input)).toEqual(output))
        ))
  );
export default runTests;

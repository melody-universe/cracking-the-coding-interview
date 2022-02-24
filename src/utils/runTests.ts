import getObjectKeys from "./getObjectKeys";

const runTests = <TInput, TOutput, TFunction extends (...args: any[]) => any>(
  implementations: { [name: string]: TFunction },
  tests: {
    input: typeof runTest extends undefined ? Parameters<TFunction> : TInput;
    inputDescription?: string;
    output: typeof runTest extends undefined ? ReturnType<TFunction> : TOutput;
    outputDescription?: string;
    include?: (keyof typeof implementations)[];
    exclude?: (keyof typeof implementations)[];
  }[],
  runTest?: (implementation: TFunction, input: TInput, output: TOutput) => void,
  createInputDescription?: (input: TInput) => string,
  createOutputDescription?: (output: TOutput) => string
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
            createInputDescription
              ? createInputDescription(input)
              : inputDescription ?? JSON.stringify(input)
          } => ${
            createOutputDescription
              ? createOutputDescription(output)
              : outputDescription ??
                (typeof output === "object" ? JSON.stringify(output) : output)
          }`, () => {
            if (runTest) {
              runTest(implementations[name], input, output);
            } else {
              expect(
                implementations[name](
                  ...(input as unknown as Parameters<TFunction>)
                )
              ).toEqual(output);
            }
          })
        ))
  );
export default runTests;

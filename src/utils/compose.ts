const compose =
  <TInput, TOutput = TInput>(...fns: Function[]) =>
  (input: TInput) =>
    fns.reduceRight(
      (prevFn, nextFn) => nextFn(prevFn),
      input
    ) as unknown as TOutput;
export default compose;

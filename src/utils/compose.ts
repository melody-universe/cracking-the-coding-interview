const compose =
  <FirstFunction extends AnyFunction, LastFunction extends AnyFunction>(
    ...fns: [FirstFunction, ...Function[], LastFunction]
  ) =>
  (...parameters: Parameters<FirstFunction>) =>
    fns.reduceRight(
      (prevFn, nextFn) => nextFn(...[prevFn].flat()),
      parameters
    ) as ReturnType<FirstFunction>;
export default compose;

type AnyFunction = (...args: any) => any;

const compose: Compose = ((...fns: AnyFunction[]) =>
  (...parameters: any[]) =>
    fns.reduceRight(
      (prevFn, nextFn) => nextFn(...[prevFn].flat()),
      parameters
    )) as unknown as Compose;
export default compose;

// Credit for the below goes to Babak
// https://dev.to/hemaka/introducing-the-recursive-pipe-and-compose-types-3g9o

type ExtractParameters<Function> = Function extends (
  ...args: infer Parameters
) => any
  ? Parameters
  : never;

type ExtractReturnType<Function> = Function extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;

type AnyFunction = (...args: any[]) => any;

type Composition<
  Functions extends any[],
  PreviousFunction = void,
  Params extends any[] = never[],
  InitialReturnType = never
> = Functions extends []
  ? (...args: Params) => InitialReturnType
  : Functions extends [infer First, ...infer Rest]
  ? PreviousFunction extends void
    ? Composition<
        Rest,
        First,
        ExtractParameters<First>,
        ExtractReturnType<First>
      >
    : Params[0] extends ExtractReturnType<First>
    ? Composition<Rest, First, ExtractParameters<First>, InitialReturnType>
    : any extends Params[0]
    ? Composition<Rest, First, ExtractParameters<First>, InitialReturnType>
    : {
        error: [
          "return type",
          ExtractReturnType<First>,
          "does not comply with the input of",
          Params[0]
        ];
        position: [Functions["length"], "from the right"];
      }
  : never;
type Compose = <Functions extends [AnyFunction, ...AnyFunction[]]>(
  ...functions: Functions & Composition<Functions> extends AnyFunction
    ? Functions
    : never
) => Composition<Functions>;

const addOne = (a: number) => a + 1;
const double = (a: number) => a * 2;
const stringify = (a: number) => a.toString();
const composition = compose(
  parseInt,
  stringify,
  addOne,
  parseInt,
  stringify,
  double
);

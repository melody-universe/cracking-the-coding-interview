import getObjectKeys from "./getObjectKeys";
import { Decorator } from "../types/Decorator";
import isPrimitive from "./isPrimitive";
import compose from "./compose";

const withTypeCheck: Decorator<AreEqual> = (method) => (a, b) =>
  typeof a === typeof b ? method(a, b) : false;
const withPrimitiveCheck: Decorator<AreEqual> = (method) => (a, b) =>
  isPrimitive(a) ? a === b : method(a, b);
const withAllDecorators = compose(withPrimitiveCheck, withTypeCheck);

const getCombinedKeys = <T>(a: T, b: T) => [
  ...new Set([...getObjectKeys(a), ...getObjectKeys(b)]),
];

export const usingForLoop: AreEqual = withAllDecorators((a, b) => {
  for (const key of getCombinedKeys(a, b)) {
    if (!usingForLoop(a[key], b[key])) {
      return false;
    }
  }
  return true;
});

export const asPureFunction: AreEqual = withAllDecorators((a, b) =>
  getCombinedKeys(a, b).every((key) => asPureFunction(a[key], b[key]))
);

export const implementations = { usingForLoop, asPureFunction };
const areEqual = asPureFunction;
export default areEqual;

export type AreEqual = <T>(a: T, b: T) => boolean;

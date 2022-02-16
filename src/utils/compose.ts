import { Decorator } from "../types/Decorator";

const compose =
  <T>(...decorators: Decorator<T>[]) =>
  (method: T) =>
    decorators.reduceRight(
      (composition, decorator) => decorator(composition),
      method
    );
export default compose;

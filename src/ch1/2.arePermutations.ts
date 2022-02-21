import { Decorator } from "../types/Decorator";
import areEqual from "../utils/areEqual";
import compose from "../utils/compose";
import getCharacterCounts from "../utils/getCharacterCounts";

const withEquivalenceCheck: Decorator<ArePermutations> = (method) => (a, b) =>
  a == b ? true : method(a, b);
const withLengthCheck: Decorator<ArePermutations> = (method) => (a, b) =>
  a.length === b.length ? method(a, b) : false;
const withAllDecorators = compose<ArePermutations>(
  withLengthCheck,
  withEquivalenceCheck
);

export const arePermutations: ArePermutations = withAllDecorators((a, b) =>
  areEqual(getCharacterCounts(a), getCharacterCounts(b))
);

type ArePermutations = (a: string, b: string) => boolean;

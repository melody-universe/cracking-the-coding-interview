import atMost from "../utils/atMost";
import compose from "../utils/compose";
import getCharacterParities from "../utils/getCharacterParities";
import getObjectValues from "../utils/getObjectValues";

export const asPureFunction: IsPalindromePermutation = compose(
  atMost(1),
  getObjectValues,
  getCharacterParities
);

type IsPalindromePermutation = (input: string) => boolean;

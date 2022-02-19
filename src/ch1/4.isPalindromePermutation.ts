import atMost from "../utils/atMost";
import getCharacterParities from "../utils/getCharacterParities";
import getObjectValues from "../utils/getObjectValues";

export const asPureFunction: IsPalindromePermutation = (input) =>
  atMost(getObjectValues(getCharacterParities(input)), 1, (isOdd) => isOdd);

type IsPalindromePermutation = (input: string) => boolean;

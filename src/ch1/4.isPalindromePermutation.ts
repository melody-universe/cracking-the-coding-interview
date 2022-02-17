import getCharacterCounts from "../utils/getCharacterCounts";
import getObjectKeys from "../utils/getObjectKeys";

export const usingCharacterCountMap: IsPalindromePermutation = (input) => {
  let uniqueCharacterFound = false;
  const characterCounts = getCharacterCounts(input);
  return getObjectKeys(characterCounts).every((character) => {
    const count = characterCounts[character];
    if (count === 1) {
      if (uniqueCharacterFound) {
        return false;
      } else {
        uniqueCharacterFound = true;
      }
      return true;
    }
    return (count & 1) === 0;
  });
};

export type IsPalindromePermutation = (input: string) => boolean;

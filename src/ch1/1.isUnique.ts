import reduceWhile from "../utils/reduceWhile";

const withPigeonHolePrinciple = (method: IsUnique) => (input: string) =>
  input.length > 65536 ? false : method(input);

export const usingCharMap: IsUnique = withPigeonHolePrinciple((input) => {
  const cachedCharacters: { [char: string]: undefined } = {};
  return ![...input].some((char) => {
    if (char in cachedCharacters) {
      return true;
    } else {
      cachedCharacters[char] = undefined;
    }
  });
});

export const asPureFunctionBruteForce: IsUnique = withPigeonHolePrinciple(
  (input) =>
    [...input].every(
      (char, index) =>
        ![...input].slice(index + 1).some((otherChar) => char === otherChar)
    )
);

export const asPureFunctionUsingReduceWhile: IsUnique = withPigeonHolePrinciple(
  (input) =>
    !!reduceWhile(
      [...input],
      (map, character) =>
        character in (map as CharacterSet)
          ? { returnValue: false, continue: false }
          : {
              returnValue: { ...(map as CharacterSet), [character]: null },
            },
      {} as boolean | CharacterSet
    )
);
type CharacterSet = { [character: string]: null };

export const withoutDataStructures: IsUnique = withPigeonHolePrinciple(
  (input) => {
    for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j < input.length; j++) {
        if (input[i] === input[j]) {
          return false;
        }
      }
    }
    return true;
  }
);

export const usingBitOperators: IsUnique = withPigeonHolePrinciple((input) => {
  let bitMap = 0;
  for (const char of input) {
    const value = 1 << char.charCodeAt(0);
    if ((bitMap & value) > 0) {
      return false;
    }
    bitMap |= value;
  }
  return true;
});

type IsUnique = (input: string) => boolean;

const withPigeonHolePrinciple = (method: IsUnique) => (input: string) =>
  input.length > 65536 ? false : method(input);

export const usingCharMap: IsUnique = withPigeonHolePrinciple((input) => {
  if (input.length > 65536) {
    return false;
  }
  const cachedCharacters: { [char: string]: undefined } = {};
  return ![...input].some((char) => {
    if (char in cachedCharacters) {
      return true;
    } else {
      cachedCharacters[char] = undefined;
    }
  });
});

export const asPureFunction: IsUnique = withPigeonHolePrinciple((input) =>
  [...input].every(
    (char, index) =>
      ![...input].slice(index + 1).some((otherChar) => char === otherChar)
  )
);

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

export type IsUnique = (input: string) => boolean;

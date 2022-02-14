export const isUniqueUsingCharMap: isUnique = (input: string) => {
  const cachedCharacters: { [char: string]: undefined } = {};
  return ![...input].some((char) => {
    if (char in cachedCharacters) {
      return true;
    } else {
      cachedCharacters[char] = undefined;
    }
  });
};

export const isUniqueAsPureFunction: isUnique = (input: string) =>
  [...input].every(
    (char, index) =>
      ![...input].slice(index + 1).some((otherChar) => char === otherChar)
  );

export const isUniqueWithoutDataStructures: isUnique = (input: string) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] === input[j]) {
        return false;
      }
    }
  }
  return true;
};

export const isUniqueUsingBitOperators: isUnique = (input: string) => {
  let bitMap = 0;
  for (const char of input) {
    const value = 1 << char.charCodeAt(0);
    if ((bitMap & value) > 0) {
      return false;
    }
    bitMap |= value;
  }
  return true;
};

type isUnique = (input: string) => boolean;

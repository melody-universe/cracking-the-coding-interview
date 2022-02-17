/**
 * The problem in the book is labeled "URLify", but to follow naming conventions, I've renamed the function "encodeSpaces."
 * The problem reads to replace all spaces in a string with "%20".
 * To make this less trivial in JavaScript, I will implement this by mutating an array of characters.
 */

export const usingQueue: EncodeSpaces = (charArray, length) => {
  const queue = [];
  for (
    let i = 0, actualCharacters = 0;
    i < charArray.length && (queue.length > 0 || actualCharacters < length);
    i++
  ) {
    const character = charArray[i];
    if (character === " " && actualCharacters < length) {
      actualCharacters++;
      queue.push(..."%20");
    }
    if (queue.length > 0) {
      if (character !== " " && actualCharacters < length) {
        queue.push(character);
        actualCharacters++;
      }
      charArray[i] = queue.shift() as string;
    } else {
      actualCharacters++;
    }
  }
};

export const usingInputAsQueue: EncodeSpaces = (charArray, length) => {
  let queueSize = 0;
  for (
    let i = 0, actualCharacters = 0;
    i < charArray.length && (queueSize > 0 || actualCharacters < length);
    i++
  ) {
    const character = charArray[i];
    if (character === " " && actualCharacters < length) {
      push("%");
    }
    if (queueSize > 0) {
      charArray[i] = shift();
      if (character !== " " && actualCharacters < length) {
        push(character);
        actualCharacters++;
      }
    } else {
      actualCharacters++;
    }
    if (character === " " && actualCharacters < length) {
      actualCharacters++;
      push(..."20");
    }
  }
  function push(...characters: string[]) {
    for (
      let i = charArray.length - 1 - queueSize, j = 0;
      j < characters.length;
      j++, i--
    ) {
      charArray[i] = characters[j];
    }
    queueSize += characters.length;
  }
  function shift() {
    const returnValue = charArray[charArray.length - 1];
    queueSize--;
    for (let i = charArray.length - 1, j = 0; j < queueSize; j++, i--) {
      charArray[i] = charArray[i - 1];
    }
    return returnValue;
  }
};

type EncodeSpaces = (charArray: string[], length: number) => void;

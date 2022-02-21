export const imperativeApproach: CompressString = (input) => {
  let compression = [];
  let currentCharacter: string | null = null;
  let currentCharacterCount = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentCharacter) {
      currentCharacterCount++;
    } else {
      if (currentCharacter !== null) {
        compression.push(currentCharacter, currentCharacterCount);
      }
      currentCharacter = input[i];
      currentCharacterCount = 1;
    }
  }
  if (currentCharacter !== null) {
    compression.push(currentCharacter, currentCharacterCount);
  }
  return compression.length < input.length ? compression.join("") : input;
};

type CompressString = (input: string) => string;

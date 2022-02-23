import { Decorator } from "../types/Decorator";
import compose from "../utils/compose";

const withEmptyStringHandler: Decorator<CompressString> = (method) => (input) =>
  input === "" ? input : method(input);
const withFinalCompressionCheck: Decorator<CompressString> =
  (compressString) => (input) =>
    finalCompressionCheck(input, compressString(input));
const finalCompressionCheck = (input: string, compressed: string) =>
  compressed.length < input.length ? compressed : input;
const withAllDecorators = compose<CompressString>(
  withFinalCompressionCheck,
  withEmptyStringHandler
);

export const imperativeApproach: CompressString = withAllDecorators((input) => {
  const iterator = input[Symbol.iterator]();
  let compression = [];
  let currentCharacter = iterator.next().value;
  let currentCharacterCount = 1;
  for (const character of iterator) {
    if (character === currentCharacter) {
      currentCharacterCount++;
    } else {
      compression.push(currentCharacter, currentCharacterCount);
      currentCharacter = character;
      currentCharacterCount = 1;
    }
  }
  compression.push(currentCharacter, currentCharacterCount);
  return compression.join("");
});

export const functionalApproach: CompressString = withAllDecorators(
  ([firstCharacter, ...rest]) =>
    flattenState(
      rest.reduce(reduceCharacterToState, createInitialState(firstCharacter))
    )
);
const reduceCharacterToState = (
  {
    compression,
    currentCharacter,
    currentCharacterCount,
  }: FunctionalApproachState,
  character: string
) =>
  character === currentCharacter
    ? {
        compression,
        currentCharacter,
        currentCharacterCount: currentCharacterCount + 1,
      }
    : {
        compression: appendCharacter(
          compression,
          currentCharacter,
          currentCharacterCount
        ),
        currentCharacter: character,
        currentCharacterCount: 1,
      };
const appendCharacter = (
  compression: (string | number)[],
  character: string,
  count: number
) => compression.concat(character, count);
const flattenState = ({
  compression,
  currentCharacter,
  currentCharacterCount,
}: FunctionalApproachState) =>
  appendCharacter(compression, currentCharacter, currentCharacterCount).join(
    ""
  );
const createInitialState = (firstCharacter: string) => ({
  compression: [],
  currentCharacter: firstCharacter,
  currentCharacterCount: 1,
});
type FunctionalApproachState = {
  compression: (string | number)[];
  currentCharacter: string;
  currentCharacterCount: number;
};

type CompressString = (input: string) => string;

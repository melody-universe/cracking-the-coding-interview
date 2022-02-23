import { Decorator } from "../types/Decorator";
import compose from "../utils/compose";
import { using } from "../utils/using";

const withEmptyStringHandler: Decorator<CompressString> = (method) => (input) =>
  input === "" ? input : method(input);
const withFinalCompressionCheck: Decorator<CompressString> =
  (method) => (input) =>
    using(method(input), (compressed) =>
      compressed.length < input.length ? compressed : input
    );
const withAllDecorators = compose<CompressString>(
  withFinalCompressionCheck,
  withEmptyStringHandler
);

export const imperativeApproach: CompressString = withAllDecorators((input) => {
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
  compression.push(currentCharacter!, currentCharacterCount);
  return compression.join("");
});

export const functionalApproach: CompressString = withAllDecorators((input) =>
  using(
    [...input].reduce(addCharacterToState, initialState),
    ({ compression, currentCharacter, currentCharacterCount }) =>
      appendCharacter(
        compression,
        currentCharacter!,
        currentCharacterCount
      ).join("")
  )
);
const addCharacterToState = (
  {
    compression,
    currentCharacter,
    currentCharacterCount,
  }: FunctionalApproachState,
  character: string
) =>
  character === currentCharacter
    ? bumpCharacterCount({
        compression,
        currentCharacter,
        currentCharacterCount,
      })
    : setCurrentCharacter(
        { compression, currentCharacter, currentCharacterCount },
        character
      );
const bumpCharacterCount = ({
  currentCharacterCount,
  ...state
}: FunctionalApproachState) => ({
  currentCharacterCount: currentCharacterCount + 1,
  ...state,
});
const setCurrentCharacter = (
  {
    compression,
    currentCharacter,
    currentCharacterCount,
  }: FunctionalApproachState,
  character: string
) => ({
  compression:
    currentCharacter === null
      ? compression
      : appendCharacter(compression, currentCharacter, currentCharacterCount),
  currentCharacter: character,
  currentCharacterCount: 1,
});
const appendCharacter = (
  compression: any[],
  character: string,
  count: number
) => compression.concat(character, count);
const initialState: FunctionalApproachState = {
  compression: [],
  currentCharacter: null,
  currentCharacterCount: 0,
};
type FunctionalApproachState = {
  compression: any[];
  currentCharacter: string | null;
  currentCharacterCount: number;
};

type CompressString = (input: string) => string;

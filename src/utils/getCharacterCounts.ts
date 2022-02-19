import buildCharacterMap from "./buildCharacterMap";

const usingForLoop: GetCharacterCounts = (input) => {
  const counts: CharacterCounts = {};
  for (const char of input) {
    if (char in counts) {
      counts[char]++;
    } else {
      counts[char] = 1;
    }
  }
  return counts;
};

const asPureFunction: GetCharacterCounts = (input) =>
  buildCharacterMap(input, (count) => (count ?? 0) + 1);

export const implementations = { usingForLoop, asPureFunction };
const getCharacterCounts = asPureFunction;
export default getCharacterCounts;

type GetCharacterCounts = (input: string) => CharacterCounts;
type CharacterCounts = { [char: string]: number };

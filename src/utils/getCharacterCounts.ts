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
  [...input].reduce<CharacterCounts>(
    (counts, character) => ({
      ...counts,
      [character]: (counts[character] ?? 0) + 1,
    }),
    {}
  );

export const implementations = { usingForLoop, asPureFunction };
const getCharacterCounts = asPureFunction;
export default getCharacterCounts;

export type GetCharacterCounts = (input: string) => CharacterCounts;
type CharacterCounts = { [char: string]: number };

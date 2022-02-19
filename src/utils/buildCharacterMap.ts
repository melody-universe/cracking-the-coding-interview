const buildCharacterMap = <T>(
  input: string,
  reducer: (prevValue: T | undefined) => T
) =>
  [...input].reduce<{ [character: string]: T }>(
    (map, character) => ({
      ...map,
      [character]: reducer(map[character]),
    }),
    {}
  );
export default buildCharacterMap;

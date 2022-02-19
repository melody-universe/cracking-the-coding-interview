import buildCharacterMap from "./buildCharacterMap";

/**
 * returns a map indicating whether each character in the string occurs an
 * odd (true) or even (false) number of times.
 */
const getCharacterParities = (input: string) =>
  buildCharacterMap(input, (isOdd: boolean | undefined) => !isOdd);
export default getCharacterParities;

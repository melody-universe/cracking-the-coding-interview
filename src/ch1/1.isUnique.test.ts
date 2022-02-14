import getObjectKeys from "../getObjectKeys";
import * as implementations from "./1.isUnique";

getObjectKeys(implementations).forEach((name) =>
  describe(`isUnique (${name})`, () => {
    const isUnique = implementations[name];
    test("returns true for an empty string", () => {
      const result = isUnique("");

      expect(result).toEqual(true);
    });

    test("returns false when given a string with duplicates", () => {
      const result = isUnique("aa");

      expect(result).toEqual(false);
    });

    test("returns true when given a string of unique characters", () => {
      const result = isUnique("abcdefg");

      expect(result).toEqual(true);
    });

    test("returns false when given a string with duplicate emojis", () => {
      const result = isUnique("🤓🤓");

      expect(result).toEqual(false);
    });

    test("returns true when given a string with unique emojis", () => {
      const result = isUnique("🤓☕");

      expect(result).toEqual(true);
    });
  })
);

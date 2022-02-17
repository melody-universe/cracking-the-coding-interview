import getObjectKeys from "../utils/getObjectKeys";
import * as implementations from "./3.encodeSpaces";

getObjectKeys(implementations).forEach((name) =>
  describe(name, () => {
    const encodeSpaces = implementations[name];
    test("array without spaces is not mutated", () => {
      const charArray = ["a", "b", "c"];
      const copy = [...charArray];

      encodeSpaces(charArray, 3);

      expect(charArray).toEqual(copy);
    });

    test('spaces are encoded using "%20"', () => {
      const charArray = [..."Ms Melody Universe    "];

      encodeSpaces(charArray, 18);

      expect(charArray).toEqual([..."Ms%20Melody%20Universe"]);
    });

    test("doesn't keep encoding after having met the designated length", () => {
      const charArray = [..."a b c      "];

      encodeSpaces(charArray, 5);

      expect(charArray.slice(0, 9)).toEqual([..."a%20b%20c"]);
    });

    test("can keep track of a lot of spaces without truncating the string", () => {
      const charArray = [..."      a            "];

      encodeSpaces(charArray, 7);

      expect(charArray).toEqual([..."%20%20%20%20%20%20a"]);
    });
  })
);

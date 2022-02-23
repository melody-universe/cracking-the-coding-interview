export const stringRotation = (string1: string, string2: string) =>
  isSubstring(string1, string2 + string2);

const isSubstring = (string1: string, string2: string) =>
  string2.indexOf(string1) > -1;

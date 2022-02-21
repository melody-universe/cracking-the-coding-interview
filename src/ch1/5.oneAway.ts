import { using } from "../utils/using";

const withBranching: (branches: OneAwayBranches) => OneAway =
  ([oneSwap, oneRemoval]) =>
  (original, edited) =>
    original === edited
      ? true
      : original.length === edited.length
      ? oneSwap(original, edited)
      : Math.abs(original.length - edited.length) > 1
      ? false
      : edited.length > original.length
      ? oneRemoval(edited, original)
      : oneRemoval(original, edited);

export const imperativeApproach: OneAway = withBranching([
  (original, edited) => {
    let swappedOne = false;
    for (let i = 0; i < original.length; i++) {
      if (original[i] !== edited[i]) {
        if (swappedOne) {
          return false;
        } else {
          swappedOne = true;
        }
      }
    }
    return true;
  },
  (original, edited) => {
    let skippedOne = false;
    for (let i = 0; i < original.length; i++) {
      if (i === original.length - 1 && !skippedOne) {
        return true;
      }
      const offset = skippedOne ? 1 : 0;
      if (original[i] !== edited[i - offset]) {
        if (skippedOne) {
          return false;
        } else {
          skippedOne = true;
        }
      }
    }
    return true;
  },
]);

export const functionalApproach = withBranching([
  (original, edited) =>
    using<number, boolean>(findDiscrepancyIndex(original, edited))(
      (discrepancyIndex) =>
        original.slice(discrepancyIndex + 1) ===
        edited.slice(discrepancyIndex + 1)
    ),
  (original, edited) =>
    using<number, boolean>(findDiscrepancyIndex(original, edited))(
      (discrepancyIndex) =>
        original.slice(discrepancyIndex + 1) === edited.slice(discrepancyIndex)
    ),
]);
const findDiscrepancyIndex = (original: string, edited: string) =>
  [...original].findIndex((character, index) => character !== edited[index]);

export const optimizedImperativeApproach = (() => {
  return withBranching([
    (original, edited) => {
      const discrepancyIndex = findDiscrepancyIndex(original, edited);
      return (
        original.slice(discrepancyIndex! + 1) ===
        edited.slice(discrepancyIndex + 1)
      );
    },
    (original, edited) => {
      const discrepancyIndex = findDiscrepancyIndex(original, edited);
      return (
        original.slice(discrepancyIndex + 1) === edited.slice(discrepancyIndex)
      );
    },
  ]);

  function findDiscrepancyIndex(original: string, edited: string) {
    for (let i = 0; i < original.length; i++) {
      if (original[i] !== edited[i]) {
        return i;
      }
    }
    throw new Error("could not find a discrepancy");
  }
})();

type OneAway = (original: string, edited: string) => boolean;
type OneAwayBranches = [oneSwap: OneAway, oneRemoval: OneAway];

export const imperativeApproach: OneAway = (original, edited) => {
  if (original.length === edited.length) {
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
  } else if (edited.length > original.length) {
    return imperativeApproach(edited, original);
  } else if (original.length - edited.length > 1) {
    return false;
  } else {
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
  }
};

type OneAway = (original: string, edited: string) => boolean;

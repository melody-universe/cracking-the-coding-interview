/// O((mn)^2)
export const usingMapSlow: ZeroMatrix = (matrix) =>
  matrix.map((row, y) =>
    row.map((value, x) =>
      row.some((rowValue) => rowValue === 0) ||
      matrix.some((_, y) => matrix[y][x] === 0)
        ? 0
        : value
    )
  );

/// O(mn)
export const usingMapFast: ZeroMatrix = (matrix) =>
  mapZeroSets(matrix, createZeroSets(matrix));
const mapZeroSets = (matrix: number[][], { zeroColumns, zeroRows }: ZeroSets) =>
  matrix.map((row, y) =>
    row.map((value, x) => (y in zeroRows || x in zeroColumns ? 0 : value))
  );

/// O(mn)
export const applyZeroSets: ZeroMatrix = (matrix) => {
  const { zeroColumns, zeroRows } = createZeroSets(matrix);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (x in zeroColumns || y in zeroRows) {
        matrix[y][x] = 0;
      }
    }
  }
  return matrix;
};

const createZeroSets = (matrix: number[][]) =>
  matrix.reduce(
    (zeroSets, row, y) =>
      row.reduce(
        ({ zeroColumns, zeroRows }, value, x) =>
          value === 0
            ? {
                zeroColumns: { ...zeroColumns, [x]: true },
                zeroRows: { ...zeroRows, [y]: true },
              }
            : { zeroColumns, zeroRows },
        zeroSets
      ),
    { zeroColumns: {}, zeroRows: {} } as ZeroSets
  );
type ZeroSets = { zeroColumns: NumberBooleanMap; zeroRows: NumberBooleanMap };
type NumberBooleanMap = { [key: number]: boolean };

type ZeroMatrix = (matrix: number[][]) => number[][];

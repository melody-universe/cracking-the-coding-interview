export const usingMap: RotateMatrix = (matrix) =>
  matrix.map((row, y) => row.map((_, x) => matrix[matrix.length - 1 - x][y]));

export const inPlace: RotateMatrix = (matrix) => {
  for (let y = 0; y < Math.ceil(matrix.length / 2); y++) {
    for (let x = 0; x < Math.floor(matrix[y].length / 2); x++) {
      let temp = matrix[y][x];
      matrix[y][x] = matrix[matrix.length - 1 - x][y];
      matrix[matrix.length - 1 - x][y] =
        matrix[matrix.length - 1 - y][matrix.length - 1 - x];
      matrix[matrix.length - 1 - y][matrix.length - 1 - x] =
        matrix[x][matrix.length - 1 - y];
      matrix[x][matrix.length - 1 - y] = temp;
    }
  }
  return matrix;
};

type RotateMatrix = (matrix: number[][]) => number[][];

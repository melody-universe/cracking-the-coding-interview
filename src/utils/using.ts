export const using: <T, U>(value: T, method: (input: T) => U) => U = (
  value,
  method
) => method(value);

const getObjectValues = <T>(input: T) =>
  Object.values(input) as Array<T[keyof T]>;
export default getObjectValues;

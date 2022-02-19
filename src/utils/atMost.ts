const atMost = <T>(
  collection: Array<T>,
  count: number,
  condition: (value: T) => boolean
) => {
  let matches = 0;
  return collection.every((value) => !condition(value) || matches++ < count);
};
export default atMost;

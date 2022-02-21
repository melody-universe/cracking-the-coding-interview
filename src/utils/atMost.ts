const atMost =
  <T = boolean>(count: number, condition?: (value: T) => boolean) =>
  (collection: Array<T>) => {
    let matches = 0;
    return collection.every(
      (value) =>
        !(condition ? condition(value) : Boolean(value)) || matches++ < count
    );
  };
export default atMost;

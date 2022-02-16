const isPrimitive = (input: any) =>
  input == null || ["function", "object"].indexOf(typeof input) === -1;
export default isPrimitive;

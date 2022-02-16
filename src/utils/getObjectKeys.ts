const getObjectKeys = <T>(input: T) => Object.keys(input) as Array<keyof T>;
export default getObjectKeys;

export default function getObjectKeys<T>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

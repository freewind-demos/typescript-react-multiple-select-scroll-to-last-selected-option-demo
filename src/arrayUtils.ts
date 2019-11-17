export function isEmptyArray(array: any[]): boolean {
  return array.length === 0;
}

export function lastItem<T>(array: T[]): T | undefined {
  if (isEmptyArray(array)) {
    return undefined;
  } else {
    return array[array.length - 1];
  }
}

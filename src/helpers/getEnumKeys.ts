// Get array of enum keys
export const getEnumKeys = <T extends Record<string, string>>(
  enumObj: T
): (keyof T)[] => {
  const keys: (keyof T)[] = Object.keys(enumObj) as (keyof T)[];
  return keys;
};

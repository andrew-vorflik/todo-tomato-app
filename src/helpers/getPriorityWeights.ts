import { priorityE } from "../types";

type TPriorityWeight = {
  [key in priorityE]: number; // priority keys
};

type TPriorityKeys = keyof typeof priorityE;

// Get array of enum keys
export const getEnumKeys = <T extends Record<string, string>>(
  enumObj: T
): (keyof T)[] => {
  const keys: (keyof T)[] = Object.keys(enumObj) as (keyof T)[];
  return keys;
};

// Create an object with keys - priority keys from enum, and their equivalent numeric values
const createPriorityWeightObj = (
  priorityKeys: TPriorityKeys[]
): TPriorityWeight => {
  const priorityWeights: TPriorityWeight = priorityKeys.reduce(
    (obj: TPriorityWeight, priorityName: TPriorityKeys, index: number) => {
      obj[priorityName] = index + 1;
      return obj;
    },
    {} as TPriorityWeight
  );

  return priorityWeights;
};

const getPriorityWeights = (): TPriorityWeight => {
  const priorityValues = getEnumKeys(priorityE);
  const priorityWeights = createPriorityWeightObj(priorityValues);

  return priorityWeights;
};

export const priorityWeights = getPriorityWeights();

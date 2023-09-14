import { EPriority } from "../../enums/priority";
import { getEnumKeys } from "./getEnumKeys";

type TPriorityWeight = {
  [key in EPriority]: number;
};

type TPriorityKeys = keyof typeof EPriority;

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
  const priorityValues = getEnumKeys(EPriority);
  const priorityWeights = createPriorityWeightObj(priorityValues);

  return priorityWeights;
};

export const priorityWeights = getPriorityWeights();

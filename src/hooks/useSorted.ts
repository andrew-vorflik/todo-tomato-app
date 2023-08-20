import { ESortValues } from "../App";
import { priorityWeights } from "../helpers/getPriorityWeights";
import { TTodo } from "./useTodos";

type TUseSortedTodosParams = {
  sort: keyof typeof ESortValues | null;
  todos: TTodo[];
};

type TUseSortedTodos = (params: TUseSortedTodosParams) => TTodo[];

type TSortFn = (todo1: TTodo, todo2: TTodo) => number;

type TSortMethods = {
  [key in ESortValues]: TSortFn;
};

export const useSortedTodos: TUseSortedTodos = ({ sort, todos }) => {
  if (!sort) {
    return todos;
  }

  const sortByAlphabet = (todo1: TTodo, todo2: TTodo): number => {
    return todo1.title.toLowerCase() > todo2.title.toLowerCase() ? 1 : -1;
  };

  const sortByPriorityAscending = (todo1: TTodo, todo2: TTodo): number => {
    return priorityWeights[todo1.priority] - priorityWeights[todo2.priority];
  };
  const sortByPriorityDescending = (todo1: TTodo, todo2: TTodo): number => {
    return priorityWeights[todo2.priority] - priorityWeights[todo1.priority];
  };

  const sortMethods: TSortMethods = {
    [ESortValues.ALPHABET]: sortByAlphabet,
    [ESortValues.PRIORITYASCENDING]: sortByPriorityAscending,
    [ESortValues.PRIORITYDESCENDING]: sortByPriorityDescending,
  };

  const sortTodos = (todos: TTodo[]): TTodo[] => {
    return [...todos].sort(sortMethods[sort]);
  };

  const sortedTodos: TTodo[] = sortTodos(todos);

  return sortedTodos;
};

import { MultiValue } from "react-select";
import { EFilterValues, TFilterOption } from "../App";
import { TTodo } from "./useTodos";
import { getEnumKeys } from "../helpers/getPriorityWeights";
import { priorityE } from "../types";

type TFilterKeys = keyof typeof EFilterValues;

type TCheckIsFIlterApplied = {
  [key in EFilterValues]: (filters: MultiValue<TFilterOption>) => boolean;
};

type TFilterTodosFns = {
  [key in EFilterValues]: (todos: TTodo[]) => TTodo[];
};

type TUseFilterParams = {
  filters: MultiValue<TFilterOption>;
  todos: TTodo[];
};

type TUseFilter = (params: TUseFilterParams) => TTodo[];

export const useFilter: TUseFilter = ({ todos, filters }) => {
  if (filters.length === 0) {
    return todos;
  }

  const filterKeys = getEnumKeys(EFilterValues);

  // Create an object from enum keys with functions which check is filter was applied
  const checkIsFIlterApplied = filterKeys.reduce(
    (obj: TCheckIsFIlterApplied, filterName: TFilterKeys) => {
      obj[filterName] = (filters: MultiValue<TFilterOption>) => {
        const isFilterChose = filters.find(
          (filter) => filter.value === filterName
        );
        return Boolean(isFilterChose);
      };

      return obj;
    },
    {} as TCheckIsFIlterApplied
  );

  // Create an object with functions containing filter logic
  const filterTodosFns: TFilterTodosFns = {
    [EFilterValues.DONE]: (todos) => {
      return todos.filter((todo) => todo.isDone);
    },
    [EFilterValues.NOT_DONE]: (todos) => {
      return todos.filter((todo) => !todo.isDone);
    },
    [EFilterValues.HIGH_PRIORITY]: (todos) => {
      return todos.filter((todo) => todo.priority === priorityE.HIGH);
    },
    [EFilterValues.MEDIUM_PRIORITY]: (todos) => {
      return todos.filter((todo) => todo.priority === priorityE.MEDIUM);
    },
    [EFilterValues.NORMAL_PRIORITY]: (todos) => {
      return todos.filter((todo) => todo.priority === priorityE.NORMAL);
    },
  };

  const filterTodos = (filters: MultiValue<TFilterOption>): TTodo[] => {
    let filteringTodos: TTodo[] = [...todos];

    // Go through filters array applying every checked filter
    filters.forEach((filter) => {
      if (checkIsFIlterApplied[filter.value](filters)) {
        filteringTodos = filterTodosFns[filter.value](filteringTodos);
      }
    });

    return filteringTodos;
  };

  const filteredTodos: TTodo[] = filterTodos(filters);

  return filteredTodos;
};

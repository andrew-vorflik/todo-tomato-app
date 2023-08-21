import { EFilterValues } from "../../../enums";
import { TFilterState } from "../../../App";
import { EPriority } from "../../../enums/priority";
import { getEnumKeys } from "../../../helpers/getEnumKeys";
import { TTodo } from "../../../types";

type TUseFilterParams = {
  filters: TFilterState;
  todos: TTodo[];
};

type TUseFilter = (params: TUseFilterParams) => TTodo[];

type TFilterKeys = keyof typeof EFilterValues;

type TCheckIsFIlterApplied = {
  [key in EFilterValues]: (filters: TFilterState) => boolean;
};

type TFilterTodosFns = {
  [key in EFilterValues]: (todos: TTodo[]) => TTodo[];
};

export const useFilteredTodos: TUseFilter = ({ todos, filters }) => {
  if (filters.length === 0) {
    return todos;
  }

  const filterKeys = getEnumKeys(EFilterValues);

  // Create an object from enum keys with functions which check is filter was applied
  const checkIsFIlterApplied = filterKeys.reduce(
    (obj: TCheckIsFIlterApplied, filterName: TFilterKeys) => {
      obj[filterName] = (filters: TFilterState) => {
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
      return todos.filter((todo) => todo.priority === EPriority.HIGH);
    },
    [EFilterValues.MEDIUM_PRIORITY]: (todos) => {
      return todos.filter((todo) => todo.priority === EPriority.MEDIUM);
    },
    [EFilterValues.NORMAL_PRIORITY]: (todos) => {
      return todos.filter((todo) => todo.priority === EPriority.NORMAL);
    },
  };

  const filterTodos = (filters: TFilterState): TTodo[] => {
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

import { MultiValue } from "react-select";
import { TFilterOption, TSortState } from "../App";
import { TTodo } from "./useTodos";
import { useFilter } from "./useFilter";
import { useSortedTodos } from "./useSorted";
import { useSearch } from "./useSearch";

type TSortedFilteredSearchedParams = {
  sort: TSortState;
  filters: MultiValue<TFilterOption>;
  search: string;
  todos: TTodo[];
};

type TUseSearchedFilteredSearchedTodos = (
  params: TSortedFilteredSearchedParams
) => TTodo[];

export const useSearchedFilteredSearchedTodos: TUseSearchedFilteredSearchedTodos =
  ({ sort, filters, search, todos }) => {
    const filteredTodos = useFilter({ filters, todos });

    const filteredAndSortedTodos = useSortedTodos({
      sort: sort?.value || null,
      todos: filteredTodos,
    });

    const filteredSortedSearchedTodos = useSearch({
      search,
      todos: filteredAndSortedTodos,
    });

    return filteredSortedSearchedTodos;
  };

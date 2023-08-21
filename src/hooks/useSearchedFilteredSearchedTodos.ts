import { TFilterState, TSortState } from "../App";
import { useFilteredTodos } from "../components/Filter/hooks/useFilteredTodos";
import { useSortedTodos } from "../components/Sort/hooks/useSortedTodos";
import { useSearchedTodos } from "../components/Search/hooks/useSearchedTodos";
import { TTodo } from "../types";

type TSortedFilteredSearchedParams = {
  sort: TSortState;
  filters: TFilterState;
  search: string;
  todos: TTodo[];
};

type TUseSearchedFilteredSearchedTodos = (
  params: TSortedFilteredSearchedParams
) => TTodo[];

export const useSearchedFilteredSearchedTodos: TUseSearchedFilteredSearchedTodos =
  ({ sort, filters, search, todos }) => {
    const filteredTodos = useFilteredTodos({ filters, todos });

    const filteredAndSortedTodos = useSortedTodos({
      sort: sort?.value || null,
      todos: filteredTodos,
    });

    const filteredSortedSearchedTodos = useSearchedTodos({
      search,
      todos: filteredAndSortedTodos,
    });

    return filteredSortedSearchedTodos;
  };

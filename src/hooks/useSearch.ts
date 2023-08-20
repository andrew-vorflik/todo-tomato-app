import { useState, useEffect } from "react";
import { TTodo } from "./useTodos";
import { useDebouncedValue } from "./useDebounced";

type useSearchParams = {
  search: string;
  todos: TTodo[];
};

type TUseSearch = (params: useSearchParams) => TTodo[];

export const useSearch: TUseSearch = ({ search, todos }) => {
  const [searchedTodos, setSearchedTodos] = useState<TTodo[]>(todos);
  const debouncedSearch = useDebouncedValue(search);

  const onSearchTodo = (search: string): void => {
    const searchedTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchedTodos(searchedTodos);
  };

  // Quick exit if no search value
  useEffect(() => {
    if (!search) {
      setSearchedTodos(todos);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, todos]);

  // Search todo with debounced value
  useEffect(() => {
    onSearchTodo(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return searchedTodos;
};

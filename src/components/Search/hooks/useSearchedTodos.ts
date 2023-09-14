import { useState, useEffect } from "react";
import { useDebouncedValue } from "../../../utils/hooks/useDebounced";
import { TTodo } from "../../../types";

type useSearchParams = {
  search: string;
  todos: TTodo[];
};

type TUseSearch = (params: useSearchParams) => TTodo[];

export const useSearchedTodos: TUseSearch = ({ search, todos }) => {
  const [searchedTodos, setSearchedTodos] = useState<TTodo[]>(todos);
  const debouncedSearch = useDebouncedValue(search);

  const onSearchTodo = (search: string): void => {
    const searchedTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchedTodos(searchedTodos);
  };

  // Search todo with debounced value
  useEffect(() => {
    onSearchTodo(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return Boolean(search) ? searchedTodos : todos;
};

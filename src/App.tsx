import { useState } from "react";
import { Container } from "react-bootstrap";
import { MultiValue } from "react-select";
import { FormTodoInput } from "./components/FormTodoInput/FormTodoInput";
import { useTodos } from "./utils/hooks/useTodos";
import { useSearchedFilteredSearchedTodos } from "./utils/hooks/useSearchedFilteredSearchedTodos";
import { EFilterValues, ESortValues } from "./enums";
import { Sort } from "./components/Sort/Sort";
import { Filter } from "./components/Filter/Filter";
import { Search } from "./components/Search/Search";
import { TOption } from "./types";
import { Todos } from "./components/Todos/Todos";
import {
  TOnChangePriorityTodo,
  TOnCreateTodo,
  TOnDeleteTodo,
  TOnDoneTodo,
  TOnDragTodo,
  TOnEditTodo,
  TOnFilter,
  TOnSearch,
  TOnSort,
} from "./types/handlers";
import { Filters } from "./components/Filters/Filters";

export type TSortOption = TOption & {
  value: ESortValues;
};

export type TFilterOption = TOption & {
  value: EFilterValues;
};

export type TSortState = TSortOption | null;
export type TFilterState = MultiValue<TFilterOption>;

function App() {
  //
  // Hooks
  //
  const [sort, setSort] = useState<TSortState>(null);
  const [filters, setFilter] = useState<TFilterState>([]);
  const [search, setSearch] = useState("");

  const {
    // isLoading,
    todos,
    createTodo,
    editTodo,
    deleteTodo,
    doneTodo,
    changePriorityTodo,
    changePositionTodo,
  } = useTodos();

  const filteredSortedSearchedTodos = useSearchedFilteredSearchedTodos({
    sort,
    filters,
    search,
    todos,
  });

  //
  // Handlers
  //
  const onCreateTodo: TOnCreateTodo = (title) => {
    createTodo(title);
  };

  const onDeleteTodo: TOnDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const onEditTodo: TOnEditTodo = (id, title) => {
    editTodo(id, title);
  };

  const onDoneTodo: TOnDoneTodo = (id) => {
    doneTodo(id);
  };

  const onChangePriorityTodo: TOnChangePriorityTodo = async (id, priority) => {
    changePriorityTodo(id, priority);
  };

  //
  // Filters
  //
  const onSort: TOnSort = (newOption) => {
    setSort(newOption);
  };

  const onFilter: TOnFilter = (newOptions) => {
    setFilter(newOptions);
  };

  const onSearch: TOnSearch = (search) => {
    setSearch(search);
  };

  //
  // Drag'n'Drop
  //
  const onDrag: TOnDragTodo = (result) => {
    changePositionTodo(result);
  };

  return (
    <Container fluid="md">
      <h1>Beautiful Todo</h1>
      <FormTodoInput onCreateTodo={onCreateTodo} />
      <Filters
        sort={sort}
        filters={filters}
        search={search}
        onSort={onSort}
        onFilter={onFilter}
        onSearch={onSearch}
      />
      <Todos
        todos={filteredSortedSearchedTodos}
        onEdit={onEditTodo}
        onDelete={onDeleteTodo}
        onDone={onDoneTodo}
        onChangePriority={onChangePriorityTodo}
        onDrag={onDrag}
      />
    </Container>
  );
}

export default App;

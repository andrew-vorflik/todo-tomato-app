import { ChangeEvent, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { MultiValue } from "react-select";
import { Input } from "./components/Input/Input";
import { Todo } from "./components/Todo/Todo";
import { useTodos } from "./hooks/useTodos";
import { useSearchedFilteredSearchedTodos } from "./hooks/useSearchedFilteredSearchedTodos";
import { EFilterValues, ESortValues } from "./enums";
import { Sort } from "./components/Sort/Sort";
import { Filter } from "./components/Filter/Filter";
import { Search } from "./components/Search/Search";
import { EPriority } from "./enums/priority";
import { TOption, TTodo } from "./types";

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
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [sort, setSort] = useState<TSortState>(null);
  const [filters, setFilter] = useState<TFilterState>([]);
  const [search, setSearch] = useState("");

  const {
    isLoading,
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

  const onChangeTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  //
  // Handlers
  //
  const onCreateTodo = (title: string) => {
    createTodo(title);
    setNewTodoTitle("");
  };

  const onDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const onEditTodo = (id: string, title: string) => {
    editTodo(id, title);
  };

  const onDoneTodo = (id: string) => {
    doneTodo(id);
  };

  const onChangePriority = async (id: string, priority: EPriority) => {
    changePriorityTodo(id, priority);
  };

  //
  // Filters
  //
  const onChangeSort = (newOption: TSortState) => {
    setSort(newOption);
  };

  const onChangeFilter = (newOptions: TFilterState) => {
    setFilter(newOptions);
  };

  const onChangeSearch = (search: string) => {
    setSearch(search);
  };

  //
  // Drag'n'Drop
  //
  const onDragEnd = (result: DropResult) => {
    changePositionTodo(result);
  };

  return (
    <Container fluid="md">
      <h1>Beautiful Todo</h1>
      <Input
        value={newTodoTitle}
        onChange={onChangeTodoTitle}
        onCreateTodo={onCreateTodo}
      />

      <Sort value={sort} onChange={onChangeSort} />
      <Filter values={filters} onChange={onChangeFilter} />
      <Search value={search} onChange={onChangeSearch} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-droppable">
          {(provided) => (
            <ListGroup
              as="ol"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {isLoading && <h2>Loading...</h2>}

              {/* {!!error && <h2>Ooooops... Something went wrong :( {error}</h2>} */}
              {filteredSortedSearchedTodos.map((todo: TTodo, index: number) => (
                <Todo
                  {...todo}
                  key={`${todo.title}-${index}`}
                  onDelete={onDeleteTodo}
                  onDone={onDoneTodo}
                  onEdit={onEditTodo}
                  onChangePriority={onChangePriority}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}

export default App;

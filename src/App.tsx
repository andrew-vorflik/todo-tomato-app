import { ChangeEvent, useState } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MultiValue } from "react-select";
import { Input } from "./components/Input/Input";
import { Todo } from "./components/Todo/Todo";
import { priorityE } from "./types";
import { TTodo, useTodos } from "./hooks/useTodos";
import { Sort } from "./components/Sort/Sort";
import { Filter } from "./components/Filter/Filter";
import { useSearchedFilteredSearchedTodos } from "./hooks/useSearchedFilteredSearchedTodos";

export enum ESortValues {
  ALPHABET = "ALPHABET",
  PRIORITYASCENDING = "PRIORITYASCENDING",
  PRIORITYDESCENDING = "PRIORITYDESCENDING",
}

export enum EFilterValues {
  DONE = "DONE",
  NOT_DONE = "NOT_DONE",
  HIGH_PRIORITY = "HIGH_PRIORITY",
  MEDIUM_PRIORITY = "MEDIUM_PRIORITY",
  NORMAL_PRIORITY = "NORMAL_PRIORITY",
}

// TODO extract into hook useFilter
export type TOption = {
  label: string;
  value: string;
};
export type TSortOption = {
  label: string;
  value: keyof typeof ESortValues;
};

export type TFilterOption = {
  label: string;
  value: keyof typeof EFilterValues;
};

// export type TOptionState = SingleValue<TOption> | MultiValue<TOption[]> | null;
export type TSortState = TSortOption | null;
export type TFilterState = MultiValue<TFilterOption[]> | null;

const sortedOptions: TSortState[] = [
  {
    label: "Alphabet",
    value: ESortValues.ALPHABET,
  },
  {
    label: "Priority (Ascending)",
    value: ESortValues.PRIORITYASCENDING,
  },
  {
    label: "Priority (Descending)",
    value: ESortValues.PRIORITYDESCENDING,
  },
];

const filterOptions: MultiValue<TFilterOption> = [
  {
    label: "Done",
    value: EFilterValues.DONE,
  },
  {
    label: "Not done",
    value: EFilterValues.NOT_DONE,
  },
  {
    label: "High priority",
    value: EFilterValues.HIGH_PRIORITY,
  },
  {
    label: "Medium priority",
    value: EFilterValues.MEDIUM_PRIORITY,
  },
  {
    label: "Normal priority",
    value: EFilterValues.NORMAL_PRIORITY,
  },
];

function App() {
  //
  // Hooks
  //
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [sort, setSort] = useState<TSortState>(null);
  // TODO fix filter and sort types :( !!!!!
  const [filters, setFilter] = useState<MultiValue<TFilterOption>>([]);
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

  // TODO CHange args on object!!
  const onChangePriority = async (id: string, priority: priorityE) => {
    changePriorityTodo(id, priority);
  };

  //
  // Drag'n'Drop
  //
  // TODO fix any type
  const onDragEnd = (result: any) => {
    changePositionTodo(result);
  };

  const onChangeSort = (newOption: TSortState) => {
    setSort(newOption);
  };

  const onChangeFilter = (newOptions: MultiValue<TFilterOption>) => {
    setFilter(newOptions);
  };

  const onChangeSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <Container fluid="md">
      <h1>Beautiful Todo</h1>
      <Input
        value={newTodoTitle}
        onChange={onChangeTodoTitle}
        onCreateTodo={onCreateTodo}
      />
      <Sort<TSortState>
        value={sort}
        onChange={onChangeSort}
        options={sortedOptions}
      />
      <Filter<TFilterOption>
        values={filters}
        onChange={onChangeFilter}
        options={filterOptions}
      />
      <Form.Control
        value={search}
        onChange={(event) => onChangeSearch(event.target.value)}
        placeholder="Search todo..."
        className="me-2"
        type="search"
      />
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

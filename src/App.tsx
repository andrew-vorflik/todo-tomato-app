import { ChangeEvent, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { MultiValue, SingleValue } from "react-select";
import { Input } from "./components/Input/Input";
import { Todo } from "./components/Todo/Todo";
import { priorityE } from "./types";
import { TTodo, useTodos } from "./hooks/useTodos";
import { Sort } from "./components/Sort/Sort";
import { Filter } from "./components/Filter/Filter";
import { useSortedTodos } from "./hooks/useSorted";

export enum ESortValues {
  ALPHABET = "ALPHABET",
  PRIORITYASCENDING = "PRIORITYASCENDING",
  PRIORITYDESCENDING = "PRIORITYDESCENDING",
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

export type TOptionState = SingleValue<TOption> | MultiValue<TOption[]> | null;
export type TSortState = TSortOption | null;
export type TFilterState = MultiValue<TOption[]> | null;

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

const filterOptions: MultiValue<TOption> = [
  {
    label: "Alphabet",
    value: "alphabet",
  },
  {
    label: "Priority (Ascending)",
    value: "priorityAscending",
  },
  {
    label: "Priority (Descending)",
    value: "priorityDescending",
  },
];

function App() {
  //
  // Hooks
  //
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [sort, setSort] = useState<TSortState>(null);

  // TODO fix filter and sort types :( !!!!!
  const [filter, setFilter] = useState<MultiValue<TOption>>([]);
  const {
    isLoading,
    // error,
    todos,
    createTodo,
    editTodo,
    deleteTodo,
    doneTodo,
    changePriorityTodo,
    changePositionTodo,
  } = useTodos();
  const sortedTodos = useSortedTodos({ sort: sort?.value || null, todos });

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

  const onChangeFilter = (newOptions: MultiValue<TOption>) => {
    setFilter(newOptions);
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
      <Filter<TOption>
        values={filter}
        onChange={onChangeFilter}
        options={filterOptions}
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
              {sortedTodos.map((todo: TTodo, index: number) => (
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

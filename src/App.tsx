import { ChangeEvent, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Input } from "./components/Input/Input";
import { Todo } from "./components/Todo/Todo";
import { priorityE } from "./types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TodoT, useTodos } from "./hooks/useTodos";

function App() {
  //
  // Hooks
  //
  const {
    isLoading,
    error,
    todos,
    createTodo,
    editTodo,
    deleteTodo,
    doneTodo,
    changePriorityTodo,
    changePositionTodo,
  } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState("");

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

  return (
    <Container fluid="md">
      <h1>Beautiful Todo</h1>
      <Input
        value={newTodoTitle}
        onChange={onChangeTodoTitle}
        onCreateTodo={onCreateTodo}
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
              {todos.map((todo: TodoT, index: number) => (
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

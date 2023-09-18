import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { Todo } from "./Components/Todo/Todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { TTodo } from "../../types";
import type {
  TOnChangePriorityTodo,
  TOnDeleteTodo,
  TOnDoneTodo,
  TOnDragTodo,
  TOnEditTodo,
} from "../../types/handlers";

type TTodosProps = {
  todos: TTodo[];
  onEdit: TOnEditTodo;
  onDelete: TOnDeleteTodo;
  onDone: TOnDoneTodo;
  onChangePriority: TOnChangePriorityTodo;
  onDrag: TOnDragTodo;
};

export const Todos: FC<TTodosProps> = ({
  todos,
  onEdit,
  onDelete,
  onDone,
  onChangePriority,
  onDrag,
}) => {
  return (
    <DragDropContext onDragEnd={onDrag}>
      <Droppable droppableId="todo-droppable">
        {(provided) => (
          <ListGroup
            as="ol"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <Todo
                {...todo}
                key={todo.id}
                onDelete={onDelete}
                onDone={onDone}
                onEdit={onEdit}
                onChangePriority={onChangePriority}
                index={index}
              />
            ))}
            {provided.placeholder}
          </ListGroup>
        )}
      </Droppable>
    </DragDropContext>
  );
};

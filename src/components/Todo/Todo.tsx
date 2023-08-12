import React, { FC, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { isEnter, isEscape } from "../../helpers/keysVariantes";
import classes from "./Todo.module.scss";
import { PriorityDropdown } from "../PriorityDropdown/PriorityDropdown";
import { priorityE } from "../../types";
import { Draggable } from "react-beautiful-dnd";
import { TodoT } from "../../hooks/useTodos";
// import { PriorityDropdown } from "../PriorityDropdown/PriorityDropdown";

type TodoPropsT = TodoT & {
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onChangePriority: (id: string, priority: priorityE) => void;
  index: number;
};

export const Todo: FC<TodoPropsT> = (props) => {
  const {
    title,
    id,
    isDone,
    priority,
    onDelete,
    onDone,
    onEdit,
    onChangePriority,
    index,
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const onDeleteTodo = () => {
    return () => {
      onDelete(id);
    };
  };

  const onDoneTodo = () => {
    return () => {
      onDone(id);
    };
  };

  const onEditTodo = () => {
    return () => {
      setNewTitle(title);
      setIsEdit((prevValue) => !prevValue);
    };
  };

  const onChangePriorityTodo = () => {
    return (newPriority: priorityE) => onChangePriority(id, newPriority);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isEnter(event)) {
      onEdit(id, newTitle);
      setIsEdit(false);
    }

    if (isEscape(event)) {
      onEdit(id, title);
      setNewTitle(title);
      setIsEdit(false);
    }
  };

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <ListGroup.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          as="li"
          className={`d-flex justify-content-between todo-item ${
            classes[`todo-priority-${priority}`]
          } ${classes["todo-item"]}`}
        >
          <div
            className={`d-flex align-items-center w-50 ${
              isDone && classes.todo__done
            }`}
          >
            <Form.Check
              type="checkbox"
              id="default-checkbox"
              className="me-2"
              checked={isDone}
              onChange={onDoneTodo()}
            />
            {isEdit ? (
              <Form.Control
                type="text"
                placeholder="Enter new task..."
                className="w-100"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
                autoFocus
              />
            ) : (
              title
            )}
          </div>
          <div className={classes.optionsContainer}>
            <PriorityDropdown
              priority={priority}
              onChange={onChangePriorityTodo()}
            />
            <Button
              variant="outline-warning"
              size="sm"
              onClick={onEditTodo()}
              disabled={isDone}
            >
              <FiEdit />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={onDeleteTodo()}
              disabled={isDone}
            >
              <RiDeleteBin4Line />
            </Button>
          </div>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

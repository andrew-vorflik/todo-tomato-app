import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { TOnCreateTodo } from "../../types/handlers";

type FormTodoInputPropsT = {
  onCreateTodo: TOnCreateTodo;
};

export const FormTodoInput: FC<FormTodoInputPropsT> = ({ onCreateTodo }) => {
  const [title, setTitle] = useState("");

  const onChangeTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCreateTodo(title);
    setTitle("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3  d-flex justify-content-between">
        <Form.Control
          value={title}
          onChange={onChangeTodoTitle}
          placeholder="Write what you need to do..."
          className="me-2"
        />
        <Button type="submit">Add</Button>
      </Form.Group>
    </Form>
  );
};

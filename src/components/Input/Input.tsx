import { ChangeEvent, FC, FormEvent } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

type InputPropsT = {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onCreateTodo: (value: string) => void;
};

export const Input: FC<InputPropsT> = ({ value, onChange, onCreateTodo }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCreateTodo(value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3  d-flex justify-content-between">
        <Form.Control
          value={value}
          onChange={onChange}
          placeholder="Write what you need to do..."
          className="me-2"
        />
        <Button>Add</Button>
      </Form.Group>
    </Form>
  );
};

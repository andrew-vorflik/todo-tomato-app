import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { TOnSearch } from "../../types/handlers";

type TSearchProps = {
  value: string;
  onChange: TOnSearch;
};

export const Search: FC<TSearchProps> = ({ value, onChange }) => {
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      value={value}
      onChange={onChangeSearch}
      placeholder="Search todo..."
      className="me-2"
      type="search"
    />
  );
};

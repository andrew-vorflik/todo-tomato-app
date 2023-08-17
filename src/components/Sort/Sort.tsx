import ReactSelect, { ActionMeta, SingleValue } from "react-select";

type TSortProps<T> = {
  value: T;
  onChange: (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => void;
  options: T[];
};

export const Sort = <T,>({ value, onChange, options }: TSortProps<T>) => {
  return (
    <label>
      Sort by:
      <ReactSelect<T>
        options={options}
        value={value}
        onChange={onChange}
        isClearable
      />
    </label>
  );
};

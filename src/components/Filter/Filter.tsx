import ReactSelect, {
  ActionMeta,
  MultiValue,
  Options,
  OnChangeValue,
} from "react-select";

type TFilterProps<T> = {
  values: OnChangeValue<T, true>;
  onChange: (newValue: MultiValue<T>, actionMeta: ActionMeta<T>) => void;
  options: Options<T>;
};

export const Filter = <T,>({ values, onChange, options }: TFilterProps<T>) => {
  return (
    <label>
      Filter by:
      <ReactSelect<T, true>
        options={options}
        value={values}
        onChange={onChange}
        isClearable
        isMulti
      />
    </label>
  );
};

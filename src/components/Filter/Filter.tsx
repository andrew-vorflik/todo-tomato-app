import ReactSelect, { ActionMeta, OnChangeValue } from "react-select";
import { EFilterValues } from "../../enums";
import { TFilterOption, TFilterState } from "../../App";

type TFilterProps = {
  values: OnChangeValue<TFilterOption, true>;
  onChange: (
    newValue: TFilterState,
    actionMeta: ActionMeta<TFilterOption>
  ) => void;
};

const filterOptions: TFilterOption[] = [
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

export const Filter = ({ values, onChange }: TFilterProps) => {
  return (
    <label>
      Filter by:
      <ReactSelect<TFilterOption, true>
        options={filterOptions}
        value={values}
        onChange={onChange}
        isClearable
        isMulti
      />
    </label>
  );
};

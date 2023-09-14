import ReactSelect, { OnChangeValue } from "react-select";
import { EFilterValues } from "../../enums";
import { TFilterOption } from "../../App";
import { TOnFilter } from "../../types/handlers";

type TFilterProps = {
  values: OnChangeValue<TFilterOption, true>;
  onChange: TOnFilter;
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

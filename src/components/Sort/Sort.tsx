import ReactSelect from "react-select";
import { ESortValues } from "../../enums";
import { TSortState } from "../../App";
import { TOnSort } from "../../types/handlers";

type TSortProps = {
  value: TSortState;
  onChange: TOnSort;
};

const sortedOptions: TSortState[] = [
  {
    label: "Alphabet",
    value: ESortValues.ALPHABET,
  },
  {
    label: "Priority (Ascending)",
    value: ESortValues.PRIORITYASCENDING,
  },
  {
    label: "Priority (Descending)",
    value: ESortValues.PRIORITYDESCENDING,
  },
];

export const Sort = ({ value, onChange }: TSortProps) => {
  return (
    <label>
      Sort by:
      <ReactSelect<TSortState>
        options={sortedOptions}
        value={value}
        onChange={onChange}
        isClearable
      />
    </label>
  );
};

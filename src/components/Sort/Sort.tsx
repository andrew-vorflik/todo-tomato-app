import ReactSelect, { ActionMeta, SingleValue } from "react-select";
import { ESortValues } from "../../enums";
import { TSortState } from "../../App";

type TSortProps = {
  value: TSortState;
  onChange: (
    newValue: SingleValue<TSortState>,
    actionMeta: ActionMeta<TSortState>
  ) => void;
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

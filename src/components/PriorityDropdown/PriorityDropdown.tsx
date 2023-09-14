import React, { useRef, useState, FC } from "react";
import classes from "./PriorityDropdown.module.scss";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useClickOutside } from "../../utils/hooks/useClickOutside";
import { EPriority } from "../../enums/priority";

const priorityItems: EPriority[] = Object.values(EPriority);

type PriorityDropdownPropsT = {
  priority: EPriority;
  onChange: (value: EPriority) => void;
};

export const PriorityDropdown: FC<PriorityDropdownPropsT> = ({
  priority,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onSetPriority = (priority: EPriority) => {
    onChange(priority);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <div className={classes.dropdown__input} onClick={toggleDropdown}>
        <div className={classes[priority]} />
        <MdOutlineKeyboardArrowLeft className={isOpen ? classes.open : ""} />
      </div>
      {isOpen && (
        <ul className={classes.dropdown__options}>
          {priorityItems.map((priorityItem) => (
            <li
              className={classes.dropdown__item}
              key={priorityItem}
              onClick={() => onSetPriority(priorityItem)}
            >
              <div className={classes[priorityItem]} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

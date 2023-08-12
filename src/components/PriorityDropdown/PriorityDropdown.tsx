import React, { useRef, useState, FC } from "react";
import classes from "./PriorityDropdown.module.scss";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { priorityE } from "../../types";
import { useClickOutside } from "../../hooks/useClickOutside";

const priorityItems: priorityE[] = Object.values(priorityE);

type PriorityDropdownPropsT = {
  priority: priorityE;
  onChange: (value: priorityE) => void;
};

export const PriorityDropdown: FC<PriorityDropdownPropsT> = ({
  priority,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [priority, setPriority] = useState<priorityE>(priorityE.NORMAL);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onSetPriority = (priority: priorityE) => {
    onChange(priority);
    setIsOpen(false);
  };

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <div className={classes.dropdown__input} onClick={toggleDropdown}>
        <div className={classes[priority]} />
        <MdOutlineKeyboardArrowLeft className={isOpen ? classes.open : ""} />
        {/* <MdKeyboardArrowRight /> */}
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

import React, { FunctionComponent } from "react";

interface UserFilterElementProps {
  tag: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
  selectedTags: string[];
}

const UserFilterElement: FunctionComponent<UserFilterElementProps> = ({
  tag,
  setState,
  selectedTags,
}) => {
  return (
    <li
      key={tag}
      className="flex items-center justify-center bg-[#1a1a1a] border border-[#3a3a3a] w-1/2 h-16"
    >
      <label
        htmlFor={tag}
        className={`flex justify-center items-center text-center capitalize w-full h-full cursor-pointer ${
          selectedTags.includes(tag) ? "text-[#f90]" : "text-gray-200"
        }`}
      >
        <input
          type="checkbox"
          hidden
          id={tag}
          value={tag}
          onChange={(e) => {
            if (e.target.checked) {
              setState((prev: string[]) => [...prev, e.target.value]);
            } else {
              setState((prev: string[]) =>
                prev.filter((t) => t !== e.target.value)
              );
            }
          }}
        />
        <span>{tag}</span>
      </label>
    </li>
  );
};

export default UserFilterElement;

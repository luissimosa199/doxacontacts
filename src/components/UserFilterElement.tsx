import React, { FunctionComponent } from "react";

interface UserFilterElementProps {
  tag: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const UserFilterElement: FunctionComponent<UserFilterElementProps> = ({
  tag,
  setState,
}) => {
  return (
    <li
      key={tag}
      className="flex items-center justify-center bg-[#1a1a1a] border border-[#3a3a3a]  p-2 w-1/2 h-16"
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
      <label
        htmlFor={tag}
        className="ml-2 text-gray-200 text-center capitalize"
      >
        {tag}
      </label>
    </li>
  );
};

export default UserFilterElement;

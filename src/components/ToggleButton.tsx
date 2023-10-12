import { IconDefinition, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

interface ToggleButonProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: IconDefinition;
}

const ToggleButon: FunctionComponent<ToggleButonProps> = ({
  state,
  setState,
  icon = faPlus,
}) => {
  return (
    <button
      className={`border-2 w-10 rounded p-2 ${
        state ? "bg-gray-200" : "bg-white"
      } text-slate-600 transition`}
      onClick={(e) => {
        e.preventDefault();
        setState(!state);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ToggleButon;

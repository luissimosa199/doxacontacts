import { IconDefinition, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";

interface ToggleButonProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: IconDefinition;
  label?: string;
}

const ToggleButon: FunctionComponent<ToggleButonProps> = ({
  state,
  setState,
  icon = faPlus,
  label,
}) => {
  return (
    <button
      className={`rounded p-2 text-[#f90] transition flex gap-2 items-center`}
      onClick={(e) => {
        e.preventDefault();
        setState(!state);
      }}
    >
      <FontAwesomeIcon icon={icon} />
      {label && <span className="text-[#f90] font-semibold">{label}</span>}
    </button>
  );
};

export default ToggleButon;

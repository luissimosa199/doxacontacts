import { TimelineFormInputs } from "@/types";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FunctionComponent } from "react";
import { UseFormRegister } from "react-hook-form";

interface PhotoInput {
  handleUploadImages: (event: ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<TimelineFormInputs>;
  label?: string;
  variant?: "default" | "small";
  id?: string;
}

const PhotoInput: FunctionComponent<PhotoInput> = ({
  handleUploadImages,
  register,
  label,
  variant = "default",
  id = "photo",
}) => {
  return (
    <label
      htmlFor={id}
      className={`w-fit h-fit relative flex gap-2 items-center justify-center cursor-pointer`}
    >
      <i
        className={`w-4 h-4 text-lg text-[#f90] flex justify-center items-center`}
      >
        <FontAwesomeIcon icon={faPlus} />
      </i>
      <input
        accept="image/png, image/jpeg, video/mp4"
        className="absolute opacity-0 w-0 h-0"
        type="file"
        id={id}
        multiple
        {...(register ? register("photo") : {})}
        onChange={handleUploadImages}
      />
      {label && <span className="text-[#f90] font-semibold">{label}</span>}
    </label>
  );
};

export default PhotoInput;

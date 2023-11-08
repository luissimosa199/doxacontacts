import { noProfileImage } from "@/utils/noProfileImage";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

const UserPicture = ({ image, name }: { image: string; name: string }) => {
  const [fullScreenPic, setFullScreenPic] = useState<boolean>(false);
  return (
    <div className="px-12">
      <div className="flex flex-col relative">
        <div
          onClick={() => {
            setFullScreenPic(!fullScreenPic);
          }}
          className={`${
            fullScreenPic
              ? "w-screen h-screen absolute z-50"
              : "w-[150px] h-[150px]"
          }`}
        >
          <div
            className={`flex ${fullScreenPic ? "w-full" : "w-[150px]"}} ${
              fullScreenPic ? "h-full" : "h-[150px]"
            } flex-col items-center justify-center relative`}
          >
            <CldImage
              src={image || noProfileImage}
              fill
              alt={`${name}'s Avatar`}
              className={`object-cover absolute ${
                !fullScreenPic && "rounded-full"
              } border-2 border-gray-300 w-full`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPicture;

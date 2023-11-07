import React, { ChangeEvent, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadImages } from "@/utils/formHelpers";
import PhotoInput from "./PhotoInput";
import AdsSwitch from "./AdsSwitch";
import ProfileButtonsPanel from "./ProfileButtonsPanel";
import ProfileStats from "./ProfileStats";
import ProfileCategories from "./ProfileCategories";

const ProfileCard = () => {
  const [fullScreenPic, setFullScreenPic] = useState<boolean>(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const updateAvatarOnServer = async (avatarUrl: string) => {
    const response = await fetch(
      `/api/user/avatar/?username=${encodeURIComponent(
        session!.user!.email as string
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: avatarUrl }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `Server responded with ${response.status}`);
    }
    return response.json();
  };

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    queryClient.cancelQueries([session?.user?.email, "profilePicture"]);
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result as string);
        };
        reader.onerror = function () {
          reject(new Error("Failed to read the file"));
        };
        reader.readAsDataURL(file);
      });
      queryClient.setQueryData([session?.user?.email, "profilePicture"], {
        image: dataUrl,
      });
      const avatarArr = await uploadImages(event);
      const avatarUrl = avatarArr![0];
      await updateAvatarOnServer(avatarUrl);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around items-center rounded-lg p-6 bg-[#1a1a1a] shadow-lg">
      <div className="px-12">
        <div className="flex flex-col items-center relative ">
          <div
            onClick={() => {
              setFullScreenPic(!fullScreenPic);
            }}
            className={`${
              fullScreenPic
                ? "w-screen h-screen absolute z-50"
                : "w-[300px] h-[300px]"
            }`}
          >
            <ProfilePicture
              fullScreenPic={fullScreenPic}
              type="user"
              w={`${fullScreenPic ? "w-full" : "w-[300px]"}`}
              h={`${fullScreenPic ? "h-full" : "h-[300px]"}`}
            />
          </div>
          {!fullScreenPic && (
            <div className=" border-2 absolute bottom-2 left-2 bg-white h-12 w-12 rounded-full overflow-hidden flex justify-center">
              <PhotoInput
                handleUploadImages={handleChangeAvatar}
                variant="small"
                id="profilepicture"
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-center w-full">
        <p className="font-bold text-2xl my-3 text-white">
          {session?.user?.name}
        </p>
        <ProfileCategories username={session?.user?.email as string} />
        <ProfileStats />
        <div className="mx-auto flex flex-col justify-center max-[443px]:max-w-[11rem] min-[443px]:max-w-[20.7rem] min-[616px]:max-w-[30.5rem]">
          <ProfileButtonsPanel />
          <div className="flex justify-center text-white">
            <AdsSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

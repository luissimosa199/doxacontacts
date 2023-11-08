import React, { ChangeEvent, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadImages } from "@/utils/formHelpers";
import PhotoInput from "./PhotoInput";
import AdsSwitch from "./AdsSwitch";
import ProfileButtonsPanel from "./ProfileButtonsPanel";
import ProfileStats from "./ProfileStats";
import ProfileBio from "./ProfileBio";

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
    <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start bg-[#1a1a1a] py-4">
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
            <ProfilePicture
              fullScreenPic={fullScreenPic}
              type="user"
              w={`${fullScreenPic ? "w-full" : "w-[150px]"}`}
              h={`${fullScreenPic ? "h-full" : "h-[150px]"}`}
            />
          </div>
          {!fullScreenPic && (
            <div className="absolute right-0 bg-[#1a1a1a] bottom-0 h-8 w-8 pb-2 pr-0.5 rounded-full overflow-hidden flex justify-center items-center">
              <PhotoInput
                handleUploadImages={handleChangeAvatar}
                variant="small"
                id="profilepicture"
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-center lg:text-left lg:flex lg:self-end lg:items-end lg:justify-between lg:ml-12 w-full">
        <div>
          <p className="font-semibold text-2xl my-3 text-white">
            {session?.user?.name}
          </p>
          <ProfileStats />
        </div>
        <div className="mx-auto lg:mx-0 flex flex-col justify-center lg:self-end w-full lg:max-w-lg">
          <div className="lg:hidden">
            <ProfileButtonsPanel />
          </div>
          <div className="lg:hidden">
            <ProfileBio />
            <div className="flex justify-center text-white">
              <AdsSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

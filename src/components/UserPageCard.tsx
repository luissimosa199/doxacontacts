import React from "react";
import UserBio from "./UserBio";
import UserButtonsPanel from "./UserButtonsPanel";
import UserPicture from "./UserPicture";
import { User } from "@/types";

const UserPageCard = ({ userData }: { userData: User | null }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center lg:items-start bg-[#1a1a1a] py-4">
      <UserPicture
        image={userData?.image as string}
        name={userData?.name as string}
      />
      <div className="text-center lg:text-left lg:flex lg:self-end lg:items-end lg:justify-between lg:ml-12 w-full">
        <div>
          <p className="font-semibold text-2xl my-3 text-white">
            {userData?.name}
          </p>
          {/* <ProfileStats /> */}
        </div>
        <div className="mx-auto lg:mx-0 flex flex-col justify-center lg:self-end w-full lg:max-w-lg">
          <div className="lg:hidden">
            <UserButtonsPanel
              key="1"
              username={userData?.email as string}
            />
          </div>
          <div className="lg:hidden">
            <UserBio
              name={userData?.name as string}
              tags={userData?.tags as string[]}
              bio={userData?.bio as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageCard;

import React from "react";
import UserCategories from "./UserCategories";

const UserBio = ({
  name,
  tags,
  bio,
}: {
  name: string;
  tags: string[];
  bio: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-start mb-6 p-2">
      <h2 className="text-2xl font-semibold text-white">Sobre {name}</h2>
      <div className="flex gap-2 w-full mt-1">
        <h3 className="text-white text-sm break-normal min-h-[450px]:text-base">
          Categorías:{" "}
        </h3>
        <UserCategories tags={tags} />
      </div>
      <p className="text-lg text-gray-300">{bio}</p>
    </div>
  );
};

export default UserBio;

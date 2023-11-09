import React from "react";
import UserPhotos from "./UserPhotos";
import { useQuery } from "@tanstack/react-query";

const UserPhotoGallery = ({ username }: { username: string }) => {
  const { data: photosCount, isLoading } = useQuery(
    ["photosCount", username],
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/photos?username=${username}&count=true`
      );
      return response.json();
    }
  );

  return (
    <div className="bg-black">
      <h2 className="text-2xl font-bold mb-6 ml-2 text-white pb-2">
        Fotos {photosCount ? `(${photosCount})` : ""}
      </h2>
      <UserPhotos
        username={username}
        direction="flex-col"
      />
    </div>
  );
};

export default UserPhotoGallery;

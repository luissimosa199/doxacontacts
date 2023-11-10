import React from "react";
import UserPageCard from "./UserPageCard";
import { useQuery } from "@tanstack/react-query";
import UserButtonsPanel from "./UserButtonsPanel";
import { useFavorite } from "@/hooks/useFavorite";

const PostAuthorCard = ({ username }: { username: string }) => {
  const { data: userData, isLoading } = useQuery(
    ["timelineAuthorData", username],
    async () => {
      const response = await fetch(`/api/user?username=${username}`);
      return response.json();
    }
  );

  const { isFavorite, mutation, isLoading: FavLoading } = useFavorite(username);

  if (isLoading) {
    return <div className="h-40 bg-gray-300 animate-pulse"></div>;
  }

  console.log({ isFavorite, FavLoading });

  return (
    <div>
      <UserPageCard userData={userData[0]} />
      <div className="hidden lg:block lg:mt-4">
        <UserButtonsPanel
          isFavorite={isFavorite}
          mutation={mutation}
          isLoading={FavLoading}
          key="3"
          username={userData?.email as string}
        />
      </div>
    </div>
  );
};

export default PostAuthorCard;

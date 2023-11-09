import { faMessage, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import UserFavButton from "./UserFavButton";
import { useFavorite } from "@/hooks/useFavorite";

const UserCardButtons = ({
  username,
  favoritesLoading,
  isFavorite,
}: {
  username: string;
  favoritesLoading: boolean;
  isFavorite: boolean;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const { mutation } = useFavorite(username);

  return (
    <div className="flex gap-2 w-full justify-around">
      <UserFavButton
        key="2"
        username={username}
        isFavorite={isFavorite}
        mutation={mutation}
        isLoading={favoritesLoading}
      />
      <button
        className="hover:text-green-500 transition w-6"
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `${
              session?.user
                ? `/chat/${
                    (session?.user?.email as string).split("@")[0]
                  }y${username}`
                : "/login"
            }`
          );
        }}
      >
        <FontAwesomeIcon
          size="lg"
          className="text-white"
          icon={faMessage}
        />
      </button>

      <button
        className="hover:text-blue-500 transition w-6"
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `${session?.user ? `/videocall?name=${username}` : "/login"}`
          );
        }}
      >
        <FontAwesomeIcon
          size="lg"
          className="text-white"
          icon={faVideoCamera}
        />
      </button>
    </div>
  );
};

export default UserCardButtons;

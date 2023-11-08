import { toggleFavorite } from "@/utils/toggleFavorite";
import {
  faMedal,
  faMessage,
  faStar,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import UserFavButton from "./UserFavButton";

const UserCardButtons = ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex gap-2 w-full justify-around">
      <UserFavButton username={email} />
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

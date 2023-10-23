import { toggleFavorite } from "@/utils/toggleFavorite";
import { faMessage, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const UserCardButtons = ({
  username,
  email,
  favoritesLoading,
  isFavorites,
}: {
  username: string;
  email: string;
  favoritesLoading: boolean;
  isFavorites: boolean;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const mutation = useMutation(toggleFavorite, {
    onMutate: ({ email, method }) => {
      queryClient.cancelQueries(["favorites"]);
      const previousFavorites =
        queryClient.getQueryData<string[]>(["favorites"]) || [];

      if (Array.isArray(previousFavorites)) {
        if (method === "DELETE") {
          queryClient.setQueryData(
            ["favorites"],
            previousFavorites.filter((fav) => fav !== email)
          );
        } else {
          queryClient.setQueryData(
            ["favorites"],
            [...previousFavorites, email]
          );
        }
      }

      return { previousFavorites };
    },
  });

  return (
    <div className="ml-auto flex gap-2">
      <button
        className={
          favoritesLoading
            ? "animate-pulse"
            : isFavorites
            ? "text-yellow-500 hover:text-black"
            : "text-black hover:text-yellow-500"
        }
        onClick={(e) => {
          e.preventDefault();
          const method = isFavorites ? "DELETE" : "POST";
          mutation.mutate({ email, method });
        }}
      >
        <FontAwesomeIcon
          size="lg"
          icon={farStar}
        />
      </button>
      <button
        className="hover:text-green-500 transition"
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
          icon={faMessage}
        />
      </button>

      <button
        className="hover:text-blue-500 transition"
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `${session?.user ? `/videocall?name=${username}}` : "/login"}`
          );
        }}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faVideoCamera}
        />
      </button>
    </div>
  );
};

export default UserCardButtons;

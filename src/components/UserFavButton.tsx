import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { toggleFavorite } from "@/utils/toggleFavorite";

const UserFavButton = ({
  username,
  size = "lg",
  showSpan = false,
}: {
  username: string;
  size?: SizeProp;
  showSpan?: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const { isLoading } = useQuery(["favorites", username], async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/favorites`
    );
    if (response.ok) {
      const data = await response.json();
      setIsFavorite(data.includes(username));
      console.log(data.includes(username));
      return data;
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(toggleFavorite, {
    onMutate: ({ email, method }) => {
      queryClient.cancelQueries(["favorites", username]);
      const previousFavorites =
        queryClient.getQueryData<string[]>(["favorites", username]) || [];

      if (Array.isArray(previousFavorites)) {
        if (method === "DELETE") {
          queryClient.setQueryData(
            ["favorites", username],
            previousFavorites.filter((fav) => fav !== email)
          );

          setIsFavorite(false);
        } else {
          queryClient.setQueryData(
            ["favorites", username],
            [...previousFavorites, email]
          );
          setIsFavorite(true);
        }
      }
      return { previousFavorites };
    },
    onSettled: () => {
      queryClient.invalidateQueries(["favorites", username]);
    },
  });

  return (
    <div
      className={`${
        showSpan
          ? "flex flex-col lg:flex-row items-center justify-center gap-1"
          : ""
      } cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        if (!session?.user) {
          router.push("/login");
          return;
        }
        const method = isFavorite ? "DELETE" : "POST";
        mutation.mutate({ email: username, method });
      }}
    >
      <button
        className={`${
          isLoading
            ? "text-white animate-pulse"
            : isFavorite
            ? "text-yellow-500 sm:hover:text-white"
            : "text-white active:text-yellow-500 sm:hover:text-yellow-500"
        } w-6 flex justify-center items-center`}
      >
        <FontAwesomeIcon
          size={size}
          icon={isFavorite ? faStar : farStar}
        />
      </button>
      {showSpan && (
        <span>{isFavorite ? "Eliminar de " : "Agregar a "}favoritos</span>
      )}
    </div>
  );
};

export default UserFavButton;

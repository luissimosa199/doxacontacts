import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { UseMutationResult } from "@tanstack/react-query";

const UserFavButton = ({
  username,
  size = "lg",
  showSpan = false,
  isFavorite,
  mutation,
  isLoading,
}: {
  username: string;
  size?: SizeProp;
  showSpan?: boolean;
  isFavorite: boolean | null;
  mutation: UseMutationResult<
    any,
    unknown,
    {
      email: string;
      method: "DELETE" | "POST";
    },
    {
      previousFavorites: string[];
    }
  >;
  isLoading: boolean;
}) => {
  const { data: session } = useSession();
  const router = useRouter();

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
          className="lg:w-6"
        />
      </button>
      {showSpan && (
        <span>{isFavorite ? "Eliminar de " : "Agregar a "}favoritos</span>
      )}
    </div>
  );
};

export default UserFavButton;

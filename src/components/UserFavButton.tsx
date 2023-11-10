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
        }  flex justify-center items-center lg:py-1`}
      >
        <FontAwesomeIcon
          size={size}
          icon={isFavorite ? faStar : farStar}
          className="w-10 h-10 lg:w-5 lg:h-5"
        />
      </button>
      {showSpan && (
        <span className="text-sm break-normal min-h-[450px]:text-base">
          {isFavorite ? "Eliminar de " : "Agregar a "}favoritos
        </span>
      )}
    </div>
  );
};

export default UserFavButton;

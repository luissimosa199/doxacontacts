import {
  faDollarSign,
  faMessage,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import UserFavButton from "./UserFavButton";
import { UseMutationResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UserButtonsPanelProps {
  username: string;
  isLoading: boolean;
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
}

const UserButtonsPanel: FunctionComponent<UserButtonsPanelProps> = ({
  username,
  isLoading,
  isFavorite,
  mutation,
}) => {
  const { data: session } = useSession();

  const buttons = [
    {
      icon: faMessage,
      href: `${
        session?.user
          ? `/chat/${
              (session?.user?.email as string).split("@")[0]
            }y${username}`
          : "/login"
      }`,
      name: "Enviar mensaje",
      color: "bg-violet-400",
    },
    {
      icon: faVideoCamera,
      href: `${session?.user ? `/videocall?name=${username}` : "/login"}`,
      name: "Videollamada",
      color: "bg-emerald-400",
    },
    {
      icon: faDollarSign,
      href: "/premium",
      name: "Contenido Premium",
      color: "bg-emerald-400",
    },
  ];

  return (
    <ul className="flex justify-around my-4 lg:my-0 lg:gap-2">
      <li className="w-28 h-20 lg:h-fit lg:w-fit lg:rounded-lg lg:px-4 text-gray-300 lg:bg-[#3a3a3a] active:hover:opacity-70 lg:hover:opacity-70">
        <div className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center">
          <UserFavButton
            isFavorite={isFavorite}
            mutation={mutation}
            isLoading={isLoading}
            key="1"
            size="2x"
            username={username}
            showSpan={true}
          />
        </div>
      </li>

      {buttons.map((e, idx) => {
        return (
          <li
            key={idx}
            className="w-28 h-20 lg:h-fit lg:w-fit lg:rounded-lg lg:px-4 text-gray-300 lg:bg-[#3a3a3a] active:hover:opacity-70 lg:hover:opacity-70"
          >
            <Link
              className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center"
              href={e.href}
            >
              <FontAwesomeIcon
                size="2x"
                icon={e.icon}
                className="lg:w-4"
              />
              <span>{e.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default UserButtonsPanel;

import { faVideoCamera, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import router from "next/router";
import React, { FunctionComponent } from "react";
import { Session } from "next-auth";
import { CldImage } from "next-cloudinary";
import { noProfileImage } from "@/utils/noProfileImage";
import UserCardButtons from "./UserCardButtons";

interface UserInterface {
  user: {
    name: string;
    email: string;
    image: string;
    _id: string;
  };
  session: Session | null;
}

const UsersCard: FunctionComponent<UserInterface> = ({ user, session }) => {
  return (
    <li
      key={user._id}
      className="py-4 space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full h-[50px] min-w-[50px] border-2 overflow-hidden relative">
          <Link href={`/usuarios/${user._id}`}>
            <CldImage
              alt={`foto de ${user.name}`}
              src={user.image || noProfileImage}
              fill
              className="absolute object-cover"
            />
          </Link>
        </div>
        <Link href={`/usuarios/${user._id}`}>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{user.name}</p>
          </div>
        </Link>

        <UserCardButtons username={user.name} />
      </div>
    </li>
  );
};

export default UsersCard;

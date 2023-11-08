import Link from "next/link";
import React, { FunctionComponent } from "react";
import { CldImage } from "next-cloudinary";
import { noProfileImage } from "@/utils/noProfileImage";
import UserCardButtons from "./UserCardButtons";
import UsersOnlineIndicator from "./UsersOnlineIndicator";

interface UserInterface {
  user: {
    name: string;
    email: string;
    image: string;
    _id: string;
    slug: string;
  };
  favoritesLoading: boolean;
  isFavorites: boolean;
}

const UsersCard: FunctionComponent<UserInterface> = ({
  user,
  favoritesLoading,
  isFavorites,
}) => {
  return (
    <li
      key={user._id}
      className=""
    >
      <div className="flex flex-col items-center gap-y-2 w-full">
        <Link
          href={`/usuarios/${user.slug}`}
          className=""
        >
          <div className="h-[180px] w-[180px] overflow-hidden relative">
            <CldImage
              alt={`foto de ${user.name}`}
              src={user.image || noProfileImage}
              fill
              className="absolute object-cover"
            />
          </div>
        </Link>
        <Link href={`/usuarios/${user.slug}`}>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-white">{user.name}</p>
            <UsersOnlineIndicator user={user.email} />
          </div>
        </Link>

        <UserCardButtons
          username={user.name}
          email={user.email}
        />
      </div>
    </li>
  );
};

export default UsersCard;

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
      className="py-4 space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full h-[50px] min-w-[50px] border-2 overflow-hidden relative">
          <Link href={`/usuarios/${user.slug}`}>
            <CldImage
              alt={`foto de ${user.name}`}
              src={user.image || noProfileImage}
              fill
              className="absolute object-cover"
            />
          </Link>
        </div>
        <Link href={`/usuarios/${user.slug}`}>
          <div className="flex flex-col">
            <p className="text-lg font-medium">{user.name}</p>
            <UsersOnlineIndicator user={user.email} />
          </div>
        </Link>

        <UserCardButtons
          username={user.name}
          email={user.email}
          favoritesLoading={favoritesLoading}
          isFavorites={isFavorites}
        />
      </div>
    </li>
  );
};

export default UsersCard;

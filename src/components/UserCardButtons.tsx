import { faMessage, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const UserCardButtons = ({ username }: { username: string }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="ml-auto flex gap-2">
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

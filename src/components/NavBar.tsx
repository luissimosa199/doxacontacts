import Link from "next/link";
import NavBarButton from "./NavBarButton";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import ProfilePicture from "./ProfilePicture";
import { useRouter } from "next/router";
import useOnlineLogger from "@/hooks/useOnlineLogger";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const isUsersPage = router.asPath === "/usuarios";

  useOnlineLogger();

  return (
    <header className="flex justify-between gap-2 p-2 bg-base-100">
      <div
        className={`flex items-center w-1/3 ${isUsersPage && "2xl:invisible"}`}
      >
        <NavBarButton />
      </div>

      <div className="w-full justify-center flex items-center">
        <p className="text-3xl text-center">{session?.user?.name}</p>
      </div>

      <div className="flex gap-1 md:gap-2 items-center justify-end w-fit">
        {session ? (
          <div className="w-[40px] h-[40px]">
            <ProfilePicture
              type="user"
              w="w-[40px]"
              h="h-[40px]"
            />
          </div>
        ) : (
          <Link href="/login">
            <p className="text-md text-white">Iniciar Sesion</p>
          </Link>
        )}

        <button
          className="w-6 h-6"
          onClick={() => signOut()}
        >
          <div className="text-white">
            <FontAwesomeIcon icon={faPowerOff} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

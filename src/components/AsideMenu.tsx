import {
  faEnvelope,
  faHouse,
  faImage,
  faMessage,
  faPenToSquare,
  faShareNodes,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const AsideMenu = () => {
  return (
    <div className="2xl:shadow-md 2xl:block hidden p-4 rounded-lg mt-2">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/">
            <FontAwesomeIcon
              icon={faHouse}
              className="mr-2"
            />
            <span>Homepage</span>
          </Link>
        </li>
        <li>
          <Link href="/perfil">
            <FontAwesomeIcon
              icon={faUser}
              className="mr-2"
            />
            <span>Perfil</span>
          </Link>
        </li>
        <li>
          <Link href="/videocall">
            <FontAwesomeIcon
              icon={faVideo}
              className="mr-2"
            />
            <span>Video Conferencia</span>
          </Link>
        </li>
        <li>
          <Link href="/usuarios">
            <FontAwesomeIcon
              icon={faMessage}
              className="mr-2"
            />
            <span>Chat</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <FontAwesomeIcon
              icon={faShareNodes}
              className="mr-2"
            />
            <span>Compartir mi perfil</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="mr-2"
            />
            <span>Editar mi perfil</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <FontAwesomeIcon
              icon={faImage}
              className="mr-2"
            />
            <span>Publicar nota/foto</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="mr-2"
            />
            <span>Invitar amigos</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AsideMenu;

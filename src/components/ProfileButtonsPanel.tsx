import {
  faShareNodes,
  faStethoscope,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FunctionComponent } from "react";

const buttons = [
  {
    icon: faShareNodes,
    href: "/",
    name: "Compartir",
    color: "bg-violet-400",
  },
  {
    icon: faUsers,
    href: "usuarios",
    name: "Buscar usuarios",
    color: "bg-emerald-400",
  },
  {
    icon: faVideo,
    href: "usuarios",
    name: "Videollamadas",
    color: "bg-violet-400",
  },
];

const ProfileButtonsPanel: FunctionComponent = () => {
  return (
    <ul className="flex justify-around my-4 lg:my-0 lg:gap-2">
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

export default ProfileButtonsPanel;

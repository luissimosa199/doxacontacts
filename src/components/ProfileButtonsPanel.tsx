import {
  faStethoscope,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { FunctionComponent } from "react";

const buttons = [
  {
    icon: faStethoscope,
    href: "videocall",
    name: "Iniciar consulta",
    color: "bg-sky-400",
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
    <ul>
      {buttons.map((e, idx) => {
        return (
          <li
            key={idx}
            className="underline text-lg mb-2 text-white hover:opacity-70"
          >
            <Link href={e.href}>{e.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProfileButtonsPanel;

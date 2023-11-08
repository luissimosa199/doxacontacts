import React from "react";

const ProfileTabs = ({
  setSelectedTab,
  selectedTab,
}: {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
}) => {
  return (
    <ul className="flex gap-6 text-lg text-gray-400">
      <li
        className={`cursor-pointer ${
          selectedTab === "publicaciones" ? "border-b-2 border-[#f90]" : ""
        }`}
      >
        <button
          onClick={() => {
            setSelectedTab("publicaciones");
          }}
        >
          Publicaciones
        </button>
      </li>
      <li
        className={`cursor-pointer ${
          selectedTab === "fotos" ? "border-b-2 border-[#f90]" : ""
        }`}
      >
        <button
          onClick={() => {
            setSelectedTab("fotos");
          }}
        >
          Fotos
        </button>
      </li>
    </ul>
  );
};

export default ProfileTabs;

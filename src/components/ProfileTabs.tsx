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
        className={`cursor-pointer px-4 py-2 ${
          selectedTab === "publicaciones"
            ? " bg-[#3a3a3a] rounded-full font-semibold text-white lg:bg-transparent lg:rounded-none lg:border-b-2 lg:border-[#f90] lg:text-gray-400"
            : ""
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
        className={`cursor-pointer px-4 py-2 ${
          selectedTab === "fotos"
            ? "bg-[#3a3a3a] rounded-full font-semibold text-white lg:bg-transparent lg:rounded-none lg:border-b-2 lg:border-[#f90] lg:text-gray-400"
            : ""
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

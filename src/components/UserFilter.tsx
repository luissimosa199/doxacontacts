import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import UserFilterElement from "./UserFilterElement";

const UserFilter = ({
  tags,
  setSelectedTags,
  setFilterByFavorites,
  filterByFavorites,
  setFilterOnline,
  selectedTags,
  filterOnline,
}: {
  tags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterByFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  filterByFavorites: boolean;
  setFilterOnline: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTags: string[];
  filterOnline: boolean;
}) => {
  return (
    <div className="bg-black">
      <h3 className="font-semibold text-lg mb-4 text-white">
        Filtrar por categoría
      </h3>
      <ul className="flex flex-wrap">
        <li className="flex items-center justify-center bg-[#1a1a1a] border border-[#3a3a3a] w-1/2 h-12">
          <button
            aria-label="Toggle favorite filter"
            onClick={() => setFilterByFavorites((prev) => !prev)}
            className={`${
              filterByFavorites
                ? "text-yellow-500 sm:hover:text-black"
                : "text-black active:text-yellow-500 sm:hover:text-yellow-500"
            } cursor-pointer p-2 w-full h-full flex justify-center items-center`}
          >
            <FontAwesomeIcon
              size="lg"
              className={`w-6 h-6 ${
                filterByFavorites ? "text-[#f90]" : "text-gray-200"
              }`}
              icon={filterByFavorites ? faStar : farStar}
            />
            <label
              htmlFor="favorites"
              className={`ml-2 text-center capitalize cursor-pointer ${
                filterByFavorites ? "text-[#f90]" : "text-gray-200"
              }`}
            >
              Favoritos
            </label>
          </button>
        </li>

        <li className="flex items-center justify-center bg-[#1a1a1a] border border-[#3a3a3a] w-1/2 h-12">
          <label
            htmlFor="online"
            className={`flex justify-center items-center capitalize w-full h-full cursor-pointer ${
              filterOnline ? "text-[#f90]" : "text-gray-200"
            }`}
          >
            <input
              type="checkbox"
              id="online"
              hidden
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              onChange={(e) => setFilterOnline(e.target.checked)}
            />
            <span>En Línea</span>
          </label>
        </li>

        {tags.map((tag) => (
          <UserFilterElement
            key={tag}
            tag={tag}
            setState={setSelectedTags}
            selectedTags={selectedTags}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserFilter;

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UserFilter = ({
  tags,
  setSelectedTags,
  setFilterByFavorites,
  filterByFavorites,
}: {
  tags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterByFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  filterByFavorites: boolean;
}) => {
  return (
    <div className="2xl:shadow-md p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-4 text-gray-700">
        Filtrar por categoría
      </h3>
      <ul>
        <li className="flex items-center mb-2">
          <button
            aria-label="Toggle favorite filter"
            onClick={() => setFilterByFavorites((prev) => !prev)}
            className={
              filterByFavorites
                ? "text-yellow-500 hover:text-black"
                : "text-black hover:text-yellow-500"
            }
          >
            <FontAwesomeIcon
              size="lg"
              icon={filterByFavorites ? faStar : farStar}
            />
          </button>
          <label
            htmlFor="favorites"
            className="ml-2 text-gray-600"
          >
            Favoritos
          </label>
        </li>

        {tags.map((tag) => (
          <li
            key={tag}
            className="flex items-center mb-2"
          >
            <input
              type="checkbox"
              id={tag}
              value={tag}
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTags((prev: string[]) => [
                    ...prev,
                    e.target.value,
                  ]);
                } else {
                  setSelectedTags((prev: string[]) =>
                    prev.filter((t) => t !== e.target.value)
                  );
                }
              }}
            />
            <label
              htmlFor={tag}
              className="ml-2 text-gray-600"
            >
              {tag}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFilter;

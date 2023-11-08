import React from "react";

const UserCategories = ({ tags }: { tags: string[] }) => {
  return (
    <div className="w-full">
      <div className="flex mt-1">
        <ul className="w-full mx-auto flex gap-2 flex-wrap lg:w-1/2">
          {tags && tags.length > 0 ? (
            tags.map((e: string, idx: number) => {
              return (
                <li
                  key={`${e}${idx}`}
                  className={`flex items-center text-xs font-medium tracking-wider text-left uppercase px-2 transition-all text-gray-500 mb-1`}
                >
                  <span>{e}</span>
                </li>
              );
            })
          ) : (
            <li>
              <p className="text-gray-400 text-xs font-medium tracking-wider text-left uppercase py-0.5 px-1">
                No has agregado categorías a tu perfil
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserCategories;

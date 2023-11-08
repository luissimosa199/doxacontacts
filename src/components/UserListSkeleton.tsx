import React from "react";
import UserFilterContainerSkeleton from "./UserFilterContainerSkeleton";

const UserListSkeleton = () => {
  return (
    <div
      className={`min-h-[130vh] px-6 bg-black rounded-lg shadow-md max-w-[450px] md:max-w-[850px] lg:max-w-4xl xl:max-w-6xl mx-auto`}
    >
      <div className="w-full">
        <UserFilterContainerSkeleton />

        <div className="p-2 h-6 mt-4 w-full border rounded" />
      </div>

      <ul className="flex flex-wrap gap-y-4 justify-around w-full">
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-[180px] w-[180px] bg-gray-300 my-2 animate-pulse"></li>
      </ul>
    </div>
  );
};

export default UserListSkeleton;

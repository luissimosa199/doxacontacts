import React from "react";

const UserListSkeleton = () => {
  return (
    <div className="mt-4 h-screen bg-white p-6 rounded-lg shadow-md">
      <div className="w-full">
        <div className="h-48 bg-gray-300 animate-pulse mb-4"></div>

        <div className="p-2 mt-4 w-full border rounded" />
      </div>

      <ul className="divide-y divide-gray-200">
        <li className="h-12 bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-12 bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-12 bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-12 bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-12 bg-gray-300 my-2 animate-pulse"></li>
        <li className="h-12 bg-gray-300 my-2 animate-pulse"></li>
      </ul>
    </div>
  );
};

export default UserListSkeleton;

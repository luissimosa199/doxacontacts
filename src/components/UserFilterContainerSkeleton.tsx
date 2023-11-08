import React from "react";

const UserFilterContainerSkeleton = () => {
  return (
    <div>
      <h3 className="font-semibold text-lg text-white">
        Filtrar por categoría
      </h3>
      <div className="h-36 bg-gray-300 animate-pulse"></div>;
    </div>
  );
};

export default UserFilterContainerSkeleton;

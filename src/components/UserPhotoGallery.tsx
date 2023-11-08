import React from "react";
import UserPhotos from "./UserPhotos";

const UserPhotoGallery = ({ username }: { username: string }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-white border-b-2 pb-2">
        Fotos
      </h2>
      <UserPhotos username={username} />
    </div>
  );
};

export default UserPhotoGallery;

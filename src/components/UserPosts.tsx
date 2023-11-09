import React from "react";
import LastTenUserTimeline from "./LastTenUserTimeline";

const UserPosts = ({ username }: { username: string }) => {
  return (
    <div className="mt-6 bg-black">
      <h2 className="text-2xl font-semibold text-white ml-2">
        Últimas publicaciones
      </h2>

      <LastTenUserTimeline username={username} />
    </div>
  );
};

export default UserPosts;

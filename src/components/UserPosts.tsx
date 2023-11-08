import React from "react";
import LastTenUserTimeline from "./LastTenUserTimeline";

const UserPosts = ({ username }: { username: string }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-2 text-white">
        Últimas publicaciones
      </h2>

      <LastTenUserTimeline username={username} />
    </div>
  );
};

export default UserPosts;

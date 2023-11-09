import React, { useState } from "react";
import ToggleButon from "./ToggleButton";
import PrimaryForm from "./PrimaryForm";
import LastTenUserTimeline from "./LastTenUserTimeline";
import { useSession } from "next-auth/react";

const ProfilePosts = () => {
  const [addNewTimeline, setAddNewTimeline] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <div className="mt-6 bg-black">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold pb-2 text-white">
          Últimas publicaciones
        </h2>
        <ToggleButon
          state={addNewTimeline}
          setState={setAddNewTimeline}
          label="Nueva publicación"
        />
      </div>
      {addNewTimeline && <PrimaryForm />}

      <LastTenUserTimeline username={session?.user?.email as string} />
    </div>
  );
};

export default ProfilePosts;

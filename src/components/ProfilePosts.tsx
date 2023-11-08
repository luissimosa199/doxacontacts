import React, { useState } from "react";
import ToggleButon from "./ToggleButton";
import PrimaryForm from "./PrimaryForm";
import LastTenUserTimeline from "./LastTenUserTimeline";
import { useSession } from "next-auth/react";

const ProfilePosts = () => {
  const [addNewTimeline, setAddNewTimeline] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-2 text-white">
        Últimas publicaciones
      </h2>
      <ToggleButon
        state={addNewTimeline}
        setState={setAddNewTimeline}
      />
      {addNewTimeline && <PrimaryForm />}

      <LastTenUserTimeline username={session?.user?.email as string} />
    </div>
  );
};

export default ProfilePosts;

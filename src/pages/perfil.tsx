import { useSession } from "next-auth/react";
import LastTenUserTimeline from "@/components/LastTenUserTimeline";
import UserPhotoGallery from "@/components/UserPhotoGallery";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/router";
import PrimaryForm from "@/components/PrimaryForm";
import { useState } from "react";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import ToggleButon from "@/components/ToggleButton";
import ProfileButtonsPanel from "@/components/ProfileButtonsPanel";

const Profile = () => {
  const [addNewTimeline, setAddNewTimeline] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ProfileSkeleton />;
  }

  if (session && session.user) {
    return (
      <>
        <div className="bg-[#3a3a3a] space-y-12 lg:space-y-0">
          <ProfileCard />

          <div className="hidden bg-black p-2 lg:flex py-4 justify-between">
            <ul className="flex gap-6 text-lg text-gray-400">
              <li className="cursor-pointer">Publicaciones</li>
              <li className="cursor-pointer">Fotos</li>
            </ul>
            <ProfileButtonsPanel />
          </div>

          <UserPhotoGallery />
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-2 text-white">
              Últimas publicaciones
            </h2>
            <ToggleButon
              state={addNewTimeline}
              setState={setAddNewTimeline}
            />
            {addNewTimeline && <PrimaryForm />}

            <LastTenUserTimeline username={session.user.email as string} />
          </div>
        </div>
      </>
    );
  }

  if (!session || !session.user) {
    router.push("/login");
    return null;
  }
};

export default Profile;

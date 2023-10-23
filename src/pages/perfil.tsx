import { useSession } from "next-auth/react";
import LastTenUserTimeline from "@/components/LastTenUserTimeline";
import UserPhotoGallery from "@/components/UserPhotoGallery";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PrimaryForm from "@/components/PrimaryForm";
import { useState } from "react";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import ToggleButon from "@/components/ToggleButton";
import UserBio from "@/components/UserBio";

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
        <div className="p-8 bg-gray-50 space-y-12">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h1 className="text-4xl font-bold text-gray-800 border-b-2 pb-3">
                Perfil
              </h1>
            </div>
          </div>
          <ProfileCard />
          <div className="mt-4">
            <UserBio />
          </div>
          <UserPhotoGallery />
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 pb-2">
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

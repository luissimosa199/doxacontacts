import { useSession } from "next-auth/react";
import ProfilePhotoGallery from "@/components/ProfilePhotoGallery";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/router";
import { useState } from "react";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import ProfileButtonsPanel from "@/components/ProfileButtonsPanel";
import ProfilePosts from "@/components/ProfilePosts";
import ProfileTabs from "@/components/ProfileTabs";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState<string>("fotos");
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ProfileSkeleton />;
  }

  if (session && session.user) {
    return (
      <div className="bg-[#3a3a3a] space-y-12 lg:space-y-0">
        <ProfileCard />

        <div className="hidden bg-black p-2 lg:flex py-4 justify-between">
          <ProfileTabs
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
          <ProfileButtonsPanel />
        </div>

        {(() => {
          switch (selectedTab) {
            case "publicaciones":
              return <ProfilePosts />;

            case "fotos":
              return <ProfilePhotoGallery />;
            default:
              break;
          }
        })()}
      </div>
    );
  }

  if (!session || !session.user) {
    router.push("/login");
    return null;
  }
};

export default Profile;

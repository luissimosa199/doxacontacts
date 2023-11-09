import dbConnect from "@/db/dbConnect";
import { UserModel } from "@/db/models/userModel";
import { User } from "@/types";
import { GetServerSidePropsContext } from "next";
import { FunctionComponent, useState } from "react";
import UserButtonsPanel from "@/components/UserButtonsPanel";
import ProfileTabs from "@/components/ProfileTabs";
import UserPosts from "@/components/UserPosts";
import UserPhotoGallery from "@/components/UserPhotoGallery";
import UserPageCard from "@/components/UserPageCard";

interface UserPageProps {
  userData: User | null;
}

const User: FunctionComponent<UserPageProps> = ({ userData }) => {
  const [selectedTab, setSelectedTab] = useState<string>("fotos");

  return (
    <div className="bg-[#3a3a3a] space-y-12 lg:space-y-0">
      <UserPageCard userData={userData} />

      <div className="hidden bg-black p-2 lg:flex py-4 justify-between">
        <ProfileTabs
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
        <UserButtonsPanel
          key="2"
          username={userData?.email as string}
        />
      </div>

      {(() => {
        switch (selectedTab) {
          case "publicaciones":
            return <UserPosts username={userData?.email as string} />;

          case "fotos":
            return <UserPhotoGallery username={userData?.email as string} />;
          default:
            break;
        }
      })()}
    </div>
  );
};

export default User;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    await dbConnect();

    const { slug } = context.query;

    const user = await UserModel.findOne({ slug })
      .select("name email image photos bio slug tags")
      .lean();

    if (user) {
      const userData = {
        name: user.name,
        email: user.email,
        image: user.image || "",
        photos: user.photos || [],
        bio: user.bio || "",
        slug: user.slug || "",
        tags: user.tags || [],
      };
      return {
        props: {
          userData,
        },
      };
    }

    throw new Error("error");
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

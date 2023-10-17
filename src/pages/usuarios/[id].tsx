import dbConnect from "@/db/dbConnect";
import { UserModel } from "@/db/models/userModel";
import { User } from "@/types";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import escapeStringRegexp from "escape-string-regexp";
import UserPhotos from "@/components/UserPhotos";
import { CldImage } from "next-cloudinary";
import { noProfileImage } from "@/utils/noProfileImage";
import UserCardButtons from "@/components/UserCardButtons";

interface UserPageProps {
  userData: User | null;
}

const User: FunctionComponent<UserPageProps> = ({ userData }) => {
  const [fullScreenPic, setFullScreenPic] = useState<boolean>(false);

  return (
    <div className="p-4 bg-gray-50 space-y-12">
      <div className="flex gap-2 items-center">
        <Link
          href="/usuarios"
          className="w-4 h-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 border-b-2 pb-3">
          {userData?.name}
        </h1>
      </div>
      <div className="flex flex-col w-full justify-around items-center border rounded-lg py-6 bg-white shadow-lg md:max-w-[850px] mx-auto">
        <div className="flex flex-col items-center relative w-full">
          <div
            className="flex flex-col items-center w-full"
            onClick={() => {
              setFullScreenPic(!fullScreenPic);
            }}
          >
            <CldImage
              priority
              src={(userData?.image as string) || noProfileImage}
              width={fullScreenPic ? 600 : 300}
              height={fullScreenPic ? 600 : 300}
              alt={`${userData?.name}'s Avatar`}
              className={`${
                fullScreenPic ? "w-screen h-screen" : "w-96 h-96"
              } object-cover rounded-full border-2 border-gray-300 mb-5`}
            />
          </div>
          <div className="w-fit mx-auto flex justify-center mb-4">
            <UserCardButtons username={userData?.name as string} />
          </div>
        </div>

        <div className="w-full">
          <UserPhotos
            direction="flex-col"
            username={userData?.email as string}
          />
        </div>
      </div>
    </div>
  );
};

export default User;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    await dbConnect();

    const { id } = context.query;
    const safeId = escapeStringRegexp(id as string);

    const user = await UserModel.findById(id)
      .select("name email image photos")
      .lean();

    if (user) {
      const userData = {
        name: user.name,
        email: user.email,
        image: user.image || "",
        photos: user.photos || [],
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

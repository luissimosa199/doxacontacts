import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const PremiumButton = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="flex gap-2 rounded-md shadow-lg py-2 px-4 bg-red-200 ml-4 items-center cursor-pointer md:hover:text-red-500 active:text-red-500 transition-all">
      <button
        className="w-fit"
        onClick={(e) => {
          e.preventDefault();
          router.push(`${session?.user ? `/premium/${slug}` : "/login"}`);
        }}
      >
        <span className="uppercase text-red-700 text-xs font-medium tracking-wider break-word text-center md:hover:text-red-500 active:text-red-500 transition-all">
          comprar contenido premium
        </span>
      </button>
    </div>
  );
};

export default PremiumButton;

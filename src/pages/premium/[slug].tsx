import useTrackUserAgent from "@/hooks/useTrackUserAgent";
import { useRouter } from "next/router";
import React from "react";

const Premium = () => {
  const router = useRouter();
  const { slug } = router.query;

  useTrackUserAgent();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-6xl text-center">
        ¡Gracias por su interés en{" "}
        <span className="capitalize">
          {router.isReady && (slug as string).replaceAll("-", " ")},
        </span>{" "}
        Recibiras el contenido muy pronto!
      </h1>
    </div>
  );
};

export default Premium;

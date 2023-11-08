import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const ProfileStats = () => {
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery(["userStats"], async () => {
    const response = await fetch(
      `/api/user_agent_info?username=${session?.user?.email}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return (
      <div>
        <p className="text-white">Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-white">Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (!data.visitsCount) {
    return (
      <div>
        <p className="text-white">No hay visitas en tu perfil</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-white">Visitas a tu perfil: {data.visitsCount}</p>
    </div>
  );
};

export default ProfileStats;

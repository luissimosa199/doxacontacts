import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

interface UsersOnlineIndicatorProps {
  user: string;
}

const fetchUserOnlineStatus = async (email: string) => {
  const response = await fetch(
    `api/user/online?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const UsersOnlineIndicator: FunctionComponent<UsersOnlineIndicatorProps> = ({
  user,
}) => {
  const { data, isLoading } = useQuery<{ online: boolean }>(
    ["userOnlineStatus", user],
    () => fetchUserOnlineStatus(user),
    {
      refetchInterval: 120000,
    }
  );

  if (!data || !data.online || isLoading) {
    return (
      <div className="flex items-center">
        <div className=""></div>
        <p className=""></p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full w-3 h-3 bg-green-400`}></div>
      <p className="text-xs text-center leading-none text-white">en línea</p>
    </div>
  );
};

export default UsersOnlineIndicator;

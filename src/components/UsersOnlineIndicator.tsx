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

  if (!data) {
    return (
      <div className="flex flex-col items-center">
        <div className={`rounded-full w-3 h-3 bg-slate-400`}></div>
        <p className="text-xs w-4 text-center"></p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`rounded-full w-3 h-3 ${
          data.online ? "bg-green-400" : "bg-slate-400"
        } `}
      ></div>
      {!isLoading && (
        <p className="text-xs w-6 text-center">
          {data.online ? "en línea" : ""}
        </p>
      )}
    </div>
  );
};

export default UsersOnlineIndicator;

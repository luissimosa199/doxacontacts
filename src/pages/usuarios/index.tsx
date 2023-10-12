import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import UsersCard from "@/components/UsersCard";
import { useEffect, useState } from "react";
import UserFilterContainer from "@/components/UserFilterContainer";

interface UserInterface {
  name: string;
  email: string;
  image: string;
  _id: string;
  tags: string[];
}

const Usuarios = () => {
  const { data: session } = useSession();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [nameFilter, setNameFilter] = useState("");

  const fetchUsers = async () => {
    // Convert the selectedTags array to query parameters
    const tagsQuery = selectedTags.map((tag) => `tags=${tag}`).join("&");
    const nameQuery = nameFilter ? `name=${nameFilter}` : "";

    // Construct the URL with the query parameters
    const url = `/api/user?${tagsQuery}&${nameQuery}`;

    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery(["users"], fetchUsers, {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [selectedTags, nameFilter, refetch]);

  if (isLoading)
    return (
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md animate-pulse">
        <ul className="divide-y divide-gray-200">
          {[...Array(6)].map((_, index) => (
            <li
              key={index}
              className="py-4 space-y-4"
            >
              <div className="flex items-center gap-4">
                {/* Skeleton for profile image */}
                <div className="rounded-full h-[150px] w-[150px] bg-gray-300"></div>
                {/* Skeleton for user name */}
                <div className="flex flex-col">
                  <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
                </div>
                {/* Skeleton for video call icon */}
                <div className="h-6 w-6 bg-gray-300 rounded ml-4"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );

  if (error) return <p>Error</p>;

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
      <div className="w-full">
        <UserFilterContainer setSelectedTags={setSelectedTags} />

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="p-2 mt-4 w-full border rounded"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      <ul className="divide-y divide-gray-200">
        {users && users.length > 0 ? (
          users.map((user: UserInterface, idx: number) => (
            <UsersCard
              key={idx}
              session={session}
              user={user}
            />
          ))
        ) : (
          <li className="text-center py-4">No se consiguieron usuarios</li>
        )}
      </ul>
    </div>
  );
};

export default Usuarios;

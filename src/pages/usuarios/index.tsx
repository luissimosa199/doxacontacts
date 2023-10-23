import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import UsersCard from "@/components/UsersCard";
import { useEffect, useState } from "react";
import UserFilterContainer from "@/components/UserFilterContainer";
import UserListSkeleton from "@/components/UserListSkeleton";
import { UserInterface } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import AsideMenu from "@/components/AsideMenu";

const Usuarios = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [filterByFavorites, setFilterByFavorites] = useState<boolean>(false);

  const router = useRouter();
  const { data: session } = useSession();

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

  const { data: favorites, isLoading: favoritesLoading } = useQuery(
    ["favorites"],
    async () => {
      if (!session) {
        return [];
      }
      const response = await fetch(`/api/user/favorites`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        throw new Error("Could not fetch favorites");
      }
    }
  );

  useEffect(() => {
    refetch();
  }, [selectedTags, nameFilter, filterByFavorites, refetch]);

  const displayedUsers =
    filterByFavorites && favorites
      ? users.filter((user: UserInterface) => favorites.includes(user.email))
      : users;

  if (isLoading) return <UserListSkeleton />;

  // if (!isLoading) {
  //   console.log("@UserPage", {
  //     user: users[0],
  //     favorites,
  //     isFavorite: favorites.includes(users[0].email),
  //   });
  // }
  if (error) return <p>Error</p>;

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-md min-h-screen max-w-[850px] mx-auto">
      <div className="flex gap-2">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>Volver</h2>
      </div>
      <div className="w-full">
        <div className="my-4 2xl:absolute 2xl:left-8 2xl:p-8 bg-white ">
          <UserFilterContainer
            filterByFavorites={filterByFavorites}
            setFilterByFavorites={setFilterByFavorites}
            setSelectedTags={setSelectedTags}
          />
          <AsideMenu />
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="p-2 mt-4 w-full border rounded"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      <ul className="divide-y divide-gray-200">
        {displayedUsers && displayedUsers.length > 0 ? (
          displayedUsers.map((user: UserInterface, idx: number) => (
            <UsersCard
              key={idx}
              user={user}
              favoritesLoading={favoritesLoading}
              isFavorites={
                Array.isArray(favorites) && favorites.includes(user.email)
              }
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

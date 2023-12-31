import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import UsersCard from "@/components/UsersCard";
import { useEffect, useMemo, useState } from "react";
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
  const [filterOnline, setFilterOnline] = useState(false);

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

  const {
    data: favorites,
    isLoading: favoritesLoading,
  }: { data: string[] | undefined; isLoading: boolean } = useQuery(
    ["favorites", "all"],
    async () => {
      if (!session) {
        return [];
      }
      const response = await fetch(`/api/user/favorites`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Could not fetch favorites");
      }
    }
  );

  useEffect(() => {
    refetch();
  }, [selectedTags, nameFilter, filterByFavorites, refetch]);

  const displayedUsers = useMemo(() => {
    let filteredUsers = users || [];
    if (filterByFavorites && favorites) {
      filteredUsers = filteredUsers.filter((user: UserInterface) =>
        favorites.includes(user.email)
      );
    }
    if (filterOnline) {
      filteredUsers = filteredUsers.filter(
        (user: UserInterface) => user.online
      );
    }

    // Sort users so that online users come first
    filteredUsers.sort((a: UserInterface, b: UserInterface) => {
      if (a.online && !b.online) {
        return -1; // a comes before b
      }
      if (!a.online && b.online) {
        return 1; // b comes before a
      }
      return 0; // no change in order
    });

    return filteredUsers;
  }, [users, favorites, filterByFavorites, filterOnline]);

  if (isLoading) return <UserListSkeleton />;

  if (error) return <p>Error</p>;

  return (
    <div
      className={`min-h-[130vh] bg-black px-6 rounded-lg shadow-md max-w-[450px] md:max-w-[850px] lg:max-w-4xl xl:max-w-6xl mx-auto`}
    >
      <div className="w-full mb-4">
        <div className="">
          <UserFilterContainer
            filterByFavorites={filterByFavorites}
            setFilterByFavorites={setFilterByFavorites}
            setSelectedTags={setSelectedTags}
            setFilterOnline={setFilterOnline}
            selectedTags={selectedTags}
            filterOnline={filterOnline}
          />
          {/* <AsideMenu /> */}
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="p-2 mt-4 w-full border rounded"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      <ul className="flex flex-wrap gap-y-4 justify-around w-full">
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

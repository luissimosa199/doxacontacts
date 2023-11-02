import React, { FunctionComponent, useEffect, useState } from "react";
import UserFilter from "./UserFilter";
import { useCategories } from "@/hooks/useCategories";

interface UserFilterContainerProps {
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterByFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  filterByFavorites: boolean;
  setFilterOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserFilterContainer: FunctionComponent<UserFilterContainerProps> = ({
  setSelectedTags,
  setFilterByFavorites,
  filterByFavorites,
  setFilterOnline,
}) => {
  const [userTags, setUserTags] = useState<string[]>([]);
  const { data, isLoading, error } = useCategories("user");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setUserTags(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <UserFilter
        filterByFavorites={filterByFavorites}
        setFilterByFavorites={setFilterByFavorites}
        tags={userTags}
        setSelectedTags={setSelectedTags}
        setFilterOnline={setFilterOnline}
      />
    </div>
  );
};

export default UserFilterContainer;

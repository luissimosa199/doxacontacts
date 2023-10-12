import React, { FunctionComponent, useEffect, useState } from "react";
import UserFilter from "./UserFilter";
import { useCategories } from "@/hooks/useCategories";

interface UserFilterContainerProps {
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const UserFilterContainer: FunctionComponent<UserFilterContainerProps> = ({
  setSelectedTags,
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
        tags={userTags}
        setSelectedTags={setSelectedTags}
      />
    </div>
  );
};

export default UserFilterContainer;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useCallback, useState } from "react";
import ToggleButon from "./ToggleButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const UserBio = () => {
  const [showBioInput, toggleBioInput] = useState<boolean>(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const updateBio = async (bio: string) => {
    const response = await fetch(
      `/api/user/bio?username=${encodeURIComponent(
        session!.user!.email as string
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `Server responded with ${response.status}`);
    }
    return response.json();
  };

  const getBio = async () => {
    const response = await fetch(
      `/api/user/bio?username=${encodeURIComponent(
        session!.user!.email as string
      )}`
    );

    return response.json();
  };

  const mutation = useMutation(updateBio, {
    onMutate: (value) => {
      queryClient.setQueryData(["userBio"], { bio: value });
    },
  });

  const handleMutation = (value: string) => {
    mutation.mutate(value);
  };

  const debouncedMutation = debounce(handleMutation, 300);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      debouncedMutation(e.target.value);
    },
    [debouncedMutation]
  );

  const { data, isLoading } = useQuery(["userBio"], getBio);

  return (
    <>
      <div className="border-b-2 flex gap-2 items-center mb-6 pb-2">
        <h2 className="text-2xl font-semibold text-gray-800">Sobre mi</h2>
        <ToggleButon
          state={showBioInput}
          setState={toggleBioInput}
          icon={faPenToSquare}
        />
      </div>
      {isLoading ? (
        <p className="text-lg">Cargando...</p>
      ) : showBioInput ? (
        <textarea
          defaultValue={data.bio}
          onChange={handleChange}
          className="w-full shadow-md rounded p-2"
        />
      ) : (
        <p className="text-lg">{data.bio}</p>
      )}
    </>
  );
};

export default UserBio;

import React, { useEffect, useState } from "react";
import ToggleButon from "./ToggleButton";
import FlexInputList from "./FlexInputList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";

type TagMutationInput = {
  tag: string;
  method: "POST" | "DELETE";
};

const ProfileCategories = ({ username }: { username: string }) => {
  const [showTagsInput, setShowTagsInput] = useState<boolean>(false);
  const [profileTags, setProfileTags] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const fetchTags = async () => {
    const response = await fetch(`/api/user/tags?username=${username}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery(["userTags", username], fetchTags, {
    onSuccess(data) {
      setProfileTags(data.tags);
    },
  });

  const mutation = useMutation(
    (input: TagMutationInput) =>
      fetch(`/api/user/tags?username=${username}`, {
        method: input.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: input.tag }),
      }),
    {
      onMutate: (input: TagMutationInput) => {
        const previousTags = queryClient.getQueryData<string[]>([
          "userTags",
          username,
        ]);

        queryClient.setQueryData(
          ["userTags", username],
          (old: string[] | undefined) => {
            if (!Array.isArray(old)) return [input.tag];

            if (input.method === "POST") {
              return [...old, input.tag];
            } else if (input.method === "DELETE") {
              return old.filter((tag) => tag !== input.tag);
            }
            return old;
          }
        );

        return { previousTags };
      },
      onError: (err, input: TagMutationInput, context: any) => {
        queryClient.setQueryData(["userTags", username], context.previousTags);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["userTags", username]);
      },
    }
  );

  useEffect(() => {
    if (data && profileTags) {
      const newTags = profileTags.filter((tag) => !data?.tags?.includes(tag));
      newTags.forEach((tag) => mutation.mutate({ tag, method: "POST" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileTags]);

  return (
    <div>
      <ul className="w-full mx-auto mb-4 flex gap-2 justify-center flex-wrap md:w-1/2">
        {profileTags.length > 0 ? (
          profileTags.map((e: string, idx: number) => {
            return (
              <li
                key={`${e}${idx}`}
                className={`flex items-center text-xs font-medium tracking-wider text-left uppercase py-0.5 px-1  transition-all ${
                  showTagsInput
                    ? " rounded-full bg-gray-500 text-white"
                    : "text-gray-500"
                } `}
              >
                <span>{e}</span>
                {showTagsInput && (
                  <button
                    onClick={() => {
                      mutation.mutate({ tag: e, method: "DELETE" });
                    }}
                    className="ml-1 flex justify-center items-center bg-white text-gray-500 rounded-full w-3 h-3 hover:text-red-500"
                  >
                    <FontAwesomeIcon
                      icon={faX}
                      size="xs"
                    />
                  </button>
                )}
              </li>
            );
          })
        ) : (
          <li>
            <p className="text-gray-400 text-xs font-medium tracking-wider text-left uppercase py-0.5 px-1">
              {isLoading
                ? "Cargando categorías..."
                : "No has agregado categorías a tu perfil"}
            </p>
          </li>
        )}
      </ul>
      <div>
        <ToggleButon
          state={showTagsInput}
          setState={setShowTagsInput}
          icon={faPenToSquare}
        />
      </div>

      {showTagsInput && (
        <div className=" w-full md:w-1/2 mx-auto my-2">
          <FlexInputList
            modelType="user"
            type="tag"
            inputList={profileTags}
            setInputList={setProfileTags}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCategories;

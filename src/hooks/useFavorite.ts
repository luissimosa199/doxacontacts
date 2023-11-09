import { toggleFavorite } from "@/utils/toggleFavorite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useFavorite(username: string) {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const { data, isLoading } = useQuery(["favorites", username], async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/favorites`
    );
    if (response.ok) {
      const data = await response.json();

      return data;
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(toggleFavorite, {
    onMutate: ({ email, method }) => {
      queryClient.cancelQueries(["favorites", username]);
      const previousFavorites =
        queryClient.getQueryData<string[]>(["favorites", username]) || [];

      if (Array.isArray(previousFavorites)) {
        if (method === "DELETE") {
          queryClient.setQueryData(
            ["favorites", username],
            previousFavorites.filter((fav) => fav !== email)
          );

          setIsFavorite(false);
        } else {
          queryClient.setQueryData(
            ["favorites", username],
            [...previousFavorites, email]
          );
          setIsFavorite(true);
        }
      }
      return { previousFavorites };
    },
    onSettled: () => {
      queryClient.invalidateQueries(["favorites", username]);
    },
  });

  useEffect(() => {
    if (data) {
      setIsFavorite(data.includes(username));
    }
  }, [data, username]);

  return {
    isFavorite,
    mutation,
    isLoading,
  };
}

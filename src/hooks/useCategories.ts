import { useQuery } from "@tanstack/react-query";

export const fetchCategories = async (modelType?: string) => {
  const endpoint = modelType
    ? `/api/getCategories?modelType=${modelType}`
    : `/api/getCategories`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useCategories = (modelType?: string) => {
  const { data, isLoading, error } = useQuery<string[] | Error>({
    queryFn: () => fetchCategories(modelType),
    queryKey: ["categories", modelType],
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });

  return { data, isLoading, error };
};

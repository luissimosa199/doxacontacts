export const toggleFavorite = async ({
  email,
  method,
}: {
  email: string;
  method: "DELETE" | "POST";
}) => {
  const response = await fetch(`/api/user/favorites`, {
    method,
    body: email,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

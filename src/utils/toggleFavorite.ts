export const toggleFavorite = async ({
  email,
  method,
}: {
  email: string;
  method: "DELETE" | "POST";
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/favorites`,
    {
      method,
      body: email,
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

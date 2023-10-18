export const fetchCategories = async (modelType?: string) => {
  try {
    const response = await fetch(
      `/api/getCategories${modelType ? `?modelType=${modelType}` : ""}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

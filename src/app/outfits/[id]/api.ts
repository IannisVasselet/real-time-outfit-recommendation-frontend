import { Outfit } from "../api";

export const getOutfit = async (id: number): Promise<Outfit> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/outfits/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch outfit");
  }

  return response.json();
};

export const deleteOutfit = async (id: number): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/outfits/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete outfit");
  }
};

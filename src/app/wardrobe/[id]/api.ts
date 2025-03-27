import { Clothing, CategoryFilter } from "../api";

export interface ClothingUpdateData {
  name: string;
  description?: string;
  image_url: string;
  category_id: number;
  color: string;
  pattern?: string;
  style: string;
  season: string;
  embeddings?: Record<string, any>;
}

export async function getClothing(id: number): Promise<Clothing> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clothes/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch clothing item");
  }

  return response.json();
}

export async function getCategories(): Promise<CategoryFilter[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function updateClothing(
  id: number,
  data: ClothingUpdateData
): Promise<Clothing> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clothes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to update clothing");
  }

  return response.json();
}

export async function deleteClothing(id: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clothes/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete clothing");
  }
}

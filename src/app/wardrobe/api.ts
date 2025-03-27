export interface Clothing {
  id: number;
  name: string;
  description?: string;
  image_url: string;
  category_id: number;
  color: string;
  pattern?: string;
  style: string;
  season: string;
  category?: {
    id: number;
    name: string;
  };
}

export interface CategoryFilter {
  id: number | null;
  name: string;
}

export async function getClothes(
  skip: number = 0,
  limit: number = 20,
  categoryId?: number
): Promise<Clothing[]> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clothes/?skip=${skip}&limit=${limit}`;

  if (categoryId) {
    url += `&category_id=${categoryId}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch clothes");
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

  const categories = await response.json();
  return [{ id: null, name: "Tous" }, ...categories];
}

import { Clothing } from "../api";

export interface CategoryOption {
  id: number;
  name: string;
}

export interface AnalysisResult {
  embeddings: number[];
  similar_items: any[];
  metadata: {
    category?: string;
    style?: string;
    color?: string;
    pattern?: string;
    season?: string;
  };
}

export interface ClothingFormData {
  name: string;
  description?: string;
  image_url: string;
  category_id: number;
  color: string;
  pattern?: string;
  style: string;
  season: string;
  embeddings?: Record<string, number[]>;
}

export async function getCategories(): Promise<CategoryOption[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/image-analysis/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  return response.json();
}

export async function addClothing(
  clothingData: ClothingFormData
): Promise<Clothing> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clothes/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clothingData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to add clothing");
  }

  return response.json();
}

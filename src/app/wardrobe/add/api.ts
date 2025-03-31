import { Clothing } from "../api";

export interface CategoryOption {
  id: number;
  name: string;
}

export interface AnalysisResult {
  analysis: {
    color: string;
    predicted_type: string;
    predicted_season: string;
    predicted_style: string;
  };
  similar_items: any[];
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
    const errorData = await response.json();
    console.error("Erreur API:", errorData);

    // Gestion des erreurs de validation FastAPI
    if (errorData.detail && Array.isArray(errorData.detail)) {
      // Format des erreurs de validation FastAPI
      const errorMessages = errorData.detail
        .map((err: any) => `${err.loc.join(".")}: ${err.msg}`)
        .join(", ");
      throw new Error(errorMessages);
    } else if (typeof errorData.detail === "string") {
      // Message d'erreur simple
      throw new Error(errorData.detail);
    } else if (errorData.detail) {
      // Autre format d'erreur
      throw new Error(JSON.stringify(errorData.detail));
    } else {
      // Erreur générique
      throw new Error(
        "Échec de l'ajout du vêtement. Veuillez vérifier vos données."
      );
    }
  }

  return response.json();
}

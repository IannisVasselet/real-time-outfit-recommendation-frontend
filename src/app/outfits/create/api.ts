import { Clothing } from "../../wardrobe/api";

export interface OutfitItemCreate {
  clothing_id: number;
  position: number;
}

export interface OutfitCreate {
  name: string;
  description?: string;
  style: string;
  season: string;
  occasion: string;
  items: OutfitItemCreate[];
}

export interface OutfitResponse {
  id: number;
  name: string;
  description?: string;
  style: string;
  season: string;
  occasion: string;
  popularity_score: number;
  created_at: string;
  updated_at: string;
  items: Array<{
    id: number;
    outfit_id: number;
    clothing_id: number;
    position: number;
    clothing: Clothing;
  }>;
}

export const createOutfit = async (
  outfitData: OutfitCreate
): Promise<OutfitResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/outfits/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(outfitData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ||
        `Erreur lors de la création de la tenue: ${response.status}`
    );
  }

  return response.json();
};

export const getStyles = (): string[] => {
  return ["casual", "formal", "sport", "vintage", "business", "soirée"];
};

export const getSeasons = (): string[] => {
  return ["printemps", "été", "automne", "hiver", "toutes saisons"];
};

export const getOccasions = (): string[] => {
  return ["quotidien", "travail", "soirée", "sport", "cérémonie", "vacances"];
};

export const fetchWardrobe = async (): Promise<Clothing[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/clothes/`
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la garde-robe");
  }

  return response.json();
};

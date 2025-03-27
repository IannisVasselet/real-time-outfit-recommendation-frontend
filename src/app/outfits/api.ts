export interface OutfitItem {
  id: number;
  outfit_id: number;
  clothing_id: number;
  position: number;
  clothing: {
    id: number;
    name: string;
    image_url: string;
    color: string;
    style: string;
    category: {
      id: number;
      name: string;
    };
  };
}

export interface Outfit {
  id: number;
  name: string;
  description?: string;
  style: string;
  season: string;
  occasion?: string;
  popularity_score: number;
  items: OutfitItem[];
  created_at: string;
  updated_at: string;
}

export interface OutfitFilters {
  style?: string;
  season?: string;
  occasion?: string;
}

export const getOutfits = async (
  skip: number = 0,
  limit: number = 12,
  filters: OutfitFilters = {}
): Promise<Outfit[]> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/outfits/?skip=${skip}&limit=${limit}`;

  // Ajout des filtres à l'URL
  if (filters.style) {
    url += `&style=${filters.style}`;
  }
  if (filters.season) {
    url += `&season=${filters.season}`;
  }
  if (filters.occasion) {
    url += `&occasion=${filters.occasion}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch outfits");
  }

  return response.json();
};

export const getOutfitStyles = (): string[] => {
  return ["casual", "formal", "sport", "vintage", "business", "soirée"];
};

export const getSeasons = (): string[] => {
  return ["printemps", "été", "automne", "hiver", "toutes saisons"];
};

export const getOccasions = (): string[] => {
  return ["quotidien", "travail", "soirée", "sport", "cérémonie", "vacances"];
};

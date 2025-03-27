const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'\;

export interface Outfit {
  id: number;
  name: string;
  style: string;
  season: string;
  occasion: string;
  items: any[];
}

export async function getOutfits(params?: {
  style?: string;
  season?: string;
  occasion?: string;
}): Promise<Outfit[]> {
  const queryParams = new URLSearchParams();
  if (params?.style) queryParams.append('style', params.style);
  if (params?.season) queryParams.append('season', params.season);
  if (params?.occasion) queryParams.append('occasion', params.occasion);
  
  const response = await fetch(`${API_URL}/api/v1/outfits?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch outfits');
  }
  return response.json();
}

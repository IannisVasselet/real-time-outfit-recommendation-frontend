import { Outfit } from "../outfits/api";

export interface RecommendationRequest {
  weather?: string;
  temperature?: number;
  occasion?: string;
  preferred_styles?: string[];
  preferred_colors?: string[];
  excluded_clothing_ids?: number[];
}

export interface WeatherInfo {
  condition: string;
  temperature: number;
  location: string;
  icon: string;
}

export const getRecommendations = async (
  params: RecommendationRequest
): Promise<Outfit[]> => {
  const queryParams = new URLSearchParams();

  if (params.weather) {
    queryParams.append("weather", params.weather);
  }

  if (params.temperature) {
    queryParams.append("temperature", params.temperature.toString());
  }

  if (params.occasion) {
    queryParams.append("occasion", params.occasion);
  }

  if (params.preferred_styles && params.preferred_styles.length > 0) {
    queryParams.append("preferred_styles", params.preferred_styles.join(","));
  }

  if (params.preferred_colors && params.preferred_colors.length > 0) {
    queryParams.append("preferred_colors", params.preferred_colors.join(","));
  }

  if (params.excluded_clothing_ids && params.excluded_clothing_ids.length > 0) {
    queryParams.append(
      "excluded_clothing_ids",
      params.excluded_clothing_ids.join(",")
    );
  }

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/api/v1/recommendations/?${queryParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des recommandations");
  }

  return response.json();
};

// Utilisez la date du jour comme seed pour avoir une météo cohérente pendant une journée
export const getCurrentWeather = async (
    location?: string
  ): Promise<WeatherInfo> => {
    // Seed basé sur la date du jour pour avoir une météo constante pendant une session
    const today = new Date();
    const daySeed = today.getDate() + today.getMonth() * 31;
    
    // Utiliser le seed pour déterminer la météo du jour
    const conditions = [
      "ensoleillé",
      "nuageux",
      "pluvieux",
      "neigeux",
      "venteux",
    ];
    
    // Utiliser un calcul déterministe basé sur la date
    const conditionIndex = daySeed % conditions.length;
    const condition = conditions[conditionIndex];
    
    // Température déterministe basée sur la condition et la date
    let baseTemp;
    switch (condition) {
      case "ensoleillé": baseTemp = 25; break;
      case "nuageux": baseTemp = 20; break;
      case "pluvieux": baseTemp = 15; break;
      case "neigeux": baseTemp = 0; break;
      case "venteux": baseTemp = 18; break;
      default: baseTemp = 20;
    }
    
    // Légère variation basée sur l'heure (±2°C)
    const hourVariation = (new Date().getHours() % 12) / 6 - 1; // -1 à 1
    const temperature = Math.round(baseTemp + hourVariation * 2);
    

  // Icône correspondant à la condition météo
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "ensoleillé":
        return "☀️";
      case "nuageux":
        return "☁️";
      case "pluvieux":
        return "🌧️";
      case "neigeux":
        return "❄️";
      case "venteux":
        return "🌬️";
      default:
        return "🌤️";
    }
  };

  return {
    condition,
    temperature,
    location: location || "Paris, France",
    icon: getWeatherIcon(condition),
  };
};

export const getOccasions = (): string[] => {
  return ["quotidien", "travail", "soirée", "sport", "cérémonie", "vacances"];
};

export const getStyles = (): string[] => {
  return ["casual", "formal", "sport", "vintage", "business", "soirée"];
};

export const getCommonColors = (): string[] => {
  return [
    "noir",
    "blanc",
    "gris",
    "bleu",
    "marine",
    "bleu clair",
    "rouge",
    "bordeaux",
    "rose",
    "vert",
    "olive",
    "kaki",
    "jaune",
    "beige",
    "marron",
    "violet",
    "lavande",
    "orange",
  ];
};

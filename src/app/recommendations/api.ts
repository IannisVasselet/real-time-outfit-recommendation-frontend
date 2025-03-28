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

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export const getRecommendations = async (
  params: RecommendationRequest
): Promise<Outfit[]> => {
  const queryParams = new URLSearchParams();

  if (params.weather) {
    queryParams.append("weather", params.weather);
  }

  if (params.temperature !== undefined) {
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

  console.log("Requête de recommandations vers:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erreur API:", errorText);
    throw new Error(
      `Erreur lors de la récupération des recommandations: ${response.status}`
    );
  }

  return response.json();
};

// Nouvelle fonction pour obtenir la position de l'utilisateur
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error("La géolocalisation n'est pas supportée par votre navigateur")
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Erreur de géolocalisation: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

// Fonction pour obtenir la météo réelle basée sur les coordonnées
export const getWeatherFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<WeatherInfo> => {
  try {
    // Utiliser un service météo comme OpenWeatherMap
    // Note: Vous aurez besoin d'une clé API
    const apiKey =
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "VOTRE_CLE_API";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Impossible de récupérer les données météo");
    }

    const data = await response.json();

    // Mapper les conditions météo d'OpenWeatherMap vers vos conditions
    const weatherMapping: { [key: string]: string } = {
      Clear: "ensoleillé",
      Clouds: "nuageux",
      Rain: "pluvieux",
      Drizzle: "pluvieux",
      Thunderstorm: "orageux",
      Snow: "neigeux",
      Mist: "brumeux",
      Fog: "brumeux",
      Haze: "brumeux",
    };

    const condition = weatherMapping[data.weather[0].main] || "nuageux";

    return {
      condition,
      temperature: Math.round(data.main.temp),
      location: data.name,
      icon: getWeatherIcon(condition),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la météo:", error);
    // En cas d'erreur, utiliser la fonction de secours
    return getCurrentWeather();
  }
};

// Mise à jour de la fonction getCurrentWeather pour utiliser la géolocalisation
export const getCurrentWeather = async (
  useRealLocation: boolean = true
): Promise<WeatherInfo> => {
  if (useRealLocation) {
    try {
      const position = await getUserLocation();
      return await getWeatherFromCoordinates(
        position.latitude,
        position.longitude
      );
    } catch (error) {
      console.warn(
        "Impossible d'utiliser la géolocalisation, utilisation des données simulées:",
        error
      );
      // Continue avec la météo simulée en cas d'erreur
    }
  }

  // Météo simulée (code existant)
  const today = new Date();
  const daySeed = today.getDate() + today.getMonth() * 31;

  const conditions = [
    "ensoleillé",
    "nuageux",
    "pluvieux",
    "neigeux",
    "venteux",
  ];

  const conditionIndex = daySeed % conditions.length;
  const condition = conditions[conditionIndex];

  let baseTemp;
  switch (condition) {
    case "ensoleillé":
      baseTemp = 25;
      break;
    case "nuageux":
      baseTemp = 20;
      break;
    case "pluvieux":
      baseTemp = 15;
      break;
    case "neigeux":
      baseTemp = 0;
      break;
    case "venteux":
      baseTemp = 18;
      break;
    default:
      baseTemp = 20;
  }

  const hourVariation = (new Date().getHours() % 12) / 6 - 1;
  const temperature = Math.round(baseTemp + hourVariation * 2);

  return {
    condition,
    temperature,
    location: "Paris, France", // Emplacement par défaut
    icon: getWeatherIcon(condition),
  };
};

// Fonction helper pour obtenir l'icône météo
export const getWeatherIcon = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case "ensoleillé":
      return "☀️";
    case "nuageux":
      return "☁️";
    case "pluvieux":
      return "🌧️";
    case "neigeux":
      return "❄️";
    case "venteux":
      return "💨";
    case "orageux":
      return "⛈️";
    case "brumeux":
      return "🌫️";
    default:
      return "🌤️";
  }
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

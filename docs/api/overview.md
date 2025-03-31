# Documentation API Frontend

## 🔌 Services API

### Configuration
Le frontend utilise Axios pour les appels API. La configuration de base se trouve dans `src/services/api.ts`.

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

### Types Principaux

```typescript
interface Outfit {
  id: number;
  name: string;
  style: string;
  season: string;
  occasion: string;
  items: ClothingItem[];
}

interface ClothingItem {
  id: number;
  name: string;
  category: string;
  color: string;
  style: string;
  season: string;
  imageUrl: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  favoriteStyles: string[];
  preferredColors: string[];
  seasonalPreferences: Record<string, string[]>;
}
```

## 📡 Endpoints

### Authentification
```typescript
/**
 * Connexion utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<{ token: string; user: User }>}
 */
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

/**
 * Inscription utilisateur
 * @param {Object} userData - Données d'inscription
 * @returns {Promise<User>}
 */
export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};
```

### Garde-robe
```typescript
/**
 * Récupérer tous les vêtements
 * @param {Object} filters - Filtres optionnels
 * @returns {Promise<ClothingItem[]>}
 */
export const getClothingItems = async (filters?: {
  category?: string;
  style?: string;
  season?: string;
}) => {
  const queryParams = new URLSearchParams(filters);
  const response = await axios.get(`${API_URL}/wardrobe?${queryParams}`);
  return response.data;
};

/**
 * Ajouter un vêtement
 * @param {FormData} formData - Données du vêtement avec image
 * @returns {Promise<ClothingItem>}
 */
export const addClothingItem = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/wardrobe`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
```

### Tenues
```typescript
/**
 * Récupérer les tenues
 * @param {Object} params - Paramètres de filtrage
 * @returns {Promise<Outfit[]>}
 */
export const getOutfits = async (params?: {
  style?: string;
  season?: string;
  occasion?: string;
}): Promise<Outfit[]> => {
  const queryParams = new URLSearchParams(params);
  const response = await axios.get(`${API_URL}/outfits?${queryParams}`);
  return response.data;
};

/**
 * Créer une tenue
 * @param {Object} outfitData - Données de la tenue
 * @returns {Promise<Outfit>}
 */
export const createOutfit = async (outfitData: {
  name: string;
  style: string;
  season: string;
  occasion: string;
  itemIds: number[];
}) => {
  const response = await axios.post(`${API_URL}/outfits`, outfitData);
  return response.data;
};
```

### Recommandations
```typescript
/**
 * Obtenir des recommandations de tenues
 * @param {Object} params - Paramètres de recommandation
 * @returns {Promise<Outfit[]>}
 */
export const getRecommendations = async (params: {
  occasion?: string;
  weather?: string;
  style?: string;
}) => {
  const queryParams = new URLSearchParams(params);
  const response = await axios.get(`${API_URL}/recommendations?${queryParams}`);
  return response.data;
};
```

## 🔒 Sécurité

### Intercepteurs
```typescript
// Ajout du token d'authentification
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gestion des erreurs
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirection vers la page de connexion
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Validation
```typescript
/**
 * Validation des données de formulaire
 * @param {Object} data - Données à valider
 * @returns {boolean}
 */
export const validateFormData = (data: Record<string, any>): boolean => {
  // Implémentation de la validation
  return true;
};
```

## 📝 Exemples d'Utilisation

### Hooks Personnalisés
```typescript
/**
 * Hook pour la gestion de l'authentification
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${API_URL}/auth/me`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};

/**
 * Hook pour la gestion des tenues
 */
export const useOutfits = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOutfits = async (filters?: Record<string, string>) => {
    try {
      const data = await getOutfits(filters);
      setOutfits(data);
    } catch (error) {
      console.error('Erreur de chargement des tenues:', error);
    } finally {
      setLoading(false);
    }
  };

  return { outfits, loading, fetchOutfits };
};
```

### Composants
```typescript
/**
 * Exemple d'utilisation dans un composant
 */
const OutfitList: React.FC = () => {
  const { outfits, loading, fetchOutfits } = useOutfits();

  useEffect(() => {
    fetchOutfits();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {outfits.map((outfit) => (
        <OutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </div>
  );
};
``` 
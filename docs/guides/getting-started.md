# Guide de Démarrage Frontend

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ installé
- npm ou yarn
- Git
- IDE (VS Code recommandé)

### Installation

1. **Cloner le Repository**
```bash
git clone https://github.com/votre-username/real-time-outfit-recommandation.git
cd real-time-outfit-recommandation/frontend
```

2. **Installer les Dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configuration Environnement**
```bash
cp .env.example .env.local
```

Éditer `.env.local` avec vos variables :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. **Lancer le Serveur de Développement**
```bash
npm run dev
# ou
yarn dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🛠 Configuration IDE

### VS Code

1. **Extensions Recommandées**
- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense

2. **Configuration Workspace**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── app/                 # Pages et routes
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Page d'accueil
│   │   ├── wardrobe/       # Gestion garde-robe
│   │   ├── outfits/        # Gestion tenues
│   │   └── recommendations/# Recommandations
│   ├── components/         # Composants réutilisables
│   │   ├── Navigation.tsx  # Barre de navigation
│   │   └── ...
│   └── services/          # Services et API
│       └── api.ts         # Configuration API
├── public/               # Assets statiques
└── docs/                # Documentation
```

## 🎨 Styles et Thème

### Tailwind CSS
Le projet utilise Tailwind CSS pour le styling. Configuration dans `tailwind.config.js`.

### Thème par Défaut
```typescript
// globals.css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Composants de Base
```typescript
// Exemple de bouton
const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${
        variant === 'primary'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
};
```

## 📡 API et Services

### Configuration API
```typescript
// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Configuration Axios
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
```

### Exemple d'Utilisation
```typescript
// Composant avec appel API
const WardrobePage: React.FC = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/wardrobe');
        setItems(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ma Garde-robe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <ClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
```

## 🧪 Tests

### Configuration
Le projet utilise Jest et React Testing Library.

### Exécution des Tests
```bash
# Tests unitaires
npm run test

# Mode watch
npm run test:watch

# Couverture
npm run test:coverage
```

### Exemple de Test
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button label="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button label="Test" onClick={onClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Vérification de la Build
```bash
npm run start
```

### Plateformes de Déploiement
1. **Vercel** (Recommandé)
   - Connexion avec GitHub
   - Déploiement automatique

2. **Netlify**
   - Configuration via `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `out`

3. **AWS Amplify**
   - Configuration via `amplify.yml`
   - Intégration CI/CD

## 🐛 Débogage

### Console Logs
```typescript
// Utiliser des logs descriptifs
console.log('Données reçues:', data);
console.error('Erreur lors de la requête:', error);
```

### React DevTools
- Installation de l'extension Chrome/Firefox
- Inspection des composants
- Analyse des performances

### Erreurs Communes
1. **API Inaccessible**
   - Vérifier `NEXT_PUBLIC_API_URL`
   - Vérifier le statut du backend

2. **Erreurs TypeScript**
   - Vérifier les types
   - Utiliser `--strict`

3. **Problèmes de Build**
   - Nettoyer le cache : `npm run clean`
   - Vérifier les dépendances

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://reactjs.org/docs)
- [Documentation Tailwind](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Guide ESLint](https://eslint.org/docs/user-guide)
- [Guide Prettier](https://prettier.io/docs/en) 
# Guide de Contribution Frontend

## 🌟 Comment Contribuer

### Prérequis
- Node.js 18+
- npm ou yarn
- Connaissance de React, TypeScript et Next.js
- IDE avec support TypeScript (VS Code recommandé)

### Configuration de l'Environnement
1. Fork du repository
2. Clone local :
```bash
git clone https://github.com/votre-username/real-time-outfit-recommandation.git
cd real-time-outfit-recommandation/frontend
```

3. Installation des dépendances :
```bash
npm install
```

4. Configuration des variables d'environnement :
```bash
cp .env.example .env.local
```

### Workflow de Développement

#### 1. Création d'une Branche
```bash
git checkout -b feature/nom-de-la-feature
# ou
git checkout -b fix/nom-du-fix
```

#### 2. Standards de Code
- Utiliser TypeScript strict mode
- Suivre les conventions ESLint
- Documenter avec JSDoc
- Ajouter des tests unitaires

#### 3. Commits
Format : `type(scope): description`

Types :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

Exemple :
```bash
git commit -m "feat(auth): ajouter la validation du formulaire de connexion"
```

### Tests
Exécuter avant chaque commit :
```bash
npm run lint     # Vérification ESLint
npm run test     # Tests unitaires
npm run build    # Vérification de la build
```

### Pull Requests

#### Checklist PR
- [ ] Tests passent
- [ ] Documentation mise à jour
- [ ] Code formaté
- [ ] Types vérifiés
- [ ] Pas de secrets exposés
- [ ] Changelog mis à jour

#### Template PR
```markdown
## Description
Description claire et concise des changements.

## Type de Changement
- [ ] 🚀 Nouvelle fonctionnalité
- [ ] 🐛 Correction de bug
- [ ] 📚 Documentation
- [ ] ♻️ Refactoring
- [ ] 🎨 Style
- [ ] ✅ Tests

## Tests
Description des tests effectués.

## Screenshots
Si applicable, ajoutez des captures d'écran.

## Impact
Description de l'impact des changements.
```

### Bonnes Pratiques

#### Components
```typescript
// ✅ Bon
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};

// ❌ À éviter
const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

#### Hooks
```typescript
// ✅ Bon
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logique d'authentification
  }, []);

  return { user, loading };
};

// ❌ À éviter
const useAuth = () => {
  const user = {};
  return user;
};
```

#### Tests
```typescript
// ✅ Bon
describe('Button', () => {
  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button label="Test" onClick={onClick} />);
    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalled();
  });
});

// ❌ À éviter
test('button works', () => {
  render(<Button />);
});
```

### Support
Pour toute question :
- Ouvrir une issue
- Contacter l'équipe de maintenance
- Consulter la documentation 
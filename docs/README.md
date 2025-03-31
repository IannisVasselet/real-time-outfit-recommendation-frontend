# Documentation du Frontend

## Table des Matières
- [Vue d'ensemble](#vue-densemble)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Développement](#développement)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Ressources](#ressources)

## Vue d'ensemble
Le frontend est une application web moderne construite avec Next.js 15, React 19 et TypeScript. Elle offre une interface utilisateur intuitive pour :
- La gestion de la garde-robe personnelle
- La visualisation des tenues
- Les recommandations d'outfits en temps réel
- La gestion du profil utilisateur

## Installation
1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```
3. Lancer le serveur de développement :
```bash
npm run dev
```

## Configuration
### Variables d'Environnement
Créer un fichier `.env.local` avec :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Configuration TypeScript
- Mode strict activé
- Alias de chemins configurés (@/*)
- Support ESNext

### Configuration ESLint
- Extension des règles Next.js
- Support TypeScript
- Configuration personnalisée dans `eslint.config.mjs`

## Architecture
### Structure des Dossiers
```
frontend/
├── src/
│   ├── app/              # Pages et routes Next.js
│   ├── components/       # Composants React réutilisables
│   └── services/        # Services API et utilitaires
├── public/              # Assets statiques
└── docs/               # Documentation
```

### Technologies Principales
- **Next.js 15** : Framework React avec support SSR/SSG
- **React 19** : Bibliothèque UI avec Hooks
- **TypeScript** : Typage statique
- **TailwindCSS** : Styling utilitaire
- **Axios** : Client HTTP
- **React Dropzone** : Gestion des uploads

## Développement
### Standards de Code
- TypeScript strict mode
- ESLint pour le linting
- Prettier pour le formatage
- Tests unitaires recommandés

### Composants
- Approche fonctionnelle
- Props typées
- Documentation JSDoc
- Tests unitaires

### État Global
- Context API pour l'état partagé
- Hooks personnalisés pour la logique réutilisable

## Tests
### Types de Tests
- Tests unitaires avec Jest
- Tests d'intégration avec React Testing Library
- Tests E2E (à venir)

### Commandes
```bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## Déploiement
### Prérequis
- Node.js 18+
- Variables d'environnement configurées
- Build de production

### Étapes
1. Build de production :
```bash
npm run build
```

2. Démarrer en production :
```bash
npm start
```

### Plateformes Recommandées
- Vercel (recommandé)
- AWS Amplify
- Netlify

## Ressources
- [Documentation Next.js](https://nextjs.org/docs)
- [Guide de Contribution](../CONTRIBUTING.md)
- [Code de Conduite](../CODE_OF_CONDUCT.md)
- [Changelog](../CHANGELOG.md) 
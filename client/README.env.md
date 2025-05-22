# Configuration des Variables d'Environnement

## Introduction

Ce document explique comment les variables d'environnement sont utilisées dans l'application front-end pour sécuriser les URL des API.

## Fichiers de Configuration

### `.env`

Ce fichier contient les variables d'environnement réelles utilisées par l'application. Il ne doit pas être commité dans le dépôt Git.

Variables disponibles :
```
VITE_API_URL=http://localhost:4000
```

### `.env.example`

Ce fichier sert de modèle pour configurer votre propre fichier `.env`. Il doit être commité dans le dépôt Git.

### `src/config/api.js`

Ce fichier centralise toutes les URL d'API utilisées dans l'application. Il utilise les variables d'environnement pour construire les URL.

## Comment Utiliser

1. Créez un fichier `.env` à la racine du projet (s'il n'existe pas déjà)
2. Définissez la variable `VITE_API_URL` avec l'URL de votre API
3. Redémarrez le serveur de développement

## Environnements Différents

Pour différents environnements (développement, test, production), vous pouvez créer différents fichiers :

- `.env.development` - Pour le développement local
- `.env.production` - Pour la production

## Accéder aux Variables d'Environnement

Dans le code, utilisez `import.meta.env.VITE_API_URL` pour accéder directement à une variable d'environnement, ou utilisez les constantes définies dans `src/config/api.js`.

## Sécurité

Rappels importants :

- Ne stockez jamais de secrets sensibles (clés API privées, mots de passe) dans le code front-end
- Seules les variables préfixées par `VITE_` sont exposées au code client
- Ajoutez `.env` à votre fichier `.gitignore` pour éviter de commiter des informations sensibles
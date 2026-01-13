# 📱 Évaluation Formation - Guide Développeur

> Guide rapide pour reprendre le projet. Tout ce qu'il faut savoir, rien de plus.

---

## ⚠️ IMPORTANT : Branches Git

### 🌿 `main` - Version Affichage Seule
- **UI complète** : Login, Home, caméra, galerie, design
- **PAS d'intégration API** : Fonctionne en local sans backend
- Photos stockées en mémoire uniquement
- **Utilité** : Démo, tests UI, développement frontend

### 🌿 `develop` - Version Intégration API ⭐
- **UI complète** + **Intégration backend Laravel**
- Connexion réelle avec API
- Upload/Download photos depuis serveur
- Gestion tokens, auth, etc.
- **👉 C'EST CETTE VERSION QU'IL FAUT UTILISER POUR L'INTÉGRATION BACKEND**

```bash
# Pour travailler sur l'intégration backend :
git checkout develop
```

---

## 🚀 Démarrage Rapide

### 1. Installation
```bash
npm install
```

### 2. Lancer en Dev
```bash
npx expo start
```
Puis scannez le QR code avec **Expo Go** (Android/iOS).

### 3. Tester sur émulateur
```bash
# Android
npx expo start --android

# iOS (macOS uniquement)
npx expo start --ios
```

---

## 📦 Stack Technique

- **Framework** : React Native avec Expo
- **Navigation** : React Navigation (Stack)
- **Backend** : Laravel (API REST)
- **HTTP** : Axios
- **Storage** : AsyncStorage (tokens)
- **Icônes** : Ionicons (@expo/vector-icons)

### Dépendances principales
```json
{
  "expo": "~54.0.0",
  "react-native": "0.76.6",
  "@react-navigation/native": "^7.0.15",
  "axios": "^1.7.9",
  "@react-native-async-storage/async-storage": "2.1.0",
  "expo-camera": "~16.0.10",
  "expo-image-picker": "~16.0.4"
}
```

---

## 📁 Structure du Projet

```
AllPro/
├── App.js                      # Point d'entrée + Navigation
├── screens/                    # Écrans de l'app
│   ├── LoginScreen.js          # Connexion (email/password)
│   └── HomeScreen.js           # Accueil (caméra/galerie + photos)
├── contexts/                   # Contextes React
│   └── AuthContext.js          # Gestion auth globale
├── services/                   # Logique API
│   ├── authService.js          # Login/Logout
│   └── photoService.js         # Upload/Get/Delete photos
├── config/                     # Configuration
│   └── api.js                  # URL API (__DEV__ / prod)
└── assets/                     # Images + Logo
```

---

## 🎨 Composants Principaux

### LoginScreen
**Rôle** : Authentification utilisateur

**Features** :
- Champs email + mot de passe
- Validation frontend
- Appel API `/login`
- Sauvegarde du token dans AsyncStorage
- Navigation vers HomeScreen après succès

**Hooks** :
- `useAuth()` : Contexte d'authentification

---

### HomeScreen
**Rôle** : Gestion des photos

**Features** :
- Boutons caméra/galerie avec icônes
- Éditeur optionnel (pinch/zoom)
- Upload auto vers API après capture
- Affichage grille des photos
- Déconnexion

**Hooks** :
- `useAuth()` : Déconnexion
- `useEffect()` : Charger photos au mount

---

## 🔌 Intégration Backend Laravel

### Configuration

**Fichier** : `config/api.js`
```javascript
export const API_URL = __DEV__
  ? 'http://localhost:8000/api'          // Dev local
  : 'https://votre-domaine.com/api';     // Prod
```

**⚠️ Important** : Remplacer l'URL de prod avant déploiement !

---

### Structure API Attendue

#### 1. **POST /login**
**Envoi** :
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse** :
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJ...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

#### 2. **POST /logout**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "message": "Déconnexion réussie"
}
```

---

#### 3. **GET /photos**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "photos": [
    {
      "id": 1,
      "url": "https://domain.com/storage/photos/photo1.jpg",
      "created_at": "2026-01-13T10:00:00.000000Z"
    },
    {
      "id": 2,
      "url": "https://domain.com/storage/photos/photo2.jpg",
      "created_at": "2026-01-13T11:00:00.000000Z"
    }
  ]
}
```

---

#### 4. **POST /photos**
**Headers** :
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Envoi** :
```
FormData {
  photo: File (image/jpeg, image/png)
}
```

**Réponse** :
```json
{
  "id": 3,
  "url": "https://domain.com/storage/photos/photo3.jpg",
  "created_at": "2026-01-13T12:00:00.000000Z"
}
```

---

#### 5. **DELETE /photos/:id**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "message": "Photo supprimée"
}
```

---

## 🔐 Authentification

### Flux
1. User entre email/password
2. App → `POST /login`
3. Backend → `{ token, user }`
4. App sauvegarde token dans **AsyncStorage**
5. Toutes les requêtes suivantes incluent : `Authorization: Bearer {token}`

### Intercepteur Axios
Le token est automatiquement ajouté à chaque requête (voir `services/authService.js`).

---

## 🌿 Workflow Git

### Branches
```
main         # UI seulement (affichage local, pas d'API)
develop      # UI + Intégration API Laravel ⭐ UTILISER CELLE-CI
feature/*    # Nouvelles fonctionnalités
```

**⚠️ Important** :
- `main` = Version démo sans backend
- `develop` = Version production avec intégration API
- **Toujours travailler sur `develop` pour l'intégration backend**

### Commandes courantes
```bash
# Basculer sur develop (IMPORTANT)
git checkout develop

# Créer une branche feature depuis develop
git checkout -b feature/ma-feature

# Commit
git add .
git commit -m "Description"

# Merger dans develop
git checkout develop
git merge feature/ma-feature
git push origin develop
```

---

## 🧪 Tests & Debug

### Mode Dev
```bash
npx expo start
# Appuyez sur 'j' pour ouvrir le debugger Chrome
# Appuyez sur 'r' pour recharger
```

### Logs
```bash
# Voir les logs React Native
npx expo start
# Les console.log() s'affichent dans le terminal
```

### Tester l'API locale
1. Lancer Laravel : `php artisan serve`
2. API disponible sur `http://localhost:8000`
3. Modifier `config/api.js` si besoin

---

## 📦 Build Production

### Android (APK)
```bash
eas build --platform android
```

### iOS (IPA)
```bash
eas build --platform ios
```

**Note** : Nécessite un compte Expo et EAS CLI configuré.

---

## 🐛 Problèmes Courants

### "Unable to resolve module"
```bash
npm install
npx expo start -c  # Clear cache
```

### API ne répond pas
- Vérifier `config/api.js`
- Vérifier que Laravel tourne
- Vérifier les CORS sur Laravel

### Token expiré
- L'app déconnecte auto si token invalide
- Géré dans l'intercepteur Axios

---

## 📝 TODO Backend Laravel

Le backend doit implémenter :

✅ **Routes** :
- `POST /api/login`
- `POST /api/logout`
- `GET /api/photos`
- `POST /api/photos`
- `DELETE /api/photos/{id}`

✅ **Auth** :
- Laravel Sanctum ou JWT
- Middleware `auth:sanctum`

✅ **CORS** :
- Autoriser les requêtes depuis l'app mobile

✅ **Storage** :
- Upload photos dans `storage/app/public/photos`
- Symlink : `php artisan storage:link`

---

## 🎯 Features Implémentées

✅ Login/Logout avec API
✅ Gestion token AsyncStorage
✅ Upload photos (caméra + galerie)
✅ Éditeur optionnel (crop/resize)
✅ Affichage grille photos
✅ Loading states
✅ Gestion erreurs
✅ Design responsive

---

## 🚦 Prêt pour le Backend

L'app est **100% prête** à recevoir le backend Laravel.
Il suffit de :

1. Créer les routes Laravel mentionnées ci-dessus
2. Modifier l'URL de prod dans `config/api.js`
3. Tester !

---

**Des questions ?** Lis le code, c'est bien commenté. Sinon, cherche dans la doc Expo. 😉

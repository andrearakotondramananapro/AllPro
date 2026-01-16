# 📱 Évaluation Formation - Guide Développeur

> Guide rapide pour reprendre le projet. Tout ce qu'il faut savoir, rien de plus.

---

## ⚠️ IMPORTANT : Branches Git

### 🌿 `main` - Version Affichage Seule
- **UI complète** : Login, Formulaire d'évaluation, caméra, galerie, design
- **PAS d'intégration API** : Fonctionne en local sans backend
- Données fictives pour les listes (employés, formateurs, centres, etc.)
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
**Rôle** : Formulaire d'évaluation de formation

**Features** :
- **Section Photo** : Capture caméra ou import galerie (une seule photo)
- **Champ Employé** : Auto-complétion avec recherche
- **Champ Catégorie** : Liste déroulante (Sécurité, Technique, Management, Qualité, Informatique)
- **Champ Thème** : Liste déroulante dépendante de la catégorie sélectionnée
- **Champ Formateur** : Auto-complétion avec recherche
- **Champ Centre** : Auto-complétion avec recherche
- **Bouton Valider** : Validation de tous les champs obligatoires
- Déconnexion

**Données fictives** (version `main`) :
- 10 employés
- 5 catégories avec thèmes associés
- 5 formateurs
- 5 centres de formation

**Hooks** :
- `useState()` : Gestion des états du formulaire (photo, sélections, recherches)
- Filtrage dynamique des suggestions

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

#### 6. **GET /employees**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "employees": [
    { "id": 1, "name": "Martin Dupont" },
    { "id": 2, "name": "Marie Durand" }
  ]
}
```

---

#### 7. **GET /categories**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Sécurité",
      "themes": ["Habilitation électrique", "Travail en hauteur", "Gestes et postures", "Incendie"]
    },
    {
      "id": 2,
      "name": "Technique",
      "themes": ["Soudure", "Maintenance industrielle", "Hydraulique", "Pneumatique"]
    }
  ]
}
```

---

#### 8. **GET /trainers**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "trainers": [
    { "id": 1, "name": "Jean Formateur" },
    { "id": 2, "name": "Claire Expert" }
  ]
}
```

---

#### 9. **GET /centers**
**Headers** :
```
Authorization: Bearer {token}
```

**Réponse** :
```json
{
  "centers": [
    { "id": 1, "name": "Centre Paris Nord" },
    { "id": 2, "name": "Centre Lyon Est" }
  ]
}
```

---

#### 10. **POST /evaluations**
**Headers** :
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Envoi** :
```
FormData {
  photo: File (image/jpeg, image/png)
  employee_id: 1
  category: "Sécurité"
  theme: "Habilitation électrique"
  trainer_id: 1
  center_id: 1
}
```

**Réponse** :
```json
{
  "id": 1,
  "employee": { "id": 1, "name": "Martin Dupont" },
  "category": "Sécurité",
  "theme": "Habilitation électrique",
  "trainer": { "id": 1, "name": "Jean Formateur" },
  "center": { "id": 1, "name": "Centre Paris Nord" },
  "photo_url": "https://domain.com/storage/evaluations/eval1.jpg",
  "created_at": "2026-01-16T10:00:00.000000Z"
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

✅ **Routes Auth** :
- `POST /api/login`
- `POST /api/logout`

✅ **Routes Photos** :
- `GET /api/photos`
- `POST /api/photos`
- `DELETE /api/photos/{id}`

✅ **Routes Évaluations** :
- `GET /api/employees` - Liste des employés
- `GET /api/categories` - Liste des catégories avec thèmes
- `GET /api/trainers` - Liste des formateurs
- `GET /api/centers` - Liste des centres de formation
- `POST /api/evaluations` - Soumettre une évaluation

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
✅ Capture photo (caméra + galerie)
✅ Éditeur optionnel (crop/resize)
✅ **Formulaire d'évaluation complet** :
  - Champ employé avec auto-complétion
  - Sélecteur de catégorie
  - Sélecteur de thème (dépendant de la catégorie)
  - Champ formateur avec auto-complétion
  - Champ centre avec auto-complétion
  - Validation de tous les champs obligatoires
✅ Données fictives pour tests (branche `main`)
✅ Loading states
✅ Gestion erreurs
✅ Design responsive

---

## 🚦 Prêt pour le Backend

L'app est **100% prête** à recevoir le backend Laravel.
Il suffit de :

1. Créer les routes Laravel mentionnées ci-dessus (auth, photos, évaluations)
2. Créer les tables : `employees`, `categories`, `themes`, `trainers`, `centers`, `evaluations`
3. Modifier l'URL de prod dans `config/api.js`
4. Remplacer les données fictives par des appels API dans `HomeScreen.js`
5. Tester !

---

**Des questions ?** Lis le code, c'est bien commenté. Sinon, cherche dans la doc Expo. 😉

// Configuration de l'API Laravel
// TODO: Remplacer par l'URL de production lors du déploiement
export const API_URL = __DEV__
  ? 'http://localhost:8000/api'  // Développement local
  : 'https://votre-domaine.com/api';  // Production

export const API_TIMEOUT = 10000; // 10 secondes

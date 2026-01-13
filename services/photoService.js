import api from './authService';

// Service pour les photos
export const photoService = {
  // Récupérer toutes les photos de l'utilisateur
  getPhotos: async () => {
    try {
      const response = await api.get('/photos');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des photos' };
    }
  },

  // Uploader une photo
  uploadPhoto: async (photoUri) => {
    try {
      // Créer un FormData pour envoyer le fichier
      const formData = new FormData();

      // Extraire l'extension du fichier
      const fileExtension = photoUri.split('.').pop();
      const fileName = `photo_${Date.now()}.${fileExtension}`;

      formData.append('photo', {
        uri: photoUri,
        name: fileName,
        type: `image/${fileExtension}`,
      });

      const response = await api.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'upload de la photo' };
    }
  },

  // Supprimer une photo
  deletePhoto: async (photoId) => {
    try {
      const response = await api.delete(`/photos/${photoId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression de la photo' };
    }
  },
};

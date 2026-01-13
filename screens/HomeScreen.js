import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function HomeScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);

  // Demander les permissions et prendre une photo
  const takePhoto = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à la caméra.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPhotos([...photos, result.assets[0]]);
      }
    } catch (error) {
      console.log('Erreur lors de la prise de photo:', error);
      Alert.alert('Erreur', 'Impossible de prendre une photo.');
    }
  };

  // Importer une photo depuis la galerie
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à la galerie.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPhotos([...photos, result.assets[0]]);
      }
    } catch (error) {
      console.log('Erreur lors de l\'import de photo:', error);
      Alert.alert('Erreur', 'Impossible d\'importer une photo.');
    }
  };

  // Déconnexion
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* Éléments décoratifs en arrière-plan (identique au login) */}
      <View style={styles.decorativeBackground}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <View style={styles.lineLeft} />
        <View style={styles.lineTop} />
        <View style={styles.accentBottomRight} />
      </View>

      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.titleContainer}>
            <View style={styles.titleAccent} />
            <View>
              <Text style={styles.title}>Évaluation Formation</Text>
              <Text style={styles.subtitle}>Accueil</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Section Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Ajouter une photo</Text>

          <View style={styles.buttonsRow}>
            {/* Bouton Caméra */}
            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <View style={styles.iconContainer}>
                <View style={styles.cameraIcon}>
                  <View style={styles.cameraLens} />
                </View>
              </View>
              <Text style={styles.actionButtonText}>Prendre une photo</Text>
            </TouchableOpacity>

            {/* Bouton Galerie */}
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <View style={styles.iconContainer}>
                <View style={styles.galleryIcon}>
                  <View style={styles.galleryImage1} />
                  <View style={styles.galleryImage2} />
                </View>
              </View>
              <Text style={styles.actionButtonText}>Importer depuis galerie</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Photos */}
        <View style={styles.photosContainer}>
          <Text style={styles.sectionTitle}>
            Mes photos {photos.length > 0 && `(${photos.length})`}
          </Text>

          {photos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Aucune photo pour le moment</Text>
              <Text style={styles.emptyStateSubtext}>Ajoutez votre première photo !</Text>
            </View>
          ) : (
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoCard}>
                  <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  decorativeBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circleTopRight: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#d33434',
    opacity: 0.03,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#6B6B6B',
    opacity: 0.05,
  },
  lineLeft: {
    position: 'absolute',
    left: 40,
    top: '20%',
    width: 2,
    height: '30%',
    backgroundColor: '#d33434',
    opacity: 0.1,
  },
  lineTop: {
    position: 'absolute',
    top: 80,
    right: '15%',
    width: '25%',
    height: 2,
    backgroundColor: '#d33434',
    opacity: 0.1,
  },
  accentBottomRight: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d33434',
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  titleContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAccent: {
    position: 'absolute',
    left: -15,
    top: '50%',
    width: 3,
    height: 36,
    backgroundColor: '#d33434',
    borderRadius: 2,
    marginTop: -18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B6B6B',
    marginTop: 2,
    fontWeight: '500',
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#d33434',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 10,
  },
  logoutText: {
    color: '#d33434',
    fontSize: 18,
    fontWeight: '400',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  actionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconContainer: {
    marginBottom: 12,
  },
  cameraIcon: {
    width: 60,
    height: 50,
    backgroundColor: '#d33434',
    borderRadius: 12,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraLens: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  galleryIcon: {
    width: 60,
    height: 50,
    position: 'relative',
  },
  galleryImage1: {
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#6B6B6B',
    borderRadius: 8,
    opacity: 0.4,
    top: 5,
    left: 5,
  },
  galleryImage2: {
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#d33434',
    borderRadius: 8,
    opacity: 0.9,
    top: 0,
    left: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  photosContainer: {
    marginTop: 10,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B6B6B',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  photoCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
});

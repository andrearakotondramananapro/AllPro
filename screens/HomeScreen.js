import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Image, TextInput } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

// Données fictives
const EMPLOYEES = [
  { id: 1, name: 'Martin Dupont' },
  { id: 2, name: 'Marie Durand' },
  { id: 3, name: 'Pierre Martin' },
  { id: 4, name: 'Sophie Bernard' },
  { id: 5, name: 'Lucas Petit' },
  { id: 6, name: 'Emma Leroy' },
  { id: 7, name: 'Thomas Moreau' },
  { id: 8, name: 'Camille Simon' },
  { id: 9, name: 'Nicolas Laurent' },
  { id: 10, name: 'Julie Lefebvre' },
];

const CATEGORIES = [
  'Sécurité',
  'Technique',
  'Management',
  'Qualité',
  'Informatique',
];

const THEMES_BY_CATEGORY = {
  'Sécurité': ['Habilitation électrique', 'Travail en hauteur', 'Gestes et postures', 'Incendie'],
  'Technique': ['Soudure', 'Maintenance industrielle', 'Hydraulique', 'Pneumatique'],
  'Management': ['Leadership', 'Gestion de projet', 'Communication', 'Gestion des conflits'],
  'Qualité': ['ISO 9001', 'Lean Management', 'Six Sigma', 'Audit interne'],
  'Informatique': ['Excel avancé', 'Power BI', 'SAP', 'Cybersécurité'],
};

const TRAINERS = [
  { id: 1, name: 'Jean Formateur' },
  { id: 2, name: 'Claire Expert' },
  { id: 3, name: 'Michel Coach' },
  { id: 4, name: 'Anne Pedagogue' },
  { id: 5, name: 'François Mentor' },
];

const CENTERS = [
  { id: 1, name: 'Centre Paris Nord' },
  { id: 2, name: 'Centre Lyon Est' },
  { id: 3, name: 'Centre Marseille Sud' },
  { id: 4, name: 'Centre Bordeaux Ouest' },
  { id: 5, name: 'Centre Lille Centre' },
];

const EVALUATION_TYPES = [
  'À chaud',
  'À froid',
];

const LOCATIONS = [
  { id: 1, name: 'Atelier A' },
  { id: 2, name: 'Atelier B' },
  { id: 3, name: 'Salle de formation 1' },
  { id: 4, name: 'Salle de formation 2' },
  { id: 5, name: 'Salle de conférence' },
  { id: 6, name: 'Bureau principal' },
  { id: 7, name: 'Espace polyvalent' },
];

const RESPONSES = [
  { iquestion: 'A1', reponse: 8 },
  { iquestion: 'A2', reponse: 7 },
  { iquestion: 'A3', reponse: 8 },
  { iquestion: 'B1', reponse: 8 },
  { iquestion: 'B2', reponse: 7 },
  { iquestion: 'B3', reponse: 8 },
  { iquestion: 'B4', reponse: 8 },
  { iquestion: 'B5', reponse: 7 },
  { iquestion: 'B6', reponse: 8 },
  { iquestion: 'C1', reponse: 8 },
  { iquestion: 'C2', reponse: 7 },
  { iquestion: 'C3', reponse: 8 },
  { iquestion: 'C4', reponse: 8 },
  { iquestion: 'C5', reponse: 7 },
  { iquestion: 'C6', reponse: 8 },
  { iquestion: 'C1', reponse: 'commentaire 1' },
  { iquestion: 'C2', reponse: 'commentaire 2' },
  { iquestion: 'C3', reponse: 'commentaire 3' },
  { iquestion: 'C4', reponse: 'commentaire 4' },
];

export default function HomeScreen({ navigation }) {
  // États du formulaire
  const [photo, setPhoto] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [trainerSearch, setTrainerSearch] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [centerSearch, setCenterSearch] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // États pour afficher/cacher les suggestions
  const [showEmployeeSuggestions, setShowEmployeeSuggestions] = useState(false);
  const [showTrainerSuggestions, setShowTrainerSuggestions] = useState(false);
  const [showCenterSuggestions, setShowCenterSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showEvaluationTypePicker, setShowEvaluationTypePicker] = useState(false);

  // Filtrer les suggestions
  const filteredEmployees = EMPLOYEES.filter(emp =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );
  const filteredTrainers = TRAINERS.filter(t =>
    t.name.toLowerCase().includes(trainerSearch.toLowerCase())
  );
  const filteredCenters = CENTERS.filter(c =>
    c.name.toLowerCase().includes(centerSearch.toLowerCase())
  );
  const availableThemes = selectedCategory ? THEMES_BY_CATEGORY[selectedCategory] || [] : [];
  const filteredLocations = LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

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
        setPhoto(result.assets[0]);
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
        setPhoto(result.assets[0]);
      }
    } catch (error) {
      console.log('Erreur lors de l\'import de photo:', error);
      Alert.alert('Erreur', 'Impossible d\'importer une photo.');
    }
  };

  // Supprimer la photo
  const removePhoto = () => {
    setPhoto(null);
  };

  // Sélection d'un employé
  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeSearch(employee.name);
    setShowEmployeeSuggestions(false);
  };

  // Sélection d'une catégorie
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedTheme(''); // Reset theme when category changes
    setShowCategoryPicker(false);
  };

  // Sélection d'un thème
  const selectTheme = (theme) => {
    setSelectedTheme(theme);
    setShowThemePicker(false);
  };

  // Sélection d'un formateur
  const selectTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setTrainerSearch(trainer.name);
    setShowTrainerSuggestions(false);
  };

  // Sélection d'un centre
  const selectCenter = (center) => {
    setSelectedCenter(center);
    setCenterSearch(center.name);
    setShowCenterSuggestions(false);
  };

  // Sélection d'un type d'évaluation
  const selectEvaluationType = (type) => {
    setSelectedEvaluationType(type);
    setShowEvaluationTypePicker(false);
  };

  // Sélection d'un lieu
  const selectLocation = (location) => {
    setSelectedLocation(location);
    setLocationSearch(location.name);
    setShowLocationSuggestions(false);
  };

  // Validation du formulaire
  const handleSubmit = () => {
    if (!photo) {
      Alert.alert('Erreur', 'Veuillez ajouter une photo.');
      return;
    }
    if (!selectedEmployee) {
      Alert.alert('Erreur', 'Veuillez sélectionner un employé.');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Erreur', 'Veuillez sélectionner une catégorie.');
      return;
    }
    if (!selectedTheme) {
      Alert.alert('Erreur', 'Veuillez sélectionner un thème.');
      return;
    }
    if (!selectedTrainer) {
      Alert.alert('Erreur', 'Veuillez sélectionner un formateur.');
      return;
    }
    if (!selectedCenter) {
      Alert.alert('Erreur', 'Veuillez sélectionner un centre de formation.');
      return;
    }
    if (!selectedEvaluationType) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type d\'évaluation.');
      return;
    }
    if (!selectedLocation) {
      Alert.alert('Erreur', 'Veuillez sélectionner un lieu.');
      return;
    }

    // Formater les réponses
    const responsesText = RESPONSES.map(r => `${r.iquestion}: ${r.reponse}`).join('\n');
    
    Alert.alert(
      'Confirmation d\'enregistrement',
      `Employé: ${selectedEmployee.name}\nCatégorie: ${selectedCategory}\nThème: ${selectedTheme}\nFormateur: ${selectedTrainer.name}\nCentre: ${selectedCenter.name}\nType: ${selectedEvaluationType}\nLieu: ${selectedLocation.name}\n\nRéponses:\n${responsesText}`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Enregistrer', style: 'default', onPress: resetForm }
      ]
    );
  };

  // Reset du formulaire
  const resetForm = () => {
    setPhoto(null);
    setEmployeeSearch('');
    setSelectedEmployee(null);
    setSelectedCategory('');
    setSelectedTheme('');
    setTrainerSearch('');
    setSelectedTrainer(null);
    setCenterSearch('');
    setSelectedCenter(null);
    setSelectedEvaluationType('');
    setLocationSearch('');
    setSelectedLocation(null);
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
      {/* Éléments décoratifs en arrière-plan */}
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
              <Text style={styles.subtitle}>Formulaire</Text>
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
        keyboardShouldPersistTaps="handled"
      >
        {/* Section Photo */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Photo</Text>

          {photo ? (
            <View style={styles.photoPreviewContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
              <TouchableOpacity style={styles.removePhotoButton} onPress={removePhoto}>
                <Ionicons name="close-circle" size={28} color="#d33434" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                <Ionicons name="camera" size={32} color="#d33434" />
                <Text style={styles.actionButtonText}>Caméra</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                <Ionicons name="images" size={32} color="#d33434" />
                <Text style={styles.actionButtonText}>Galerie</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Champ Employé */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Employé</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Rechercher un employé..."
            placeholderTextColor="#999"
            value={employeeSearch}
            onChangeText={(text) => {
              setEmployeeSearch(text);
              setSelectedEmployee(null);
              setShowEmployeeSuggestions(text.length > 0);
            }}
            onFocus={() => setShowEmployeeSuggestions(employeeSearch.length > 0)}
          />
          {showEmployeeSuggestions && filteredEmployees.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredEmployees.slice(0, 5).map((employee) => (
                <TouchableOpacity
                  key={employee.id}
                  style={styles.suggestionItem}
                  onPress={() => selectEmployee(employee)}
                >
                  <Text style={styles.suggestionText}>{employee.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Champ Type d'évaluation */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Type d'évaluation</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowEvaluationTypePicker(!showEvaluationTypePicker)}
          >
            <Text style={selectedEvaluationType ? styles.pickerText : styles.pickerPlaceholder}>
              {selectedEvaluationType || 'Sélectionner un type...'}
            </Text>
            <Ionicons name={showEvaluationTypePicker ? "chevron-up" : "chevron-down"} size={20} color="#6B6B6B" />
          </TouchableOpacity>
          {showEvaluationTypePicker && (
            <View style={styles.suggestionsContainer}>
              {EVALUATION_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.suggestionItem,
                    selectedEvaluationType === type && styles.selectedSuggestion
                  ]}
                  onPress={() => selectEvaluationType(type)}
                >
                  <Text style={[
                    styles.suggestionText,
                    selectedEvaluationType === type && styles.selectedSuggestionText
                  ]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Champ Catégorie */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Catégorie</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={selectedCategory ? styles.pickerText : styles.pickerPlaceholder}>
              {selectedCategory || 'Sélectionner une catégorie...'}
            </Text>
            <Ionicons name={showCategoryPicker ? "chevron-up" : "chevron-down"} size={20} color="#6B6B6B" />
          </TouchableOpacity>
          {showCategoryPicker && (
            <View style={styles.suggestionsContainer}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.suggestionItem,
                    selectedCategory === category && styles.selectedSuggestion
                  ]}
                  onPress={() => selectCategory(category)}
                >
                  <Text style={[
                    styles.suggestionText,
                    selectedCategory === category && styles.selectedSuggestionText
                  ]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Champ Thème */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Thème</Text>
          <TouchableOpacity
            style={[styles.pickerButton, !selectedCategory && styles.pickerDisabled]}
            onPress={() => selectedCategory && setShowThemePicker(!showThemePicker)}
            disabled={!selectedCategory}
          >
            <Text style={selectedTheme ? styles.pickerText : styles.pickerPlaceholder}>
              {selectedTheme || (selectedCategory ? 'Sélectionner un thème...' : 'Sélectionnez d\'abord une catégorie')}
            </Text>
            <Ionicons name={showThemePicker ? "chevron-up" : "chevron-down"} size={20} color="#6B6B6B" />
          </TouchableOpacity>
          {showThemePicker && availableThemes.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {availableThemes.map((theme) => (
                <TouchableOpacity
                  key={theme}
                  style={[
                    styles.suggestionItem,
                    selectedTheme === theme && styles.selectedSuggestion
                  ]}
                  onPress={() => selectTheme(theme)}
                >
                  <Text style={[
                    styles.suggestionText,
                    selectedTheme === theme && styles.selectedSuggestionText
                  ]}>{theme}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Champ Formateur */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Formateur</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Rechercher un formateur..."
            placeholderTextColor="#999"
            value={trainerSearch}
            onChangeText={(text) => {
              setTrainerSearch(text);
              setSelectedTrainer(null);
              setShowTrainerSuggestions(text.length > 0);
            }}
            onFocus={() => setShowTrainerSuggestions(trainerSearch.length > 0)}
          />
          {showTrainerSuggestions && filteredTrainers.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredTrainers.slice(0, 5).map((trainer) => (
                <TouchableOpacity
                  key={trainer.id}
                  style={styles.suggestionItem}
                  onPress={() => selectTrainer(trainer)}
                >
                  <Text style={styles.suggestionText}>{trainer.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Champ Centre */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Centre de formation</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Rechercher un centre..."
            placeholderTextColor="#999"
            value={centerSearch}
            onChangeText={(text) => {
              setCenterSearch(text);
              setSelectedCenter(null);
              setShowCenterSuggestions(text.length > 0);
            }}
            onFocus={() => setShowCenterSuggestions(centerSearch.length > 0)}
          />
          {showCenterSuggestions && filteredCenters.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredCenters.slice(0, 5).map((center) => (
                <TouchableOpacity
                  key={center.id}
                  style={styles.suggestionItem}
                  onPress={() => selectCenter(center)}
                >
                  <Text style={styles.suggestionText}>{center.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Champ Lieu */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Lieu</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Rechercher un lieu..."
            placeholderTextColor="#999"
            value={locationSearch}
            onChangeText={(text) => {
              setLocationSearch(text);
              setSelectedLocation(null);
              setShowLocationSuggestions(text.length > 0);
            }}
            onFocus={() => setShowLocationSuggestions(locationSearch.length > 0)}
          />
          {showLocationSuggestions && filteredLocations.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filteredLocations.slice(0, 5).map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.suggestionItem}
                  onPress={() => selectLocation(location)}
                >
                  <Text style={styles.suggestionText}>{location.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        

        

        {/* Bouton Valider */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" style={styles.submitIcon} />
          <Text style={styles.submitButtonText}>Valider l'évaluation</Text>
        </TouchableOpacity>

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
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 15,
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
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  photoPreviewContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  inputContainer: {
    marginBottom: 16,
    zIndex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
  },
  selectedSuggestion: {
    backgroundColor: '#FFF5F5',
  },
  selectedSuggestionText: {
    color: '#d33434',
    fontWeight: '600',
  },
  pickerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerDisabled: {
    backgroundColor: '#F5F5F5',
  },
  pickerText: {
    fontSize: 15,
    color: '#333',
  },
  pickerPlaceholder: {
    fontSize: 15,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#d33434',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#d33434',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

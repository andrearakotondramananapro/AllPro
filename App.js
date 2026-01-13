import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implémenter la logique d'authentification
    console.log('Login:', email, password);
  };

  return (
    <View style={styles.wrapper}>
      {/* Éléments décoratifs en arrière-plan */}
      <View style={styles.decorativeBackground}>
        {/* Cercle rouge subtil en haut à droite */}
        <View style={styles.circleTopRight} />

        {/* Cercle gris subtil en bas à gauche */}
        <View style={styles.circleBottomLeft} />

        {/* Ligne verticale épurée à gauche */}
        <View style={styles.lineLeft} />

        {/* Ligne horizontale épurée en haut */}
        <View style={styles.lineTop} />

        {/* Petit accent rouge en bas à droite */}
        <View style={styles.accentBottomRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="dark" />

        {/* Logo Placeholder avec bordure subtile colorée */}
        <View style={styles.logoContainer}>
          <View style={styles.logoRing} />
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
        </View>

        {/* Titre avec ligne décorative */}
        <View style={styles.titleContainer}>
          <View style={styles.titleAccent} />
          <Text style={styles.title}>AllPro</Text>
        </View>
        <Text style={styles.subtitle}>Connexion</Text>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: '#DC143C',
    opacity: 0.03,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#666',
    opacity: 0.04,
  },
  lineLeft: {
    position: 'absolute',
    left: 40,
    top: '20%',
    width: 2,
    height: '30%',
    backgroundColor: '#DC143C',
    opacity: 0.1,
  },
  lineTop: {
    position: 'absolute',
    top: 80,
    right: '15%',
    width: '25%',
    height: 2,
    backgroundColor: '#DC143C',
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
    borderColor: '#DC143C',
    opacity: 0.15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#DC143C',
    opacity: 0.1,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  logoText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
  titleContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  titleAccent: {
    position: 'absolute',
    left: -15,
    top: '50%',
    width: 4,
    height: 30,
    backgroundColor: '#DC143C',
    borderRadius: 2,
    marginTop: -15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#DC143C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#DC143C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
});

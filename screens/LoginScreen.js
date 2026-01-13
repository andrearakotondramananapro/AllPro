import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // Navigation vers l'accueil après connexion réussie
      navigation.navigate('Home');
    } catch (err) {
      console.log('Erreur de connexion:', err);
      setError(err.message || 'Email ou mot de passe incorrect');
      Alert.alert('Erreur', err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
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

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar style="dark" />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoRing} />
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Titre avec ligne décorative */}
        <View style={styles.titleContainer}>
          <View style={styles.titleAccent} />
          <View style={styles.titleTextContainer}>
            <Text style={styles.title}>Évaluation</Text>
            <Text style={styles.titleSecondary}>Formation</Text>
          </View>
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

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Se connecter</Text>
            )}
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
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#d33434',
    opacity: 0.1,
  },
  logo: {
    width: 140,
    height: 140,
  },
  titleContainer: {
    position: 'relative',
    marginBottom: 12,
    alignItems: 'center',
  },
  titleAccent: {
    position: 'absolute',
    left: -20,
    top: '50%',
    width: 3,
    height: 50,
    backgroundColor: '#d33434',
    borderRadius: 2,
    marginTop: -25,
  },
  titleTextContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 0.5,
  },
  titleSecondary: {
    fontSize: 28,
    fontWeight: '300',
    color: '#d33434',
    letterSpacing: 0.5,
    marginTop: -4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 35,
    fontWeight: '500',
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
    backgroundColor: '#d33434',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#d33434',
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
    color: '#6B6B6B',
    fontSize: 14,
  },
  errorText: {
    color: '#d33434',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

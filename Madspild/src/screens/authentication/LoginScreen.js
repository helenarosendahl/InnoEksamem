// Importerer nødvendige React Native komponenter
import React, { useState } from 'react';
import { View, Alert, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// Importerer Firebase Authentication funktioner
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Importerer Firebase-konfiguration fra firebaseConfig-fil
import firebaseApp from '../../../firebaseConfig';

// Importerer brugerdefinerede komponenter og stilarter
import { CustomTextInput } from '../../components/Forms/TextInput';
import { BoldButtonDark } from '../../components/Buttons/BoldButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
import AppLogo from '../../components/Logo/AppLogo';


// Funktionen for login
const LoginScreen = ({ navigation }) => {
  // Deklarerer variablerne email og adgangskode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Henter Firebase Authentication 
  const auth = getAuth(firebaseApp);

   // Funktion til håndtering af login-processen
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Viser meddelsesen 'success' hvis login lykkedes 
        Alert.alert("Success", "Logged in successfully!");
      })
      .catch((error) => {
        // Viser fejlmeddelelsen 'error hvis login fejler
        Alert.alert("Error", error.message);
      });
  };

  // Returnerer viewet for login-skærmen
  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Tastaturet skjules lidt ved indtastning af inputfelter
    >
      <ScrollView>
        <View style={globalStyles.innerContainer}>
          <AppLogo source={require('../../assets/logos/appLogo.png')} />
          {/* Input-felter for email og adgangskode */}
          <CustomTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* Knap til at udføre login-handling */}
          <BoldButtonDark title="Log ind" onPress={handleLogin} />
          {/* Knap til at udføre signup-handling */}
          <SecondaryButton 
            title="Ikke allerede bruger? Tilmeld dig her!" 
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Eksporterer LoginScreen-komponenten som standard
export default LoginScreen;
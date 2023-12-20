// Importerer nødvendige React Native komponenter
import React, { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// Importerer Firebase Authentication funktioner
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Importerer Firebase-konfiguration fra firebaseConfig-fil
import firebaseApp from '../../../firebaseConfig';

// Importerer brugerdefinerede komponenter og styles
import { CustomTextInput } from '../../components/Forms/TextInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
import AppLogo from '../../components/Logo/AppLogo';

// Funktionen for signup
const SignUpScreen = ({ navigation }) => {
  // Deklarerer variablerne email og adgangskode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Henter Firebase Authentication 
  const auth = getAuth(firebaseApp);

   // Funktion til håndtering af signup-processen
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Viser meddelsesen 'success' hvis signup lykkedes 
        Alert.alert("Success", "User created successfully!");
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        // Viser fejlmeddelelsen 'error hvis signup fejler
        Alert.alert("Error", error.message);
      });
  };

  // Returnerer viewet for signup-skærmen
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
          {/* Knap til at udføre signup-handling */}
          <PrimaryButton title="Opret din bruger!" onPress={handleSignUp} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Eksporterer SignUpScreen-komponenten som standard
export default SignUpScreen;
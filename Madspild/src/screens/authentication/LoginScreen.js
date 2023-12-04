import React, { useState } from 'react';
import { View, Alert, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../../firebaseConfig';
import { CustomTextInput } from '../../components/Forms/TextInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
import AppLogo from '../../components/Logo/AppLogo';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(firebaseApp);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Success", "Logged in successfully!");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Tastaturet skjules lidt ved indtastning af inputfelter
    >
      <ScrollView>
        <View style={globalStyles.innerContainer}>
          <AppLogo source={require('../../assets/logos/appLogo.png')} />
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
          <PrimaryButton title="Log ind" onPress={handleLogin} />
          <SecondaryButton 
            title="Ikke allerede bruger? Tilmeld dig her!" 
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default LoginScreen;
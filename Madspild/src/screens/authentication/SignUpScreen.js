import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../../firebaseConfig'; 
import AppLogo from '../../components/Logo/AppLogo';


const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(firebaseApp);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Opretter bruger
        const user = userCredential.user;
        
        Alert.alert("Success", "User created successfully!");
        navigation.navigate('Login'); // Bruger returneres til LoginScreen.js
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Error handling
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
       <AppLogo source={require('../../assets/logos/appLogo.png')} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Opret din bruger!" onPress={handleSignUp} />
    </View>
  );
};

// Midlertidigt
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 200,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  logo: {
    width: 400, 
    height: 400, 
    marginBottom: 1, 
  },
});

export default SignUpScreen;

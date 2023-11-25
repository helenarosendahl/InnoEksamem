import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig'; // assuming firebaseConfig.js is in the same directory

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
      <Button title="Sign Up" onPress={handleSignUp} />
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
  }
});

export default SignUpScreen;

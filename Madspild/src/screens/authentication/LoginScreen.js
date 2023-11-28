import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../../firebaseConfig' 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(firebaseApp);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Logger ind her
        const user = userCredential.user;
        Alert.alert("Success", "Logged in successfully!");
        console.log(`User logged in: ${user.email}`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Returnerer errorMessage, hvis login fejler
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
         <Image 
        source={require('../../assets/appLogo.png')}
        style={styles.logo}
      />
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
      <Button title="Log ind" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.signupText}>Ikke allerede bruger? Tildmeld dig her!
      </Text>
      </TouchableOpacity>
    </View>
  );
};

// Midltertid style.sheet
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
  signupText: {
    marginTop: 20,
    color: 'blue'
  },
  logo: {
    width: 400, 
    height: 400, 
    marginBottom: 1, 
  },
});

export default LoginScreen;


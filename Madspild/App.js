// Importerer firebase konfigurations-filen
import './firebaseConfig'; 
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './src/screens/authentication/LoginScreen';
import SignUpScreen from './src/screens/authentication/SignUpScreen';
import AppNavigator from './src/navigation/AppNavigator'; // BottomTab Navigator


const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("Current user set to:", user ? user.email : 'No user');
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {currentUser ? (
        // Gengiver AppNavigator når en bruger at logget ind
        <AppNavigator />
      ) : (
        // Stack Navigator når de ikke er logget ind
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Opret bruger' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}


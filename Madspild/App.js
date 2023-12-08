// Importerer firebase konfigurations-filen
import './firebaseConfig'; 

// Importerer React og nødvendige Navigation komponenter
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

// Importerer Firebase Authentication funktioner til login
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Importerer skærme til login/signup og navigationen
import LoginScreen from './src/screens/authentication/LoginScreen';
import SignUpScreen from './src/screens/authentication/SignUpScreen';
import AppNavigator from './src/navigation/AppNavigator'; // BottomTab Navigator


// Opretter en Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  // Bruger useState til at håndtere den aktuelle bruger
  const [currentUser, setCurrentUser] = useState(null);

    // useEffect bruges til at overvåge ændringer i brugerautentifikationen
  useEffect(() => {
    // Henter Firebase Authentication 
    const auth = getAuth();
    // Lytter til ændringer i brugerautentifikationen
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Opdaterer den aktuelle bruger
      setCurrentUser(user);
      // Logger den aktuelle brugers email eller 'No user', hvis ingen bruger er logget ind
      console.log("Current user set to:", user ? user.email : 'No user');
    });
    // Stopper lytningen efter ændringer i brugerautentifikationen
    return () => unsubscribe();
  }, []);

  // Returnerer hovedkomponenten for NavigationContainer
  return (
    <NavigationContainer>
      {currentUser ? (
        // Gengiver AppNavigator når en bruger at logget ind 
        <AppNavigator />
      ) : (
        // Stack Navigator med login og signup screen når de ikke er logget ind
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Opret bruger' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}


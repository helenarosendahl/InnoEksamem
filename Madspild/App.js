// Import af diverse React-dependencies
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
// Import firebaseConfig.js first to ensure Firebase is initialized
import './firebaseConfig'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Import af mine komponenter 
import MapScreen from './components/MapScreen';
import LoginScreen from './components/LoginScreen';
import UserProfile from './components/UserProfile';
import SalesScreen from './components/SalesScreen';
import SignUpScreen from './components/SignUpScreen';
import SearchScreen from './components/SalesScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("Current user set to:", user ? user.email : 'No user');
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Conditional rendering based on the authentication state
  const renderScreens = () => {
    if (currentUser) {
      console.log("Sender bruger videre til autentiserede komponenter");

      return (
        <>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'Min profil' }} />
        <Stack.Screen name="SalesScreen" component={SalesScreen} options={{ title: 'Sælg' }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Opret bruger' }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Søg' }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'kort' }} />
        </>
      );
    } else {
      console.log("Rendering login/signup screens");

      return (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Opret bruger' }} />
        </>
      );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

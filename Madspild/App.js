//Import af diverese react-dependencies
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
// Import firebaseConfig.js first to ensure Firebase is initialized
import './firebaseConfig'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import af mine komponenter 
import MapScreen from './components/MapScreen';
import LoginScreen from './components/LoginScreen';
import UserProfile from './components/UserProfile';
import SalesScreen from './components/SalesScreen';
import SignUpScreen from './components/SignUpScreen';
import SearchScreen from './components/SalesScreen';
//Kan ikke huske hvad vi aftale ift hvad "start"-skærmen skulle være, så laver lige denne til test
import HomeScreen from './components/HomeScreen';



const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  /*
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        console.log('User is logged in:', user.email);  
        setCurrentUser(user);
      } else {
        // User is not logged in
        console.log('User is logged out');  
        setCurrentUser(null);
      }
    });

    // Cleanup listener 
    return () => unsubscribe();
  }, []);
  
  */

  // Navigation af komponenter 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currentUser ? "Home" : "Home"}> 
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hjem' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'Min profil' }} />
        <Stack.Screen name="SalesScreen" component={SalesScreen} options={{ title: 'Sælg' }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Opret bruger' }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Søg' }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'kort' }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
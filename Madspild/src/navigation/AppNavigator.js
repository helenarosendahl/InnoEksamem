import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../screens/donations/RequestScreen'; 
import SalesScreen from '../screens/donations/SalesScreen'; 
import UploadProduct from '../screens/donations/UploadProduct'; 
import UserProfile from '../screens/profile/UserProfile'; 
import SponsScreen from '../screens/sponsor/SponsScreen'; 
import { createStackNavigator } from '@react-navigation/stack';
import UpdateUserProfile from '../screens/profile/UpdateUserProfile'; 

// Tilbud fra sponsorer
import JoeOffers from '../screens/sponsor/offerings/JoeOffers'
import AldiOffers from '../screens/sponsor/offerings/AldiOffers'
import CofocoOffers from '../screens/sponsor/offerings/CofocoOffers'


const SponsStack = createStackNavigator();


// stacks til screens omhandlende sponsor
function SponsStackScreen() {
  return (
    <SponsStack.Navigator>
      <SponsStack.Screen name="SponsScreen" component={SponsScreen} options={{ headerShown: false }}/> 
      <SponsStack.Screen name="JoeOffers" component={JoeOffers} options={{ headerTitle: 'Joe & The Juice' }}  />
      <SponsStack.Screen name="AldiOffers" component={AldiOffers} options={{ headerTitle: 'Aldi Danmark' }} />
      <SponsStack.Screen name="CofocoOffers" component={CofocoOffers} options={{ headerTitle: 'Cofoco' }} />
      <SponsStack.Screen name="UpdateUserProfile" component={UpdateUserProfile}/>
    </SponsStack.Navigator>
  );
}

// Stack til screens omhandlende profil
function ProfileStackScreen() {
  return (
    <SponsStack.Navigator>
        <SponsStack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
       <SponsStack.Screen name="UpdateUserProfile" component={UpdateUserProfile} options={{ headerShown: false }}/>
    </SponsStack.Navigator>
  );
}

// tabs til screens i bunden - initialroute er salesscreen
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator initialRouteName='Donationer'> 
        <Tab.Screen name="Anmodninger" component={RequestScreen} />
        <Tab.Screen name="Doner mad" component={UploadProduct} />
        <Tab.Screen name="Donationer" component={SalesScreen} />
        <Tab.Screen name="Profil" component={ProfileStackScreen}/>
        <Tab.Screen name="Sponsorer" component={SponsStackScreen}/>
      </Tab.Navigator>
  );
};

export default AppNavigator;

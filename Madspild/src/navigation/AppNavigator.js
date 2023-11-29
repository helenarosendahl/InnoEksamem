import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../screens/donations/RequestScreen'; 
import SalesScreen from '../screens/donations/SalesScreen'; 
import UploadProduct from '../screens/donations/UploadProduct'; 
import UserProfile from '../screens/profile/UserProfile'; 
import SponsScreen from '../screens/sponsor/SponsScreen'; 
import { createStackNavigator } from '@react-navigation/stack';
// Tilbud fra sponsorer
import JoeOffers from '../screens/sponsor/offerings/JoeOffers'
import AldiOffers from '../screens/sponsor/offerings/AldiOffers'
import CofocoOffers from '../screens/sponsor/offerings/CofocoOffers'
import UpdateUserProfile from '../screens/profile/UpdateUserProfile'


const SponsStack = createStackNavigator();

function SponsStackScreen() {
  return (
    <SponsStack.Navigator>
      <SponsStack.Screen name="SponsScreen" component={SponsScreen} options={{ headerShown: false }}/> 
      <SponsStack.Screen name="JoeOffers" component={JoeOffers} options={{ headerTitle: 'Joe & The Juice' }}  />
      <SponsStack.Screen name="AldiOffers" component={AldiOffers} options={{ headerTitle: 'Aldi Danmark' }} />
      <SponsStack.Screen name="CofocoOffers" component={CofocoOffers} options={{ headerTitle: 'Cofoco' }} />
      <SponsStack.Screen name="UpdateUserProfile" component={UpdateUserProfile} options={{ headerTitle: 'Cofoco' }} />
  
    </SponsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Donationer" component={SalesScreen} />
        <Tab.Screen name="Anmodninger" component={RequestScreen} />
        <Tab.Screen name="Doner mad" component={UploadProduct} />
        <Tab.Screen name="Bio" component={UpdateUserProfile} />
        <Tab.Screen name="Sponsorer" component={SponsStackScreen}/>
        <Tab.Screen name="bruger" component={UserProfile}/>

      </Tab.Navigator>
  );
};

export default AppNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../donations/RequestScreen'; 
import SalesScreen from '../donations/SalesScreen'; 
import UploadProduct from '../donations/UploadProduct'; 
import UserProfile from '../profile/UserProfile'; 
import SponsScreen from '../sponsor/SponsScreen'; 
import { createStackNavigator } from '@react-navigation/stack';
// Tilbud fra sponsorer
import JoeOffers from '../sponsor/offerings/JoeOffers'
import AldiOffers from '../sponsor/offerings/AldiOffers'
import CofocoOffers from '../sponsor/offerings/CofocoOffers'
import UpdateUserProfile from '../profile/UpdateUserProfile'

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
      </Tab.Navigator>
  );
};

export default AppNavigator;

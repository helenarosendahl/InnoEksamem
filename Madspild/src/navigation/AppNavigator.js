import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../screens/donations/RequestScreen'; 
import SalesScreen from '../screens/donations/SalesScreen'; 
import UploadProduct from '../screens/donations/UploadProduct'; 
import UserProfile from '../screens/profile/UserProfile'; 
import SponsScreen from '../screens/sponsor/SponsScreen'; 
import { createStackNavigator } from '@react-navigation/stack';
import UpdateUserProfile from '../screens/profile/UpdateUserProfile';
import UserMainProfile from '../screens/profile/UserMainProfile'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import PickUpDate from '../screens/donations/PickUpDate'

// Tilbud fra sponsorer
import JoeOffers from '../screens/sponsor/offerings/JoeOffers'
import ZokuOffers from '../screens/sponsor/offerings/ZokuOffers'


const SponsStack = createStackNavigator();


// stacks til screens omhandlende sponsor
function SponsStackScreen() {
  return (
    <SponsStack.Navigator>
      <SponsStack.Screen name="SponsScreen" component={SponsScreen} options={{ headerShown: false }}/> 
      <SponsStack.Screen name="JoeOffers" component={JoeOffers} options={{ headerTitle: 'Joe & The Juice' }}  />
      <SponsStack.Screen name="ZokuOffers" component={ZokuOffers} options={{ headerTitle: 'ZOKU' }}  />
      <SponsStack.Screen name="UpdateUserProfile" component={UpdateUserProfile}/>

    </SponsStack.Navigator>
  );
}

// Stack til screens omhandlende profil
function ProfileStackScreen() {
  return (
    <SponsStack.Navigator>
      <SponsStack.Screen name="UserMainProfile" component={UserMainProfile} options={{ headerShown: false }}/>
        <SponsStack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
       <SponsStack.Screen name="UpdateUserProfile" component={UpdateUserProfile} options={{ headerTitle: 'Rediger din profil'  }}/>
    </SponsStack.Navigator>
  );
}

// Stack til screens omhandlende profil
function DonationStackScreen() {
  return (
    <SponsStack.Navigator>
      <SponsStack.Screen name="RequestScreen" component={RequestScreen} options={{ headerShown: false }}/>
       <SponsStack.Screen name="PickUpDate" component={PickUpDate} options={{ headerTitle: 'Afhentningstidspunkter'  }} />
    </SponsStack.Navigator>
  );
}

// tabs til screens i bunden - initialroute er salesscreen
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator initialRouteName='Donationer' screenOptions={({ route }) => ({
       
       //Dette er bare til design af ikonerne i bunden
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Definer ikoner baseret på rutenavne
          switch (route.name) {
            case 'Anmodninger':
              iconName = 'mail-unread-outline';
              break;
            case 'Doner mad':
              iconName = 'ios-add-circle-outline';
              break;
            case 'Donationer':
              iconName = 'ios-basket-outline';
              break;
            case 'Mig':
              iconName = 'ios-person-outline';
              break;
            case 'Sponsorer':
              iconName = 'gift-outline';
              break;
            default:
              iconName = 'ios-alert-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00563B', // Farvet ikon når man trykker på det
        tabBarInactiveTintColor: 'gray', // Default grå når der ikke er trykket på ikon
      })}> 
        <Tab.Screen name="Anmodninger" component={DonationStackScreen} />
        <Tab.Screen name="Doner mad" component={UploadProduct} />
        <Tab.Screen name="Donationer" component={SalesScreen} />
        <Tab.Screen name="Mig" component={ProfileStackScreen} />
        <Tab.Screen name="Sponsorer" component={SponsStackScreen}/>
      </Tab.Navigator>
  );
};

export default AppNavigator;

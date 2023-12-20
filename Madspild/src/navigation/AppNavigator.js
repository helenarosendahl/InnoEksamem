import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../screens/donations/RequestScreen'; 
import DonationsScreen from '../screens/donations/DonationsScreen'; 
import UploadDonationScreen from '../screens/donations/UploadDonationScreen'; 
import UserSettings from '../screens/profile/UserSettings'; 
import SponsScreen from '../screens/sponsor/SponsScreen'; 
import { createStackNavigator } from '@react-navigation/stack';
import UpdateProfile from '../screens/profile/UpdateProfile';
import UserProfile from '../screens/profile/UserProfile'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import PickUpDate from '../screens/donations/PickUpDate'

// Tilbud fra sponsorer
import JoeOffers from '../screens/sponsor/offerings/JoeOffers'
import ZokuOffers from '../screens/sponsor/offerings/ZokuOffers'
import NordicOffers from '../screens/sponsor/offerings/NordicOffers'



const SponsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DonationStack = createStackNavigator();


// stacks til screens omhandlende sponsor
function SponsStackScreen() {
  return (
    <SponsStack.Navigator>
      <SponsStack.Screen name="SponsScreen" component={SponsScreen} options={{ headerShown: false }}/> 
      <SponsStack.Screen name="JoeOffers" component={JoeOffers} options={{ headerTitle: 'Joe & The Juice' }}  />
      <SponsStack.Screen name="ZokuOffers" component={ZokuOffers} options={{ headerTitle: 'ZOKU' }}  />
      <SponsStack.Screen name="NordicOffers" component={NordicOffers} options={{ headerTitle: 'Nordic Green' }}  />
      <SponsStack.Screen name="UpdateProfile" component={UpdateProfile}/>

    </SponsStack.Navigator>
  );
}

// Stack til screens omhandlende profil
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
        <ProfileStack.Screen name="UserSettings" component={UserSettings} options={{ headerShown: false }}/>
       <ProfileStack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerTitle: 'Rediger din profil'  }}/>
    </ProfileStack.Navigator>
  );
}

// Stack til screens omhandlende profil
function DonationStackScreen() {
  return (
    <DonationStack.Navigator>
      <DonationStack.Screen name="RequestScreen" component={RequestScreen} options={{ headerShown: false }}/>
       <DonationStack.Screen name="PickUpDate" component={PickUpDate} options={{ headerTitle: 'Afhentningstidspunkter'  }} />
    </DonationStack.Navigator>
  );
}

// tabs til screens i bunden - initialroute er DonationsScreen
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
        <Tab.Screen name="Doner mad" component={UploadDonationScreen} />
        <Tab.Screen name="Donationer" component={DonationsScreen} />
        <Tab.Screen name="Mig" component={ProfileStackScreen} />
        <Tab.Screen name="Sponsorer" component={SponsStackScreen}/>
      </Tab.Navigator>
  );
};

export default AppNavigator;

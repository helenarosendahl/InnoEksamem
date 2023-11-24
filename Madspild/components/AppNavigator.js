import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RequestScreen from './RequestScreen'; 
import SalesScreen from './SalesScreen'; 
import UploadProduct from './UploadProduct'; 
import UserProfile from './UserProfile'; 



const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Donationer" component={SalesScreen} />
        <Tab.Screen name="Anmodninger" component={RequestScreen} />
        <Tab.Screen name="Doner mad" component={UploadProduct} />
        <Tab.Screen name="Bio" component={UserProfile} />
      </Tab.Navigator>
    
  );
};

export default AppNavigator;

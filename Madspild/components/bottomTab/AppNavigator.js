import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from '../donations/RequestScreen'; 
import SalesScreen from '../donations/SalesScreen'; 
import UploadProduct from '../donations/UploadProduct'; 
import UserProfile from '../UserProfile'; 



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

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importer Ionicons


const UserProfile = ({ navigation }) => {

  
    const handleMyOrders = () => {
        navigation.navigate('SupportScreen')
      };
    
    const handleBlog = () => {
        navigation.navigate('SupportScreen')
      };


    const handleSupportCenter = () => {
        navigation.navigate('SupportScreen')
      };
    

  const navigateToUserSettings = () => {
    navigation.navigate('UserSettings'); // Bruger route name som string
  };



  return (
    <View style={[globalStyles.container, globalStyles.settingscontainer]}>
  
      <Text style={globalStyles.title}>SE, HVOR STOR EN FORSKEL DU GØR</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.orderCount}>3</Text>
          <Ionicons name="cart-outline" size={24} color="#00563B" />
        </View>
        <View style={styles.statBox}>
          <Text style={styles.kgSaved}>8 kg</Text>
          <Ionicons name="leaf-outline" size={24} color="#00563B" />
        </View>
      </View>
    
  
      <View style={[globalStyles.buttonContainer, styles.buttonContainer]}>
        <TouchableOpacity onPress={handleMyOrders} style={[globalStyles.set_button, styles.button]}>
          <View style={globalStyles.buttonContent}>
            <Ionicons name="receipt-outline" size={24} color="#00563B" />
            <Text style={globalStyles.set_buttonText}>Mine afhentninger</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMyOrders} style={[globalStyles.set_button, styles.button]}>
          <View style={globalStyles.buttonContent}>
            <Ionicons name="heart-outline" size={24} color="#00563B" />
            <Text style={globalStyles.set_buttonText}>Mine donationer</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleSupportCenter} style={[globalStyles.set_button, styles.button]}>
          <View style={globalStyles.buttonContent}>
            <Ionicons name="help-circle-outline" size={24} color="#00563B" />
            <Text style={globalStyles.set_buttonText}>Support center</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleBlog} style={[globalStyles.set_button, styles.button]}>
          <View style={globalStyles.buttonContent}>
            <Ionicons name="newspaper-outline" size={24} color="#00563B" />
            <Text style={globalStyles.set_buttonText}>Blog</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={navigateToUserSettings} style={[globalStyles.set_button, styles.button]}>
          <View style={globalStyles.buttonContent}>
            <Ionicons name="settings-outline" size={24} color="#00563B" />
            <Text style={globalStyles.set_buttonText}>Indstillinger</Text>
          </View>
        </TouchableOpacity>
      </View>
  
    </View>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    marginLeft: 0, 
  },

  button: {
    marginBottom: 30,
  },
 
 
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f4ea', 
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20, 
    width: 150,
    // Tilføjelse af skygge
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // For at skyggen vises på Android:
    elevation: 5,
  },
  orderCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  kgSaved: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
   container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4d814a'
  },
});


export default UserProfile;

// Importerer nødvendige React Native komponenter
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

// Importerer Ionicons for at anvende deres ikoner 
import Ionicons from 'react-native-vector-icons/Ionicons';

// Knap som anvendes flere steder og derfor er oprettet som komponent 
const UpdateButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="refresh-outline" size={30} color="gray" /> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: -17,
    marginLeft: -10,
  }
});

export default UpdateButton;
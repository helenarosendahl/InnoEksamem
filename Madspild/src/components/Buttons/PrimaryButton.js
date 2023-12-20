// Importerer nødvendige React Native komponenter
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Importerer globalStyles
import { globalStyles, colors } from '../../styles/GlobalStyles';

// Knap som anvendes flere steder og derfor er oprettet som komponent 
export const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[globalStyles.button, { backgroundColor: colors.darkGreen }]}
  >
    <Text style={{ textAlign: 'center',  color: colors.white }}>{title} </Text>
  </TouchableOpacity>
);
// Importerer nødvendige React Native komponenter
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Importerer globalStyles
import { globalStyles, colors } from '../../styles/GlobalStyles';

// Knap som anvendes flere steder og derfor er oprettet som komponent 
export const SecondaryButton = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[globalStyles.button, { backgroundColor: colors.mintGreen }]}
  >
    <Text style={{ color: colors.black }}>{title}</Text>
  </TouchableOpacity>
);
// Components/Buttons/PrimaryButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles, colors } from '../../styles/GlobalStyles';



export const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[globalStyles.button, { backgroundColor: colors.darkGreen }]}
  >
    <Text style={{ color: colors.white }}>{title}</Text>
  </TouchableOpacity>
);
// Components/Buttons/SecondaryButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles, colors } from '../../styles/GlobalStyles';

export const SecondaryButton = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[globalStyles.button, { backgroundColor: colors.mintGreen }]}
  >
    <Text style={{ color: colors.black }}>{title}</Text>
  </TouchableOpacity>
);
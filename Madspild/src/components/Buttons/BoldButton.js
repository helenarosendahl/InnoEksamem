import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles, colors } from '../../styles/GlobalStyles';



export const BoldButtonDark = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[globalStyles.button, { backgroundColor: colors.darkGreen }]}
  >
    <Text style={{ textAlign: 'center',  color: colors.white, fontWeight: 'bold' }}>{title} </Text>
  </TouchableOpacity>
);
// Importerer nødvendige React Native komponenter
import React from 'react';
import { TextInput } from 'react-native';

// Importerer globalStyles
import { globalStyles } from '../../styles/GlobalStyles';

// Definerer en genbrugelig komponent kaldet CustomTextInput.
// Denne komponent tager imod props (tekst)
export const CustomTextInput = (props) => (
  <TextInput style={globalStyles.input} {...props} />
);

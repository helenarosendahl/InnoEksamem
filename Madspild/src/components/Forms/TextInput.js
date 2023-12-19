// Components/Forms/TextInput.js
import React from 'react';
import { TextInput } from 'react-native';
import { globalStyles } from '../../styles/GlobalStyles';

export const CustomTextInput = (props) => (
  <TextInput style={globalStyles.input} {...props} />
);

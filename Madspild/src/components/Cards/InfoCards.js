// Components/Cards/InfoCard.js
import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/GlobalStyles';

export const InfoCard = ({ title, description }) => (
  <View style={globalStyles.card}>
    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>
    <Text>{description}</Text>
  </View>
);
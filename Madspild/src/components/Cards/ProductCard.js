// Components/Cards/ProductCard.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../../styles/GlobalStyles';

export const ProductCard = ({ title, image }) => (
  <View style={globalStyles.card}>
    <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
    <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>{title}</Text>
  </View>
);
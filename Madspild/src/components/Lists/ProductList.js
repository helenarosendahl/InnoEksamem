// src/components/ProductListItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';

const ProductListItem = ({ item, onPress }) => (
  <View style={styles.item}>
    <Text>{item.name}</Text>
    <Text>Price: {item.price}</Text>
    <Text>Udløbsdato: {item.expirationDate}</Text>
    <Text>Kan hentes på adressen:                     {item.address}</Text>
    <PrimaryButton title="Anmod om produkt" onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightgreen',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

});

export default ProductListItem;
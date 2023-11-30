import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
 
const ProductListItem = ({ item, onPress }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.name}</Text>
    {item.imageUrl && (
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    )}
    <Text>Udløbsdato: {item.expirationDate}</Text>
    <Text>Kan hentes på adressen: {item.address}</Text>
    {item.note && <Text>Note: {item.note}</Text>}
    <PrimaryButton title="Anmod om produkt" onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightgreen',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '80%',
    height: 150,
    borderRadius: 5,
    marginVertical: 8,
  },
});

export default ProductListItem;

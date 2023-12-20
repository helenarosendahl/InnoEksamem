import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
 
const ProductListItem = ({ item, onPress }) => (
  <View style={globalStyles.ContentBox}>
    <Text style={styles.title}>{item.name}</Text>
    {item.imageUrl && (
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    )}
    <Text>Udløbsdato: {item.expirationDate}</Text>
    {item.pickupDate && <Text>Afhentningsdato: {item.pickupDate}</Text>}  
    <Text>Kan hentes på adressen: {item.address}</Text>
    <PrimaryButton title="Anmod om donation" onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e8f4ea',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#006400",
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

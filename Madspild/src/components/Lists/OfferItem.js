// src/components/OfferItem.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';

const OfferItem = ({ offer, onRedeem }) => (
    <View style={[globalStyles.offerBox]}>
      <Image source={offer.image} style={globalStyles.offerImage} />
      <Text style={[globalStyles.text, globalStyles.offerName]}>{offer.name}</Text>
      <Text style={globalStyles.text}>{offer.description}</Text>
      <Text style={globalStyles.text}>Points: {offer.points}</Text>
      <PrimaryButton title="Brug dine point" onPress={() => onRedeem(offer)} />
    </View>
  );

export default OfferItem;

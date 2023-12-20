// Importerer nødvendige React Native komponenter
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';

// Definerer en komponent kaldet OfferItem, som viser info omkring sponsorernes produkter
const OfferItem = ({ offer, onRedeem }) => (
    <View style={[globalStyles.offerBox]}>
      <Image source={offer.image} style={globalStyles.offerImage} />
      <Text style={[globalStyles.text, globalStyles.offerName]}>{offer.name}</Text>
      <Text style={globalStyles.text}>{offer.description}</Text>
      <Text style={globalStyles.text}>Points: {offer.points}</Text>
      <PrimaryButton title="Brug dine point" onPress={() => onRedeem(offer)} />
    </View>
  );

// Eksporterer OfferItem som standard for at gøre den tilgængelig i andre dele af koden.
export default OfferItem;
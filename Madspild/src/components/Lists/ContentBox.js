// Importerer nødvendige React Native komponenter
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';

// Definerer en komponent kaldet ContentBox, som viser info omkring sponsorer 
const ContentBox = ({ sponsor, onPress }) => (
    <View style={globalStyles.ContentBox}>
      <Image source={sponsor.logoUrl} style={globalStyles.sponsorLogo} />
      <Text style={globalStyles.sponsorHeadText}>{sponsor.name}</Text>
      <Text style={globalStyles.sponsorText}>{sponsor.description}</Text>
      <PrimaryButton title={`Se kuponer fra ${sponsor.name}`} onPress={onPress} />
    </View>
  );

// Eksporterer ContentBox som standard for at gøre den tilgængelig i andre dele af koden
export default ContentBox;
// src/components/SponsorItem.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';

const SponsorItem = ({ sponsor, onPress }) => (
    <View style={globalStyles.sponsorItem}>
      <Image source={sponsor.logoUrl} style={globalStyles.sponsorLogo} />
      <Text style={globalStyles.sponsorHeadText}>{sponsor.name}</Text>
      <Text style={globalStyles.sponsorText}>{sponsor.description}</Text>
      <PrimaryButton title={`Se tilbuddene fra ${sponsor.name}`} onPress={onPress} />
    </View>
  );

export default SponsorItem;

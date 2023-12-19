// src/components/ContentBox.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';

const ContentBox = ({ sponsor, onPress }) => (
    <View style={globalStyles.ContentBox}>
      <Image source={sponsor.logoUrl} style={globalStyles.sponsorLogo} />
      <Text style={globalStyles.sponsorHeadText}>{sponsor.name}</Text>
      <Text style={globalStyles.sponsorText}>{sponsor.description}</Text>
      <PrimaryButton title={`Se kuponer fra ${sponsor.name}`} onPress={onPress} />
    </View>
  );

export default ContentBox;

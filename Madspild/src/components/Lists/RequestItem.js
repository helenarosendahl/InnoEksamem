// Importerer nødvendige React Native komponenter
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { globalStyles, colors } from '../../styles/GlobalStyles';

// Definerer en komponent kaldet RequestItem, som viser info omkring anmodning af donationer 
const RequestItem = ({ item, onAccept, onDecline }) => (
    <View style={[globalStyles.card, globalStyles.ContentBox]}>
      <Text style={[globalStyles.text, styles.textWithMargin]}>Anmodning om din donation: {item.productName}</Text>
      <Text style={[globalStyles.text, styles.textWithMargin]}>Navn på afhenter: {item.buyerName}</Text>
      <PrimaryButton title="Accepter" onPress={() => onAccept(item.id)} />
      <PrimaryButton title="Afvis" onPress={() => onDecline(item.id)} />
    </View>
  );
  
  // Definerer styles
  const styles = StyleSheet.create({
    
    textWithMargin: {
      marginBottom: 10, 
    },
  });

// Eksporterer RequestItem som standard for at gøre den tilgængelig i andre dele af koden.
export default RequestItem;
// Importerer nødvendige React Native komponenter
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

// Importerer globalStyles
import { globalStyles } from '../../styles/GlobalStyles';

// Definerer en TextBox-komponent, der viser tekst
const TextBox = ({ text, linkText, linkUrl }) => {
  const handleLinkPress = () => {
    Linking.openURL(linkUrl);
  };

// Det brugeren ser der indeholder tekst
  return (
    <View style={globalStyles.textBox}>
      <Text style={globalStyles.text}>
        {text}
        {linkText && (
          <Text
            style={[globalStyles.linkText, globalStyles.text]}
            onPress={handleLinkPress}
          >
            {linkText}
          </Text>
        )}
      </Text>
    </View>
  );
};

// Gør TextBox tilgængelig for andre dele af koden
export default TextBox;
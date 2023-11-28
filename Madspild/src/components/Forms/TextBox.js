import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { globalStyles } from '../../styles/GlobalStyles';

const TextBox = ({ text, linkText, linkUrl }) => {
  const handleLinkPress = () => {
    Linking.openURL(linkUrl);
  };

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

export default TextBox;
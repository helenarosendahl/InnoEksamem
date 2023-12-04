// src/components/Logo/Image/AppLogo.js
import React from 'react';
import { Image, View } from 'react-native';

const AppLogo = ({ source, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

// Styles for the logo
const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 350, 
    height: 350,
  },
};

export default AppLogo;
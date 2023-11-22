import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Denne komponent kan slettes senere, bruger den lige til navigering

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Sælg et produkt"
        onPress={() => navigation.navigate('UploadProduct')}
      />

<Button
        title="Go to SalesScreen"
        onPress={() => navigation.navigate('SalesScreen')}
      />
   
   
      <Button
        title="Go to SearchScreen"
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <Button
        title="Go to MapScreen"
        onPress={() => navigation.navigate('MapScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default HomeScreen;

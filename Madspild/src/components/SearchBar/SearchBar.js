// Importerer nødvendige React Native komponenter
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// Importerer Ionicons for at anvende deres ikoner
import Ionicons from 'react-native-vector-icons/Ionicons';

// Definerer en funktionel komponent kaldet SearchBar, der modtager searchQuery og setSearchQuery som props
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    // Et view der viser brugerne TextInput og Ionicons (ikon)
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Søg"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Ionicons
        name="search-outline"
        size={20}
        color="gray"
        style={styles.icon}
      />
    </View>
  );
};

// Styles for the search bar
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  searchBar: {
    flex: 1,
    padding: 10,
   paddingRight: -10,
    paddingLeft: 35, 
    fontSize: 17,
    
  },
  icon: {
    position: 'absolute', 
    left: 10, 
    zIndex: 1, 
  },
});

// Eksporterer SearchBar som standard eksport for at gøre den tilgængelig i andre dele af koden
export default SearchBar;
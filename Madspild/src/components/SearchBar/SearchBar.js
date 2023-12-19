import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
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
    paddingLeft: 35, // Make room for the icon inside the search bar
    fontSize: 17,
    
  },
  icon: {
    position: 'absolute', // Position the icon over the text input field
    left: 10, // Distance from the left edge of the search bar
    zIndex: 1, // Ensures the icon is above the text input (if needed)
  },
});

export default SearchBar;
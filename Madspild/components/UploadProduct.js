import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importere FirebaseAuth, så userUID kan knyttes til produktet


const UploadProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [address, setAddress] = useState('');

  // Firestore reference
  const db = getFirestore();
  const productsRef = collection(db, "products");

   // Firebase Auth for at hente userUID
   const auth = getAuth();
   const userUID = auth.currentUser ? auth.currentUser.uid : null;

   // API key - virkelig dårlig sikkerhedsmæssigt at have den liggende her, så vi skal måske lige undersøge om der er smartere mådere at gemme den på
const GEOCODING_API_KEY = 'AIzaSyCfV3r616nHsjc68xFRkAlNCQlz8XZDKRw';

   // geocoding funktion
  const fetchCoordinates = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Geocoding API returned status: ${data.status}`);
    }

    // forklar dette for-loop
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      throw new Error('Failed to fetch coordinates');
    }
  };

  const handleProductUpload = async () => {

    // sikre at man skal være logget (bør ikke kune ske at man ikke er)
    if (!userUID) {
      Alert.alert("Error", "You must be logged in to upload a product.");
      return;
    }

    try {
      const location = await fetchCoordinates(address);
      if (location) {
        await addDoc(productsRef, {
          name: productName,
          price: Number(price),
          expirationDate,
          address,
          location,
          userUID //tilknytter bruger id
        });
        Alert.alert("Product uploaded successfully!");
        // Reset fields or navigate to another screen
      } else {
        Alert.alert("Invalid address. Unable to geocode.");
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expiration Date"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Upload Product" onPress={handleProductUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UploadProduct;

import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';


const SalesScreen = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const db = getFirestore();
  const productsRef = collection(db, "products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsRef);
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        console.log("Fetched products:", productList);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle the error appropriately, maybe set an error state and show it in the UI
      }
    };
  
    fetchProducts();
  }, []);


  // Funktion til at håndtere en bruger "køber" et produkt, og at uploaderen af produktet får 50 point for at "sælge" det
  const handleProductPurchase = async (product) => {
    try {
      // Delete the product from Firestore
      await deleteDoc(doc(db, "products", product.id));

      // Update user points
      const userDocRef = doc(db, "users", product.userUID);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentPoints = userData.points || 0;
        await updateDoc(userDocRef, { points: currentPoints + 50 });
      } else {
        console.error("User document not found for UID:", product.userUID);
      }

      Alert.alert("Product purchased successfully, 50 points awarded to the seller!");

      // Optionally refresh the products list
      // fetchProducts();
    } catch (error) {
      console.error("Error processing purchase:", error);
      Alert.alert("Error:", error.message);
    }
  };


  const renderProduct = ({ item }) => (
    <View style={styles.item}>
      <Text>Name: {item.name}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Expiration Date: {item.expirationDate}</Text>
      <Text>Address: {item.address}</Text>
      <Button title="Hent produkt" onPress={() => handleProductPurchase(item)} /> {/* Knap til at "købe" produkt - når trykkes, slettes produktet fra database*/}
    </View>
  );

  // Definerer hvor brugeren "starter" på mappen, da den som udgangspunkt er helt zoomet ud.
  const zoomIndPaaDk = {
    latitude: 55.6761, // start koordinater
    longitude: 11.0683, // start koordinater
    latitudeDelta: 5.52, //zoom level
    longitudeDelta: 5.50, //zoom level
  };
  const renderMap = () => (
    <MapView 
    style={styles.map}
    initialRegion={zoomIndPaaDk}
    >
      {products.map((product, index) => {
        // Detaljeret log
        console.log("Rendering product:", product.name, "at", product.location);
  
        // Updated check for valid location data
        if (!product.location || !isFinite(product.location.lat) || !isFinite(product.location.lng)) {
          console.error("Invalid location for product:", product.name);
          return null; // Skip rendering this marker
        }
  
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: product.location.lat,
              longitude: product.location.lng
            }}
            title={product.name}
          />
        );
      })}
    </MapView>
  );
  


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="List" onPress={() => setViewMode('list')} />
        <Button title="Map" onPress={() => setViewMode('map')} />
      </View>
      {viewMode === 'list' ? (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
        />
      ) : (
        renderMap()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default SalesScreen;

import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const SalesScreen = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const db = getFirestore();
  const productsRef = collection(db, "products");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(productsRef);
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.item}>
      <Text>Name: {item.name}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Expiration Date: {item.expirationDate}</Text>
      <Text>Address: {item.address}</Text>
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
        // Detailed logging
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

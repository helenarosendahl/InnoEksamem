import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Image, TouchableOpacity, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { globalStyles } from '../../styles/GlobalStyles';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import ProductListItem from '../../components/Lists/ProductList'; 
import TextBox from '../../components/Forms/TextBox';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importer Ionicons


const SalesScreen = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('list'); 

  const db = getFirestore();
  const auth = getAuth(); // Initialiserer Firebase Auth
  const productsRef = collection(db, "products"); // henter
  const buyRequestsRef = collection(db, "buyRequests"); // Når man trykker "anmod om produkt", skabes der en anmodning i firebase

   // Funktion til at indlæse produkter fra databasen
   const fetchProducts = async () => {
    const querySnapshot = await getDocs(productsRef);
    const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyRequest = async (productId, sellerUID) => {
    if (auth.currentUser) {
      const buyerUID = auth.currentUser.uid;
      if (buyerUID === sellerUID) {
        Alert.alert("Error", "You cannot buy your own product.");
        return;
      }

      await addDoc(buyRequestsRef, {
        productId: productId,
        buyerUID: buyerUID,
        sellerUID: sellerUID,
        status: 'pending'
      });

      Alert.alert("Request Sent", "Your request to buy this product has been sent.");
    } else {
      Alert.alert("Error", "You must be logged in to send a buy request.");
    }
  };

  const renderProduct = ({ item }) => (
    <View>
      <ProductListItem 
        item={item}
        onPress={() => handleBuyRequest(item.id, item.userUID)}
        // Tilføj til produktlisten
        name={item.name}
        expirationDate={item.expirationDate}
        address={item.address}
        note={item.note}
        imageUrl={item.imageUrl}
      />
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

        // Opdater rigtig lokation
        if (!product.location || !isFinite(product.location.lat) || !isFinite(product.location.lng)) {
          console.error("Invalid location for product:", product.name);
          return null; // Skip rendering af denne marker
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
    <View style={globalStyles.container}>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Alle donationer" onPress={() => setViewMode('list')} />
        <PrimaryButton title="Google Maps" onPress={() => setViewMode('map')} />
         {/* Opdateringsknap */}
         <TouchableOpacity 
          style={globalStyles.primaryButton} 
          onPress={fetchProducts}>
          <Ionicons name="refresh-outline" size={30} color="#333" style={globalStyles.reloadIcon} />
        </TouchableOpacity>
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


const styles = {
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
};

export default SalesScreen;
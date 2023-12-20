// Importerer nødvendige React Native komponenter
import React, { useState, useEffect, } from 'react';
import { View, FlatList, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


// Importerer funktioner og auth fra Firebase
import { getFirestore, collection, getDocs, addDoc, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

// Importerer komponenter og stilarter
import { globalStyles } from '../../styles/GlobalStyles';
import { BoldButtonDark } from '../../components/Buttons/BoldButton';
import ProductListItem from '../../components/Lists/ProductList'; 
import SearchBar from '../../components/SearchBar/SearchBar';
import UpdateButton from '../../components/Buttons/UpdateButton';


// Funktionen for DonationsScreen
const DonationsScreen = () => {
  // Deklarerer variabler for produkter og visningstilstand (list eller map)
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('list'); 
  const [searchQuery, setSearchQuery] = useState('');

  // Henter Firestore og Authentication instanser fra Firebase
  const db = getFirestore();
  const auth = getAuth(); // Initialiserer Firebase Auth
  const productsRef = collection(db, "products"); // Henter reference til products i Firestore
  const buyRequestsRef = collection(db, "buyRequests"); // Henter reference til buyRequests i Firestore

   // Funktion til at indlæse produkter fra databasen
   const fetchProducts = async () => {
    const querySnapshot = await getDocs(productsRef);
    const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };


  useEffect(() => {
    fetchProducts();
  }, []);

   // Filtrer produkter baseret på søgestrengen
   const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



   // Funktion til håndtering af købsanmodning
const handleBuyRequest = async (productId, sellerUID) => {
  if (auth.currentUser) {
    const buyerUID = auth.currentUser.uid;
    if (buyerUID === sellerUID) {
      Alert.alert("Fejl", "Du kan ikke hente dine egne produkter.");
      return;
    }

    try {
      // Fetch the product details
      const productDocRef = doc(db, "products", productId);
      const productSnap = await getDoc(productDocRef);

      if (!productSnap.exists()) {
        Alert.alert("Fejl", "Produktet findes ikke.");
        return;
      }

      const productData = productSnap.data();

      // Opretter en købsanmodning i Firestore
      await addDoc(buyRequestsRef, {
        productId: productId,
        buyerUID: buyerUID,
        sellerUID: sellerUID,
        status: 'pending',
        address: productData.address,
        pickupDate: productData.pickupDate,
        productName: productData.name 
      });
      Alert.alert("Anmodning sendt", "Du anmoder om at afhente denne donation.");
    } catch (error) {
      Alert.alert("Fejl", "Noget gik galt: " + error.message);
    }
  } else {
    Alert.alert("Fejl", "Du skal være logget ind."); // Error handling
  }
};

  

  const renderProduct = ({ item }) => (
    <View>
      <ProductListItem 
        item={item}
        onPress={() => handleBuyRequest(item.id, item.userUID)}
        name={item.name}
        expirationDate={item.expirationDate}
        address={item.address}
        pickupDate={item.pickupDate}  
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
          return null; // Hvis lokationen ikke findes så laver vi ikke en markering på kortet
        }

        // Returnerer en Marker-komponent for hvert produkt
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

  // Returnerer selve viewet for DonationsScreen
  // Returnerer selve viewet for DonationsScreen
  return (
    <View style={globalStyles.container}>
      {/* Integration af SearchBar komponenten */}
      <View style={styles.searchAndUpdateContainer}>
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <UpdateButton onPress={fetchProducts} />
      </View>

      <View style={styles.buttonContainer}>
      <BoldButtonDark title="Liste" onPress={() => setViewMode('list')} />
      <BoldButtonDark title="Kort" onPress={() => setViewMode('map')} />
    </View>

      

      {/* Betinget rendering af FlatList eller MapView baseret på viewMode */}
      {viewMode === 'list' ? (
        <FlatList
          data={filteredProducts} // Brug den filtrerede produktliste
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
  searchAndUpdateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Ændret fra 'space-between' til 'flex-start'
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  
};

// Eksporterer DonationsScreen-komponenten som standard
export default DonationsScreen;
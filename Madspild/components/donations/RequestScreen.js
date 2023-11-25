import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { 
  getFirestore, collection, query, where, getDocs, doc, deleteDoc, 
  writeBatch, getDoc, increment 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const RequestScreen = () => {
  const [requests, setRequests] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, "buyRequests"), where("sellerUID", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedRequests = [];
    
        for (const docSnap of querySnapshot.docs) {
          const requestData = docSnap.data();
          const productDocRef = doc(db, "products", requestData.productId);
          const userDocRef = doc(db, "users", requestData.buyerUID);
    
          const productSnap = await getDoc(productDocRef);
          const userSnap = await getDoc(userDocRef);
    
          if (productSnap.exists() && userSnap.exists()) {
            fetchedRequests.push({
              id: docSnap.id,
              productName: productSnap.data().name,
              buyerName: userSnap.data().name,
              ...requestData
            });
          }
        }
    
        setRequests(fetchedRequests);
      }
    };
    

    fetchRequests();
  }, []);

  const handleRequestResponse = async (requestId, isAccepted) => {
    const batch = writeBatch(db);

    // Reference to the request document
    const requestDocRef = doc(db, "buyRequests", requestId);
    const requestData = requests.find(req => req.id === requestId);

    if (isAccepted && requestData) {
      // Delete the product and update seller's points if accepted
      const productDocRef = doc(db, "products", requestData.productId);
      const userDocRef = doc(db, "users", requestData.sellerUID);
      batch.delete(productDocRef);
      batch.update(userDocRef, { points: increment(50) });
    }

    // Delete the request
    batch.delete(requestDocRef);

    await batch.commit();
    Alert.alert(isAccepted ? "Accepted" : "Declined", `Request has been ${isAccepted ? 'accepted' : 'declined'}.`);
    setRequests(requests.filter(request => request.id !== requestId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Product Name: {item.productName}</Text>
      <Text>Buyer Name: {item.buyerName}</Text>
      <Button title="Accept" onPress={() => handleRequestResponse(item.id, true)} />
      <Button title="Decline" onPress={() => handleRequestResponse(item.id, false)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

export default RequestScreen;

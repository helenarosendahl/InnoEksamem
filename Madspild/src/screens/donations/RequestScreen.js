import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {  getFirestore, collection, query, where, getDocs, doc, writeBatch, getDoc, increment} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import RequestItem from '../../components/Lists/RequestItem';
import { globalStyles }  from '../../styles/GlobalStyles';
import  TextBox  from '../../components/Forms/TextBox'



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
    <RequestItem 
      item={item} 
      onAccept={() => handleRequestResponse(item.id, true)} 
      onDecline={() => handleRequestResponse(item.id, false)} 
    />
  );

  return (
    <View style={globalStyles.container}>
      <TextBox text='Her kan du se de anmodninger du er blevet tilsendt, fra andre brugere som er interesseret i at hente dine donationer. Når du accepterer en donation, får du 50 Point som du kan bruge på vores sponsorside. 🍏🫒🥬' />
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};


export default RequestScreen;

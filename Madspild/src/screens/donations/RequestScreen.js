// Importerer nødvendige React Native komponenter
import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Button } from 'react-native';

// Importerer funktioner og auth fra Firebase
import {  getFirestore, collection, query, where, getDocs, doc, writeBatch, getDoc, increment} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Importerer brugerdefinerede komponenter og stilarter
import RequestItem from '../../components/Lists/RequestItem';
import { globalStyles }  from '../../styles/GlobalStyles';
import  TextBox  from '../../components/Forms/TextBox'

// Funktionen for RequestScreen
const RequestScreen = ( { navigation } ) => {
  // Deklarerer variablerne for anmodning 
  const [requests, setRequests] = useState([]);
  // Henter Firestore og Authentication instanser fra Firebase
  const db = getFirestore();
  const auth = getAuth();

  // useEffect-hook bruges til at hente og opdatere anmodningerne
useEffect(() => {
  // Funktion til asynkront at hente og opdatere anmodningerne
  const fetchRequests = async () => {
    if (auth.currentUser) {
      // Opretter en query for at filtrere anmodninger baseret på sælgerens user id og status 'pending'
      const q = query(
        collection(db, "buyRequests"), 
        where("sellerUID", "==", auth.currentUser.uid),
        where("status", "==", "pending")
      );
      const querySnapshot = await getDocs(q);
      const fetchedRequests = [];
  
      // Går gennem hvert dokument og henter relaterede data
      for (const docSnap of querySnapshot.docs) {
        const requestData = docSnap.data();
        const productDocRef = doc(db, "products", requestData.productId);
        const userDocRef = doc(db, "users", requestData.buyerUID);
  
        const productSnap = await getDoc(productDocRef);
        const userSnap = await getDoc(userDocRef);
  
        // Hvis både produktet og brugeren eksisterer, tilføjes anmodningen til listen
        if (productSnap.exists() && userSnap.exists()) {
          fetchedRequests.push({
            id: docSnap.id,
            productName: productSnap.data().name,
            buyerName: userSnap.data().name,
            ...requestData
          });
        }
      }
  
      // Opdaterer med de hentede anmodninger
      setRequests(fetchedRequests);
    }
  };
  
  // Kalder funktionen til hentning af anmodninger
  fetchRequests();
}, [auth, db]); // Added dependencies here

  // Funktion til håndtering af svar på anmodninger (acceptere eller afvise)
const handleRequestResponse = async (requestId, isAccepted) => {
  const batch = writeBatch(db);

  // Finder den specifikke anmodning baseret på ID
  const requestDocRef = doc(db, "buyRequests", requestId);

  if (isAccepted) {
    // Hvis anmodningen accepteres, opdateres sælgerens point
    const requestData = requests.find(req => req.id === requestId);
    if (requestData) {
      const userDocRef = doc(db, "users", requestData.sellerUID);
      batch.update(userDocRef, { points: increment(50) });

      // Opdaterer status på anmodningen til 'accepted'
      batch.update(requestDocRef, { status: 'accepted' });
    }
  } else {
    // Hvis anmodningen afvises, opdater status til 'declined'
    batch.update(requestDocRef, { status: 'declined' });
  }

  await batch.commit();

  // Viser en besked baseret på om anmodningen blev accepteret eller afvist
  Alert.alert(isAccepted ? "Accepted" : "Declined", `Request has been ${isAccepted ? 'accepted' : 'declined'}.`);

  // Opdater listen for at reflektere ændringerne
  fetchRequests(); // Re-fetch the requests to update the list
};
  // Funktion til at definere, hvordan hver anmodning skal vises i FlatList
  const renderItem = ({ item }) => (
    <RequestItem 
      item={item} 
      onAccept={() => handleRequestResponse(item.id, true)} 
      onDecline={() => handleRequestResponse(item.id, false)} 
    />
  );

  const navigateToPickUpDates = () => {
    navigation.navigate('PickUpDate');
  };

  // Returnerer viewet for requestScreen
  return (
    <View style={globalStyles.container}>
      <TextBox text='Her kan du se de anmodninger du er blevet tilsendt, fra andre brugere som er interesseret i at hente dine donationer. Når du accepterer en donation, får du 50 Point som du kan bruge på vores sponsorside. 🍏🫒🥬' />
      {/* FlatList til at vise anmodninger */}
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Go to Pick Up Dates"
        onPress={navigateToPickUpDates}
      />
    </View>
  );
};

// Eksporterer RequestScreen-komponenten som standard
export default RequestScreen;

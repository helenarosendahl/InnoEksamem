// Importerer nødvendige React Native komponenter
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert, Linking } from 'react-native';

// Importerer funktioner og auth fra Firebase
import { getFirestore, doc, getDoc, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Importerer brugerdefinerede komponenter og styles
import OfferItem from '../../../components/Lists/OfferItem'; 
import { globalStyles } from '../../../styles/GlobalStyles';
import TextBox from '../../../components/Forms/TextBox'; 

// Definition af ZokuOffers komponenten
const ZokuOffers = () => {
  // Til opbevaring af brugerens point 
  const [userPoints, setUserPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();

  // Liste over tilbud hvor man kan bruge sine point 
  const offerings = [
    {
      id: 1,
      image: require('../../../assets/offers/Cappucino.jpg'), 
      name: 'Cappucino',
      description: 'Fra en solcelledrevet, fuldt økologisk kaffefarm.',
      points: 50, // hvor mange point produktet koster
    },
    {
      id: 2,
      image: require('../../../assets/offers/Americano.jpg'), 
      name: 'Americano',
      description: 'Fra en solcelledrevet, fuldt økologisk kaffefarm.',
      points: 50, // // hvor mange point produktet koster
    },
   
  ];

  // Funktion til at gemme rabatkoden i Firestore
  const saveDiscountCode = async (code, productName) => {
    if (auth.currentUser) {
      const discountDocRef = doc(collection(db, "discountCodes"));
      await setDoc(discountDocRef, {
        code: code,
        userUID: auth.currentUser.uid,
        productName: productName
      });
    }
  };

  // Display hvor mange point brugeren har
  useEffect(() => {
    const fetchUserPoints = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserPoints(userData.points || 0);
        }
      }
    };

    fetchUserPoints();
  }, []);

  // Funktion til håndtering af indløsning af tilbud
  const handleRedeemOffer = async (offer) => {
    if (userPoints >= offer.points) {
      const discountCode = generateDiscountCode();
      // Vis en besked med den genererede rabatkode
      Alert.alert("Succes!", `Din discount kode: ${discountCode}`);
      
      // Gem rabatkoden i Firestore
      await saveDiscountCode(discountCode, offer.name);

      // Fjern point fra brugerens point-total, efter de har bestil rabartkode
      const newPoints = userPoints - offer.points;
      await updateUserPoints(newPoints);
      setUserPoints(newPoints); // Opdater på siden
    } else {
      // Vis en fejlbesked, hvis brugeren ikke har nok point
      Alert.alert("Error", "Du har ikke nok point til at bruge dette tilbud");
    }
  };
  
  // Funktion til generering af en unik rabatkode
  const generateDiscountCode = () => {
    return 'DISCOUNT' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };
  
  // Funktion til opdatering af brugerens point i Firestore
  const updateUserPoints = async (newPoints) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        points: newPoints
      });
    }
  };

  // Returnerer viewet for brugeren 
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.pointsContainer}>
        <Text style={[globalStyles.text, globalStyles.pointsText]}>Points: {userPoints}</Text>
      </View>


      <TextBox
  text="Velkommen til vores kuponer til brugere af 'For Godt Til Skrot'! Her har vi samlet et nøje udvalg af vores produkter, som kan afhentes i vores restaurant. For at se vores initiativer til bæredygtighed, læs med "
  linkText="her."
  linkUrl='https://livezoku.com/sustainability/'
/>      

      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={globalStyles.offersContainer}
        contentContainerStyle={globalStyles.offersContentContainer}
      >
        {offerings.map((offer) => (
          <OfferItem 
            key={offer.id} 
            offer={offer} 
            onRedeem={() => handleRedeemOffer(offer)} 
          />
        ))}
      </ScrollView>
    </View>
  );
};


export default ZokuOffers;

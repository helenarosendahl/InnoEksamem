// Importerer nødvendige React Native komponenter
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';

// Importerer funktioner og auth fra Firebase
import { getFirestore, doc, getDoc, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Importerer brugerdefinerede komponenter og styles
import OfferItem from '../../../components/Lists/OfferItem'; 
import { globalStyles } from '../../../styles/GlobalStyles';
import TextBox from '../../../components/Forms/TextBox'; 

// Definition af JoeOffers komponenten
const JoeOffers = () => {
  // Til opbevaring af brugerens point 
  const [userPoints, setUserPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();

  // Liste over tilbud hvor man kan bruge sine point 
  const offerings = [
    {
      id: 1,
      image: require('../../../assets/offers/joe-kaffid.jpg'), 
      name: 'Double Espresso',
      description: 'Fra en solcelledrevet, fuldt økologisk kaffefarm',
      points: 50, // hvor mange point produktet koster
    },
    {
      id: 2,
      image: require('../../../assets/offers/greenTea.jpg'), 
      name: 'Grøn Mandarin Te',
      description: 'Økologisk Te, med en skrive frisk citron',
      points: 50, // // hvor mange point produktet koster
    },
    {
      id: 3,
      image: require('../../../assets/offers/gingerShot.jpg'), 
      name: 'Ingefær shot',
      description: 'Med økologisk æble og ingefær',
      points: 50, // hvor mange point produktet koster
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

      // Fjern point fra brugerens point-total, efter de har valgt rabatkode
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
  text="Her har vi samlet et nøje udvalg af vores produkter, som kan bestilles og afhentes i en af vores mange caféer. For at indløse dine points hos os, skal du bruge vores App. Hvis du ikke allerede har den, kan den downloades "
  linkText="her."
  linkUrl='https://apps.apple.com/dk/app/joe-the-juice/id1347116229?_branch_match_id=1258168894973534393&utm_source=Website&utm_campaign=Loyalty&utm_medium=URL&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8pPTcxLKclIzSrNTE7VSywo0MvJzMvWN3I3KirNDispMwYAZNL9rioAAAA%3D'
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


export default JoeOffers;

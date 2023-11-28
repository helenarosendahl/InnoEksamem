import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert, Linking } from 'react-native';
import { getFirestore, doc, getDoc, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import OfferItem from '../../../components/Lists/OfferItem'; // Import the new component
import { globalStyles } from '../../../styles/GlobalStyles';

const CofocoOffers = () => {
  const [userPoints, setUserPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();

  const offerings = [
    {
      id: 1,
      image: require('../../../assets/joe-kaffid.jpg'), // path
      name: 'Double Espresso',
      description: 'From a solar powered, fully organic, coffee farm.',
      points: 50, // hvor mange point produktet koster
    },
    {
      id: 2,
      image: require('../../../assets/joeLogo.png'), // path
      name: 'Product 2',
      description: 'Description of Product 1',
      points: 1, // // hvor mange point produktet koster
    },
    {
      id: 3,
      image: require('../../../assets/joeLogo.png'), // path
      name: 'Product 3',
      description: 'Description of Product 1',
      points: 1, // hvor mange point produktet koster
    },
  ];

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

  const handleRedeemOffer = async (offer) => {
    if (userPoints >= offer.points) {
      const discountCode = generateDiscountCode();
      Alert.alert("Succes!", `Din discount kode: ${discountCode}`);
      
      await saveDiscountCode(discountCode, offer.name);


      // Fjern point fra brugerens point-total, efter de har bestil rabartkode
      const newPoints = userPoints - offer.points;
      await updateUserPoints(newPoints);
      setUserPoints(newPoints); // Update på siden
    } else {
      Alert.alert("Error", "Du har ikke nok point til at bruge dette tilbud");
    }
  };
  
  const generateDiscountCode = () => {
    return 'DISCOUNT' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };
  
  const updateUserPoints = async (newPoints) => {
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        points: newPoints
      });
    }
  };

 

    const missionUrl = 'https://www.joejuice.com/impact';

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.pointsContainer}>
        <Text style={[globalStyles.text, globalStyles.pointsText]}>Points: {userPoints}</Text>
      </View>
      <Text style={globalStyles.text}>
      Velkommen til vores tilbud til brugere af 'For Godt Til Skrot'!
      Velkommen til vores tilbud til brugere af 'For Godt Til Skrot'!
      Velkommen til vores tilbud til brugere af 'For Godt Til Skrot'!
      {' '}
      Læs mere om vores mission
      {' '}
      <Text
        style={[globalStyles.topText, { color: 'blue', textDecorationLine: 'underline' }]}
        onPress={() => Linking.openURL(missionUrl)}
      >
        her
      </Text>
      .
    </Text>

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


export default CofocoOffers;

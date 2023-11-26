import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const JoeOffers = () => {
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

 
  

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Points: {userPoints}</Text>
      </View>
      <Text style={styles.topText}>Welcome to Our Offers, Welcome to Our Offers, Welcome to Our Offers , Welcome to Our Offers, Welcome to Our Offers , Welcome to Our Offers Welcome to Our Offers Welcome to Our Offers Welcome to Our Offers</Text> 
    

      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        style={styles.offersContainer}
        contentContainerStyle={styles.offersContentContainer} 
      >
        {offerings.map((offer) => (
          <View key={offer.id} style={styles.offerBox}>
            <Image source={offer.image} style={styles.offerImage} />
            <Text style={styles.offerName}>{offer.name}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
            <Text style={styles.offerPoints}>Points: {offer.points}</Text>
            <Button title="Brug tilbud!" onPress={() => handleRedeemOffer(offer)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around', // This helps in distributing space
  },
  pointsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    zIndex: 1, 
  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10, 
  },
  offersContainer: {
  
    flex: 0.3, 
    backgroundColor: '#fffff0',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'pink',
    height: 300,
  },
  offersContentContainer: {
    paddingHorizontal: 20, 
  },
  offerBox: {
    flex: 0.5,
    width: 250,
    height: 300,
    marginHorizontal: 10, 
    padding: 10,
    backgroundColor: '#ffe4e1',
    borderRadius: 10,
    alignItems: 'center', 
  },
  offerImage: {
    width: '100%',
    height: 150, 
    resizeMode: 'contain',
  },
  offerName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default JoeOffers;

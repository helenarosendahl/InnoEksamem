import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const JoeOffers = () => {
  const [userPoints, setUserPoints] = useState(0);
  const db = getFirestore();
  const auth = getAuth();

  const offerings = [
    {
      id: 1,
      image: require('../../../assets/joe-kaffid.jpg'), // Local image or remote URL
      name: 'Double Espresso',
      description: 'From a solar powered, fully organic, coffee farm.',
      points: 50, // Cost in points
    },
    {
      id: 2,
      image: require('../../../assets/joeLogo.png'), // Local image or remote URL
      name: 'Product 2',
      description: 'Description of Product 1',
      points: 1, // Cost in points
    },
    {
      id: 3,
      image: require('../../../assets/joeLogo.png'), // Local image or remote URL
      name: 'Product 3',
      description: 'Description of Product 1',
      points: 1, // Cost in points
    },
    // ... more offers
  ];

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

  const handleRedeemOffer = (offer) => {
    if (userPoints >= offer.points) {
      const discountCode = generateDiscountCode();
      Alert.alert("Success", `Your discount code: ${discountCode}`);
      // Deduct points from user's account and update in Firebase
    } else {
      Alert.alert("Error", "Du har ikke nok point til at bruge dette tilbud");
    }
  };
  
  const generateDiscountCode = () => {
    // Generate and return a discount code
    return 'DISCOUNT123'; // Example code
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
        contentContainerStyle={styles.offersContentContainer} // Added for inner content styling
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
    zIndex: 1, // Ensures it's on top of other elements
  },
  // Add a new style for the top text
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10, // Adds space above and below the text
  },
  offersContainer: {
    // Reduced the flex value to take lesser space
    flex: 0.3, // Adjust this value as needed
    backgroundColor: '#fffff0',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'pink',
    height: 300, // Adjusted height
  },
  offersContentContainer: {
    paddingHorizontal: 20, // Add padding for the inner content of the ScrollView
  },
  offerBox: {
    flex: 0.5,
    width: 250,
    height: 300,
    marginHorizontal: 10, // Adjusted for horizontal margins
    padding: 10,
    backgroundColor: '#ffe4e1',
    borderRadius: 10,
    alignItems: 'center', // Center the items horizontally
  },
  offerImage: {
    width: '100%',
    height: 150, // Ensure this height works with your images
    resizeMode: 'contain',
  },
  offerName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default JoeOffers;

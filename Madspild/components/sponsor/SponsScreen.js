import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SponsScreen = ({ navigation }) => {
    const [userPoints, setUserPoints] = useState(0);
    const db = getFirestore();
    const auth = getAuth();

    const sponsors = [
        { id: 1, name: "Joe & the Juice", logoUrl: "path/to/logo1.png", description: "We care about leaving the Planet in a better state than we found it in therefore reducing our impact on the environment. Not only in our stores, but making it easier for our customers to recycle our products through our Recycling Loop. We'll limit the materials used in our receptacles making recycling simple efficient, whilst also moving to RPET, Bagasse, & Recycled Paper. We'll stay committed to our 2% Food Waste Score by continuing to make everything fresh to order." },
        { id: 2, name: "Sponsor 2", logoUrl: "path/to/logo2.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { id: 3, name: "Sponsor 3", logoUrl: "path/to/logo3.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { id: 4, name: "Sponsor 4", logoUrl: "path/to/logo4.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },

      ];
  
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

  return (
    <View style={styles.container}>

      <ScrollView>
      <Text style={styles.headerTexttext}> Vores sponsorer, som gør det muligt at drive denne applikation. Se hvilke produkter du kan købe, med dine optjente point! </Text>
        {sponsors.map((sponsor) => (
          <View key={sponsor.id} style={styles.sponsorBox}>
            <Image source={{ uri: sponsor.logoUrl }} style={styles.logo} />
            <Text style={styles.sponsorHeadText}>{sponsor.name}</Text>
            <Text style={styles.text}>{sponsor.description}</Text>
            <Button title={`Se produkter fra ${sponsor.name}`} onPress={() => navigation.navigate('ProductScreen')} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pointsContainer}>
  <Text style={styles.pointsText}>Point: {userPoints}</Text>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sponsorBox: {
    padding: 20,
    marginVertical: 20, // Reduced vertical margin for less spacing
    backgroundColor: '#ffc0cb', // Pink background color
    borderRadius: 10,
    borderWidth: 2, // Adjust as needed
    borderColor: 'pink', // Pink border color
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  headerText: {
    marginTop: 30,
  },

  sponsorHeadText: {
    textAlign: 'center',
    fontSize: 25,
  },
  text: {
    marginVertical: 10,
    textAlign: 'left',

  },
  pointsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity

  },
  pointsText: {
    fontWeight: 'bold',
  },
});

export default SponsScreen;

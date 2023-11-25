import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SponsScreen = ({ navigation }) => {
    const [userPoints, setUserPoints] = useState(0);
    const db = getFirestore();
    const auth = getAuth();

    const sponsors = [
        { id: 1, name: "Joe & the Juice", logoUrl: "path/to/logo1.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
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
        {sponsors.map((sponsor) => (
          <View key={sponsor.id} style={styles.sponsorBox}>
            <Image source={{ uri: sponsor.logoUrl }} style={styles.logo} />
            <Text style={styles.text}>{sponsor.name}</Text>
            <Text style={styles.text}>{sponsor.description}</Text>
            <Button title={`Se produkter fra ${sponsor.name}`} onPress={() => navigation.navigate('ProductScreen')} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pointsContainer}>
  <Text style={styles.pointsText}>Your Points: {userPoints}</Text>
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
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    marginVertical: 10,
    textAlign: 'center',

  },
  pointsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  pointsText: {
    fontWeight: 'bold',
  },
});

export default SponsScreen;

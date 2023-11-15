import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    biography: '',
    address: '',
    points: 0, // Initialize points as 0
    name: ''
  });

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;
  const userDocRef = doc(firestore, "users", user.uid);

  useEffect(() => {
    // Fetch user profile data from Firestore
    const fetchUserProfile = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        // Initialize with default points if no document exists
        setUserProfile(prevState => ({ ...prevState, points: 0 }));
      }
    };

    fetchUserProfile();
  }, [userDocRef]);

  const handleInputChange = (name, value) => {
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSave = async () => {
    // Exclude points from saving, as it's not editable
    const { points, ...profileData } = userProfile;
    try {
      await setDoc(userDocRef, profileData);
      alert('Profile saved successfully!');
    } catch (error) {
      alert('Error saving profile:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={userProfile.name}
        onChangeText={(text) => handleInputChange('name', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Biography"
        value={userProfile.biography}
        onChangeText={(text) => handleInputChange('biography', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={userProfile.address}
        onChangeText={(text) => handleInputChange('address', text)}
        style={styles.input}
      />
      {/* Displaying points */}
      <Text style={styles.pointsDisplay}>Points: {userProfile.points}</Text>
      <Button title="Save Profile" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  pointsDisplay: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';


//En bruger oprettes først i systemet, når de manuelt går ind og indsætter oplysninger
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    biography: '',
    address: '',
    points: 0, // point initieres på 0
    name: '', 
    userUID: '' // hentes fra firebase authentication (getAuth) 
  });

  // Firebase connection
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  // Ensure userUID is set when the component mounts or user changes
  useEffect(() => {
    if (user) {
      setUserProfile(prevState => ({ ...prevState, userUID: user.uid }));
    }
  }, [user]);

  const userDocRef = doc(firestore, "users", user.uid);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserProfile({ ...docSnap.data(), userUID: user.uid });
      }
    };

    fetchUserProfile();
  }, [userDocRef, user.uid]);

  const handleInputChange = (name, value) => {
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSave = async () => {
    try {
      await setDoc(userDocRef, userProfile);
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
  }
});

export default UserProfile;

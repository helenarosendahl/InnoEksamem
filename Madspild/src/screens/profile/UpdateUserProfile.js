import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UpdateUserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    biography: '',
    address: '',
    points: 0,
    name: '', 
    userUID: ''
  });

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

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

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        // Accessing the selected image's URI using the assets array
        const imageUri = result.assets[0].uri;
        uploadImage(imageUri);
      }
    } catch (err) {
      console.error('ImagePicker Error:', err);
    }
  };

  const uploadImage = async (uri) => {
    if (!user) return;
  
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
  
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadURL);
      setUserProfile(prevState => ({ ...prevState, photoURL: downloadURL }));
    } catch (error) {
      console.error('Error uploading image:', error);
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
      <Button title="Upload billede af dig selv" onPress={selectImage} />
      <Image source={{ uri: userProfile.photoURL }} style={{ width: 100, height: 100 }} />

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

export default UpdateUserProfile;


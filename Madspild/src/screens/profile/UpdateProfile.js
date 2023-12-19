import React, { useState, useEffect } from 'react';
import { View, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CustomTextInput } from '../../components/Forms/TextInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';

import AppLogo from '../../components/Logo/AppLogo';
import { globalStyles } from '../../styles/GlobalStyles';

const UpdateProfile = () => {
  const [UserSettings, setUserSettings] = useState({
    biography: '',
    address: '',
    name: '', 
    userUID: ''
  });

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setUserSettings(prevState => ({ ...prevState, userUID: user.uid }));
    }
  }, [user]);

  const userDocRef = doc(firestore, "users", user.uid);

  useEffect(() => {
    const fetchUserSettings = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
    
        if (!UserSettings.name && !UserSettings.biography && !UserSettings.address) {
          setUserSettings({ ...docSnap.data(), userUID: user.uid });
        }
      }
    };

    fetchUserSettings();
  }, [userDocRef, user.uid]);

  const handleInputChange = (name, value) => {
    setUserSettings({ ...UserSettings, [name]: value });
  };

  const handleSave = async () => {
    try {
      await setDoc(userDocRef, UserSettings);
      Alert.alert('Succes!', 'Dine oplysninger er opdateret');
    } catch (error) {
      alert('Fejl:', error.message);
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
      setUserSettings(prevState => ({ ...prevState, photoURL: downloadURL }));
      Alert.alert('Succes!', 'Dit billede er uploadet. Du ser fantastisk ud!');

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Tastaturet skjules lidt ved indtastning af inputfelter
    >
      <ScrollView>
        <View style={globalStyles.innerContainer}>
        {UserSettings.photoURL && (
            <Image source={{ uri: UserSettings.photoURL }} style={globalStyles.image} />
          )}
          <CustomTextInput
            placeholder="Name"
            value={UserSettings.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <CustomTextInput
            placeholder="Biography"
            value={UserSettings.biography}
            onChangeText={(text) => handleInputChange('biography', text)}
          />
          <CustomTextInput
            placeholder="Address"
            value={UserSettings.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
          <SecondaryButton title="Upload billede af dig selv" onPress={selectImage} />
          
          <PrimaryButton title="Gem mine ændringer" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;


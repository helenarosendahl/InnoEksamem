import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CustomTextInput } from '../../components/Forms/TextInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';

import AppLogo from '../../components/Logo/AppLogo';
import { globalStyles } from '../../styles/GlobalStyles';

const UpdateUserProfile = () => {
  const [userProfile, setUserProfile] = useState({
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
      setUserProfile(prevState => ({ ...prevState, userUID: user.uid }));
    }
  }, [user]);

  const userDocRef = doc(firestore, "users", user.uid);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
    
        if (!userProfile.name && !userProfile.biography && !userProfile.address) {
          setUserProfile({ ...docSnap.data(), userUID: user.uid });
        }
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
      setUserProfile(prevState => ({ ...prevState, photoURL: downloadURL }));
      Alert.alert('Succes!', 'Dit billede er uploadet. Du ser fantastisk');

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <AppLogo source={require('../../assets/logos/appLogo.png')} />
      <CustomTextInput
        placeholder="Name"
        value={userProfile.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <CustomTextInput
        placeholder="Biography"
        value={userProfile.biography}
        onChangeText={(text) => handleInputChange('biography', text)}
      />
      <CustomTextInput
        placeholder="Address"
        value={userProfile.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      <SecondaryButton title="Upload billede af dig selv" onPress={selectImage} />
      {userProfile.photoURL && (
        <Image source={{ uri: userProfile.photoURL }} style={globalStyles.image} />
      )}
      <PrimaryButton title="Save Profile" onPress={handleSave} />
    </View>
  );
};

export default UpdateUserProfile;


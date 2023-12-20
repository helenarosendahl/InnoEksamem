// Importerer nødvendige React Native komponenter
import React, { useState, useEffect } from 'react';
import { View, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Importerer funktioner og auth fra Firebase
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Importerer brugerdefinerede komponenter og styles
import { CustomTextInput } from '../../components/Forms/TextInput';
import { BoldButtonDark } from '../../components/Buttons/BoldButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import AppLogo from '../../components/Logo/AppLogo';
import { globalStyles } from '../../styles/GlobalStyles';

const UpdateProfile = () => {
  // State til brugerens indstillinger
  const [UserSettings, setUserSettings] = useState({
    biography: '',
    address: '',
    name: '', 
    userUID: ''
  });

  // Firebase-auth
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  // Sætter brugerens aktuelle UID, når brugeren er logget ind
  useEffect(() => {
    if (user) {
      setUserSettings(prevState => ({ ...prevState, userUID: user.uid }));
    }
  }, [user]);

  // Reference til brugerens Firestore bruger
  const userDocRef = doc(firestore, "users", user.uid);

  // Henter brugerens indstillinger fra Firestore
  useEffect(() => {
    const fetchUserSettings = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
    
        // Opdaterer indstillinger, hvis de ikke allerede er opdateret
        if (!UserSettings.name && !UserSettings.biography && !UserSettings.address) {
          setUserSettings({ ...docSnap.data(), userUID: user.uid });
        }
      }
    };

    fetchUserSettings();
  }, [userDocRef, user.uid]);

  // Funktion til at håndtere ændringer i inputfelter
  const handleInputChange = (name, value) => {
    setUserSettings({ ...UserSettings, [name]: value });
  };

  // Funktion til at gemme brugerens opdaterede indstillinger
  const handleSave = async () => {
    try {
      await setDoc(userDocRef, UserSettings);
      Alert.alert('Succes!', 'Dine oplysninger er opdateret');
    } catch (error) {
      alert('Fejl:', error.message);
    }
  };

  // Funktion til at vælge og uploade et profilbillede
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

  // Funktion til at uploade et billede til Firebase Storage
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

  // Det brugeren ser ved UpdateProfile
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
          
          <BoldButtonDark title="Gem mine ændringer" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;
// Importerer nødvendige React Native komponenter
import React, { useState } from 'react';
import { ScrollView, View, Alert, Image, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Calendar } from 'react-native-calendars';


// Importerer funktioner og auth fra Firebase
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Importerer brugerdefinerede komponenter og stilarter
import { CustomTextInput } from '../../components/Forms/TextInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';

import { globalStyles } from '../../styles/GlobalStyles';
import TextBox from '../../components/Forms/TextBox';


// Funktionen for UploadProduct
const UploadProduct = () => {
  // State til inputfelter og billedet URI
  const [productName, setProductName] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [calendarType, setCalendarType] = useState(null);
  const [expirationDate, setExpirationDate] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [address, setAddress] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Firestore reference
  const db = getFirestore();
  const productsRef = collection(db, "products");

  const handleDayPress = (day) => {
    if (calendarType === 'expiration') {
        setExpirationDate(day.dateString);
    } else if (calendarType === 'pickup') {
        setPickupDate(day.dateString);
    }
    setIsCalendarVisible(false);
    setCalendarType(null);
};

   // Firebase Auth for at hente userUID
   const auth = getAuth();
   const userUID = auth.currentUser ? auth.currentUser.uid : null;

   // API key -  dårlig sikkerhedsmæssigt at have den liggende her, så vi skal måske lige undersøge om der er smartere måde at gemme den på
  const GEOCODING_API_KEY = 'AIzaSyCfV3r616nHsjc68xFRkAlNCQlz8XZDKRw';

  // Funktion til at oversætte en adresse til koordinater ved hjælp af Google Maps Geocoding API
  const fetchCoordinates = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Geocoding API returned status: ${data.status}`);
    }

    // Tjekker om der er resultater i data.results og om længden af resultaterne (data.results.length) er større end 0. Hvis betingelsen er opfyldt, returneres koordinaterne fra det første resultat; ellers kastes en fejlmeddelelse.
    if (data.results && data.results.length > 0) {
      // Kører hvis der er resultater og antallet af resultater er større end 0
      return data.results[0].geometry.location;
    } else {
      // Kører hvis der ikke er nogen resultater eller antallet af resultater er 0
      throw new Error('Failed to fetch coordinates');
    }
  };

  // Funktion til at vælge et billede fra brugerens enhed ved hjælp af Expo ImagePicker
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) { 
        const image = result.assets ? result.assets[0] : null;
        if (image) {
            setImageUri(image.uri); 
        }
    }
};

// Funktion til at tage et billede inde i appen, bygger på expo-image-picker
const takePicture = async () => {
  // anmoder om kamera adgang
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
      Alert.alert('Adgang afvist');
      return;
  }

  // Starter launchCameraAsync
  let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  });

  // Håndtering af billedet
  if (!result.cancelled) {
      const image = result.assets ? result.assets[0] : null;
      if (image) {
          setImageUri(image.uri);
      }
  }
};


  // Funktion til at uploade billedet til Firebase Storage
  
  const uploadImage = async () => {
    if (!imageUri || !userUID) return null;

    const storage = getStorage();
    const filename = `products/${userUID}/${Date.now()}`;
    const storageRef = ref(storage, filename);

    const response = await fetch(imageUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };


  // Funktion, der håndterer upload af produkt til databasen
  const handleProductUpload = async () => {
    if (!userUID) {
      Alert.alert("Error", "You must be logged in to upload a product.");
      return;
    }

    if (!productName || !expirationDate || !address || !imageUri) {
      Alert.alert("Fejl", "Udfyld alle obligatoriske felter.");
      return;
  }

    // Efter produktet er blevet uploadet, genopfriskes siden og værdierne nulstilles 
    const resetForm = () => {
      setProductName('');
      setExpirationDate(new Date()); 
      setAddress('');
      setPickupDate('');
      setImageUri('');
      setUploadedImageUrl(null);
    };

    try {
      const location = await fetchCoordinates(address); // Bruger fetchCoordinates til at omskrive adresse til koordinater
      const imageUrl = await uploadImage(); // Sender billedet til Firebase Storage og henter URL
      if (location) {
        await addDoc(productsRef, { // Hvad der sendes til firebase database
          name: productName,
          expirationDate,
          address,
          pickupDate,
          location,
          imageUrl, 
          userUID
        });
        Alert.alert("Succes!", "Tak for at reducere madspild 🍏");
        resetForm(); // kalder resetform for at nulstille formularen
      } else {
        Alert.alert("Invalid address. Unable to geocode.");
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  // Returnerer selve viewet for UploadProduct
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
    <View style={globalStyles.container}>
      <TextBox text="Doner dine overskydende madvarer - Du hjælper med at reducere madspild, gør en god gerning, og optjener point du kan bruges hos vores sponsorer! 🍏🍇🥝 " />
      <CustomTextInput
        placeholder="Hvad vil du donere?"
        value={productName}
        onChangeText={setProductName}
      />
        {/* Udløbsdato */}
        <TouchableOpacity onPress={() => {setIsCalendarVisible(true); setCalendarType('expiration');}}>
                    <CustomTextInput
                        placeholder="Udløbsdato"
                        value={expirationDate}
                        editable={false}
                    />
                </TouchableOpacity>

                {/* Afhentningsdato */}
                <TouchableOpacity onPress={() => {setIsCalendarVisible(true); setCalendarType('pickup');}}>
                    <CustomTextInput
                        placeholder="Afhentningsdato (Valgfrit)"
                        value={pickupDate}
                        editable={false}
                    />
                </TouchableOpacity>

                {isCalendarVisible && (
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            [calendarType === 'expiration' ? expirationDate : pickupDate]: {selected: true, selectedColor: 'blue'}
                        }}
                    />
                )}

      <CustomTextInput
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
      />
<PrimaryButton title="Tag et billede af din donation" onPress={takePicture} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <SecondaryButton title="Opret din donation" onPress={handleProductUpload} />
    </View>
    </ScrollView>

  );
};

// Eksporterer UploadProduct-komponenten som standard
export default UploadProduct;
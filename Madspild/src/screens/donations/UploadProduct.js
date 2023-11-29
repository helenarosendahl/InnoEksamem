import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { CustomTextInput } from '../../components/Forms/TextInput';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
import TextBox from '../../components/Forms/TextBox';


const UploadProduct = () => {
  const [productName, setProductName] = useState('');
  const [expirationDate, setExpirationDate] = useState(''); // skal helst ændres til en datepicker af en art, men kan ikke få dem til at virke 
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);



  // Firestore reference
  const db = getFirestore();
  const productsRef = collection(db, "products");

   // Firebase Auth for at hente userUID
   const auth = getAuth();
   const userUID = auth.currentUser ? auth.currentUser.uid : null;

   // API key - virkelig dårlig sikkerhedsmæssigt at have den liggende her, så vi skal måske lige undersøge om der er smartere mådere at gemme den på
const GEOCODING_API_KEY = 'AIzaSyCfV3r616nHsjc68xFRkAlNCQlz8XZDKRw';

   // geocoding funktion
  const fetchCoordinates = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Geocoding API returned status: ${data.status}`);
    }

    // forklar dette for-loop
    if (data.results && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      throw new Error('Failed to fetch coordinates');
    }
  };

  // Vælg billede laves med Expo imagepicker 
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

// Håndterer at sende billede til firebase storage
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



  // Funktion der håndterer hvad der sker når "upload product" trykkes
  const handleProductUpload = async () => {
    if (!userUID) {
      Alert.alert("Error", "You must be logged in to upload a product.");
      return;
    }

    // Efter produktet er blevet uploadet, genopfriskes siden og værdierne nulstilles 
    const resetForm = () => {
      setProductName('');
      setExpirationDate(new Date()); 
      setAddress('');
      setNote('');
      setImageUri('');
      setUploadedImageUrl(null);
    };

    try {
      const location = await fetchCoordinates(address); // bruger fetchCoordinates til at omskrive adresse til lat, lng
      const imageUrl = await uploadImage(); // prøver at sende billedet til database
      if (location) {
        await addDoc(productsRef, { // hvad der sendes til firebase database
          name: productName,
          expirationDate,
          address,
          note,
          location,
          imageUrl, // kan evt ændres
          userUID
        });
        Alert.alert("Succes!", "Tak for at reducere madspild 🍏");
        resetForm(); // kalder resetform for at genopfriske
      } else {
        Alert.alert("Invalid address. Unable to geocode.");
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };


  return (
    <View style={globalStyles.container}>
      <TextBox text="Doner dine overskydende madvarer - Du hjælper med at reducere madspild, gør en god gerning, og optjener point du kan bruges hos vores sponsorer! 🍏🍇🥝 " />
      <CustomTextInput
        placeholder="Hvad vil du donere?"
        value={productName}
        onChangeText={setProductName}
      />
      <CustomTextInput
        placeholder="Evt. kommentarer, og afhentningsdato?"
        value={note}
        onChangeText={setNote}
      />
      <CustomTextInput
        placeholder="Udløbsdato"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />
      <CustomTextInput
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
      />
      <PrimaryButton title="Upload billede" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <PrimaryButton title="Send din donation!" onPress={handleProductUpload} />
    </View>
  );
};

export default UploadProduct;

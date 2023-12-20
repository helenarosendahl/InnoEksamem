// Importerer nødvendige React Native komponenter
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Importerer funktioner og auth fra Firebase
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Importerer brugerdefinerede komponenter og styles
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../components/Forms/TextBox';


const UserSettings = ({ navigation }) => {
  // Til opbevaring af brugerens profilbillede URL
  const [photoURL, setPhotoURL] = useState(null);
  // Til opbevaring af brugerens oplysninger
  const [UserSettings, setUserSettings] = useState({
    address: '',
    biography: '',
    name: '',
  });
  // Til opbevaring af brugerens rabatkoder
  const [discountCodes, setDiscountCodes] = useState([]);

  // Til at styre visning/skjul af rabatkoder
  const [showDiscountCodes, setShowDiscountCodes] = useState(false);

  // Firebase authentication og firestore 
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

 // Funktion til at indlæse brugerprofil og billede
 const fetchUserSettings = async () => {
  if (user) {
    const storage = getStorage();
    const imageRef = ref(storage, `profile_pictures/${user.uid}`);
    try {
      const url = await getDownloadURL(imageRef);
      setPhotoURL(url);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }

    const userDocRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      setUserSettings(docSnap.data());
    }
  }
};

// Udføres ved opstart for at indlæse brugeroplysninger
useEffect(() => {
  fetchUserSettings();
}, [user]);

  // Navigationsfunktion til skærm for opdatering af brugerprofil
  const navigateToUpdateProfile = () => {
    navigation.navigate('UpdateProfile'); // Bruger route name som string
  };

  // Funktion til at indlæse brugerens rabatkoder fra firestore
  const fetchDiscountCodes = async () => {
    if (user) {
      // Query til at hente rabatkoder for den aktuelle bruger
      const q = query(collection(firestore, "discountCodes"), where("userUID", "==", user.uid));
      const querySnapshot = await getDocs(q);
      // Gem rabatkoder og vis dem
      const fetchedCodes = querySnapshot.docs.map(doc => doc.data());
      setDiscountCodes(fetchedCodes);
      setShowDiscountCodes(true);
    }
  };

  // Funktion til at skifte mellem visning/skjul af rabatkoder
  const toggleDiscountCodes = async () => {
    // Hvis rabatkoder ikke er vist, skal de indlæses først
    if (!showDiscountCodes) {
      await fetchDiscountCodes();
    }
    // Skift visning/skjul af rabatkoder
    setShowDiscountCodes(!showDiscountCodes);
  };

  // Genbrugelig komponent til en opdateringsknap med ikon
  const UpdateButton = ({ onPress, iconName, iconSize, iconColor, style }) => {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
  };

  // Returnerer det brugeren ser ved UserSettings
  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Mine oplysninger</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
        {/* Rediger profilknap */}
        <TouchableOpacity 
        style={globalStyles.primaryButton} 
        onPress={navigateToUpdateProfile}>
        <Ionicons name="create-outline" size={30} style={globalStyles.editIcon} />
        </TouchableOpacity>

        <View style={{ marginRight: 10 }} />

        {/* Opdateringsknap */}
        <UpdateButton 
    onPress={fetchUserSettings}
    iconName="refresh-outline"
    iconSize={30}
    iconColor="gray"
    style={globalStyles.reloadIcon}
  />
</View>
      </View>
      <View style={styles.imageContainer}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.image} />
        ) : (
          <Text>Intet profilbillede. Upload et!</Text>
        )}
      </View>
     
      <View style={globalStyles.ProfileInfoContainer}>
      <Text>Navn</Text>
      <Text>{UserSettings.name || 'Not available'}</Text>
    </View>
    
      <View style={globalStyles.ProfileInfoContainer}>
      <Text>Adresse</Text>
      <Text>{UserSettings.address || 'Not available'}</Text>
    </View>

    <View style={globalStyles.ProfileInfoContainer}>
      <Text>Om mig</Text>
      <Text>{UserSettings.biography || 'Not available'}</Text>
    </View>

      {/* Knap til at vise/skjule rabatkoder */}
      <PrimaryButton title={showDiscountCodes ? "Skjul rabatkoder" : "Mine kuponer"} onPress={toggleDiscountCodes} />

      {/* Visning af rabatkoder, hvis de er vist og ikke skjult */}
      {showDiscountCodes && (
        <View style={globalStyles.offersContainer}>
          {discountCodes.map((code, index) => (
            <TextBox key={index} text={`Produkt: ${code.productName}, Kode: ${code.code}`} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // Gør billedet cirkulært
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },

});


export default UserSettings;

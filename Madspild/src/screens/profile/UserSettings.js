import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextBox from '../../components/Forms/TextBox';


const UserSettings = ({ navigation }) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [UserSettings, setUserSettings] = useState({
    address: '',
    biography: '',
    name: '',
  });
  const [discountCodes, setDiscountCodes] = useState([]);
  const [showDiscountCodes, setShowDiscountCodes] = useState(false);

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

useEffect(() => {
  fetchUserSettings();
}, [user]);

  const navigateToUpdateProfile = () => {
    navigation.navigate('UpdateProfile'); // Bruger route name som string
  };

  const fetchDiscountCodes = async () => {
    if (user) {
      const q = query(collection(firestore, "discountCodes"), where("userUID", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedCodes = querySnapshot.docs.map(doc => doc.data());
      setDiscountCodes(fetchedCodes);
      setShowDiscountCodes(true);
    }
  };

  const toggleDiscountCodes = async () => {
    if (!showDiscountCodes) {
      await fetchDiscountCodes();
    }
    setShowDiscountCodes(!showDiscountCodes);
  };

  const UpdateButton = ({ onPress, iconName, iconSize, iconColor, style }) => {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </TouchableOpacity>
    );
  };

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


      <PrimaryButton title={showDiscountCodes ? "Skjul rabatkoder" : "Mine kuponer"} onPress={toggleDiscountCodes} />

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
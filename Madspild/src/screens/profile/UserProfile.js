import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import TextBox from '../../components/Forms/TextBox'; 
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { globalStyles } from '../../styles/GlobalStyles';


const UserProfile = ({ navigation }) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [userProfile, setUserProfile] = useState({
    address: '',
    biography: '',
    name: '',
  });
  const [discountCodes, setDiscountCodes] = useState([]);
  const [showDiscountCodes, setShowDiscountCodes] = useState(false);

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchImageURL = async () => {
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
          setUserProfile(docSnap.data());
        }
      }
    };

    fetchImageURL();
  }, [user]);

  const navigateToUpdateProfile = () => {
    navigation.navigate('UpdateUserProfile'); // Bruger route name som string
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

  return (
    <ScrollView style={globalStyles.container}>
         <View style={styles.headerContainer}>
        <Text style={styles.title}>Din profil</Text>
        <PrimaryButton 
          title="Rediger profil" 
          onPress={navigateToUpdateProfile} 
        />
      </View>
      <View style={styles.imageContainer}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.image} />
        ) : (
          <Text>Intet profilbillede. Upload et!</Text>
        )}
      </View>
      <TextBox text={`Adresse: ${userProfile.address || 'Not available'}`} />
      <TextBox text={`Om mig: ${userProfile.biography || 'Not available'}`} />
      <TextBox text={`Navn: ${userProfile.name || 'Not available'}`} />

      <PrimaryButton title={showDiscountCodes ? "Skjul rabatkoder" : "Dine rabatkoder"} onPress={toggleDiscountCodes} />

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


export default UserProfile;

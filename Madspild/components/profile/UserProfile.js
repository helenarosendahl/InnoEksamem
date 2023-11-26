import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const UserProfile = ({ userUID }) => {
  const [userInfo, setUserInfo] = useState({ name: '', address: '', biography: '' });
  const [userPhotoURL, setUserPhotoURL] = useState(null);
  const [discountCodes, setDiscountCodes] = useState([]);

  useEffect(() => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', userUID);

    // Fetch user info
    const fetchUserInfo = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      }
    };

    // Fetch user photo
    const fetchUserPhoto = async () => {
      const storage = getStorage();
      const photoRef = ref(storage, `profile_pictures/${userUID}`);
      try {
        const url = await getDownloadURL(photoRef);
        setUserPhotoURL(url);
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    // Fetch discount codes
    const fetchDiscountCodes = async () => {
      // Replace this with your method of fetching discount codes from Firestore
    };

    fetchUserInfo();
    fetchUserPhoto();
    fetchDiscountCodes();
  }, [userUID]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      {userPhotoURL && <Image source={{ uri: userPhotoURL }} style={styles.image} />}
      <Text>Name: {userInfo.name}</Text>
      <Text>Address: {userInfo.address}</Text>
      <Text>Biography: {userInfo.biography}</Text>
      
      <Text style={styles.header}>Discount Codes</Text>
      {/* Map through discount codes and display them */}
      {discountCodes.map((code, index) => (
        <View key={index}>
          <Text>Product Name: {code.productName}</Text>
          <Text>Code: {code.code}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default UserProfile;

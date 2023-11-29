import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { globalStyles } from '../../styles/GlobalStyles';

const UserProfile = () => {
  const [photoURL, setPhotoURL] = useState(null);

  const auth = getAuth();
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
      }
    };

    fetchImageURL();
  }, [user]);

  return (
    <View style={globalStyles.container}>
      {photoURL ? (
        <Image source={{ uri: photoURL }} style={globalStyles.image} />
      ) : (
        <Text>No profile image available</Text>
      )}
    </View>
  );
};


export default UserProfile;

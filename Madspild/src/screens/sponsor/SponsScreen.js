import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ContentBox from '../../components/Lists/ContentBox';
import { globalStyles } from '../../styles/GlobalStyles';
import TextBox from '../../components/Forms/TextBox';

const SponsScreen = ({ navigation }) => {
    const [userPoints, setUserPoints] = useState(0);
    const db = getFirestore();
    const auth = getAuth();


    const sponsors = [
        { id: 1, component: "JoeOffers", name: "Joe & the Juice", logoUrl: require('../../assets/logos/joeLogo.png'), description: "Joe & the Juice cares about leaving the Planet in a better state than we found it in therefore reducing our impact on the environment. Not only in our stores, but making it easier for our customers to recycle our products through our Recycling Loop. We'll stay committed to our 2% Food Waste Score by continuing to make everything fresh to order." },
        { id: 2, component: "ZokuOffers", name: "ZOKU", logoUrl: require('../../assets/logos/ZokuLogo.png'), description: "At our core, we’re passionate about caring for our people and for our planet. We’re not perfect, but we’re always striving to “B the Change”." },
      ];

      return (
        <View style={globalStyles.container}>
          <ScrollView>
            <TextBox text="Vores sponsorer, som gør det muligt at drive For Godt Til Skrot. Se hvilke produkter du kan få hos dem med dine optjente point!" />
        
            {sponsors.map((sponsor) => (
              <ContentBox 
                key={sponsor.id} 
                sponsor={sponsor} 
                onPress={() => navigation.navigate(sponsor.component)} 
              />
            ))}
          </ScrollView>
        </View>
      );
    };

    const styles = StyleSheet.create({
      headerText: {
        marginTop: 10,
      },
    });

export default SponsScreen;

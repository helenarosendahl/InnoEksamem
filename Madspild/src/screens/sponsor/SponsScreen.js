import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import SponsorItem from '../../components/Lists/SponsorItem';
import { globalStyles } from '../../styles/GlobalStyles';
import TextBox from '../../components/Forms/TextBox';

const SponsScreen = ({ navigation }) => {
    const [userPoints, setUserPoints] = useState(0);
    const db = getFirestore();
    const auth = getAuth();


    const sponsors = [
        { id: 1, component: "JoeOffers", name: "Joe & the Juice", logoUrl: require('../../assets/logos/joeLogo.png'), description: "Joe & the Juice cares about leaving the Planet in a better state than we found it in therefore reducing our impact on the environment. Not only in our stores, but making it easier for our customers to recycle our products through our Recycling Loop. We'll stay committed to our 2% Food Waste Score by continuing to make everything fresh to order." },
        { id: 2, component: "CofocoOffers", name: "COFOCO", logoUrl: require('../../assets/logos/cofoco.png'), description: "At Copenhagen Food Collective, we are aware that with 16 restaurants and more than 700,000 guests annually, we have an impact on our surroundings - postive and negative. That's why we work hard to reduce our negative impact - and increase our positive contribution - with the ambition to practise social, economic and environmental responsibility in everything we do. " },
        { id: 3, component: "AldiOffers", name: "ALDI Danmark", logoUrl: require('../../assets/logos/aldi.png'), description: "Vi er stolte af vores indsats på madspilds-området. I 2020 donerede 60% af vores butikker overskudsmad til lokale foreninger, og alle butikker sælger lykkeposer med frugt og grønt til stærkt nedsatte priser ... På bare fire måneder i slutningen af 2020 har vi og kunderne reddet 118 ton mad. Vi undgår et stort ressourcespild, og vores kunder sparer penge og får økonomisk råderum til andre vigtige ting i hverdagen." },
      ];
  /*
      Descriptions hentes fra:
      https://www.csr.dk/reduktion-af-madspild-og-ny-emballagestrategi-går-hånd-i-hånd-i-aldi
      https://www.joejuice.com/impact
      https://www.csr.dk/klimavenlig-kaffe-hos-cofoco

  */

      return (
        <View style={globalStyles.container}>
          <ScrollView>
            <TextBox text="Vores sponsorer, som gør det muligt at drive For Godt Til Skrot. Se hvilke produkter du kan få hos dem med dine optjente point!" />
        
            {sponsors.map((sponsor) => (
              <SponsorItem 
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

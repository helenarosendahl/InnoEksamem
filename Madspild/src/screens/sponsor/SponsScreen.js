import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const SponsScreen = ({ navigation }) => {
    const [userPoints, setUserPoints] = useState(0);
    const db = getFirestore();
    const auth = getAuth();


    const sponsors = [
        { id: 1, component: "JoeOffers", name: "Joe & the Juice", logoUrl: require('../../assets/joeLogo.png'), description: "Joe & the Juice cares about leaving the Planet in a better state than we found it in therefore reducing our impact on the environment. Not only in our stores, but making it easier for our customers to recycle our products through our Recycling Loop. We'll stay committed to our 2% Food Waste Score by continuing to make everything fresh to order." },
        { id: 2, component: "CofocoOffers", name: "COFOCO", logoUrl: require('../../assets/cofoco.png'), description: "At Copenhagen Food Collective, we are aware that with 16 restaurants and more than 700,000 guests annually, we have an impact on our surroundings - postive and negative. That's why we work hard to reduce our negative impact - and increase our positive contribution - with the ambition to practise social, economic and environmental responsibility in everything we do. " },
        { id: 3, component: "AldiOffers", name: "ALDI Danmark", logoUrl: require('../../assets/aldi.png'), description: "Vi er stolte af vores indsats på madspilds-området. I 2020 donerede 60% af vores butikker overskudsmad til lokale foreninger, og alle butikker sælger lykkeposer med frugt og grønt til stærkt nedsatte priser ... På bare fire måneder i slutningen af 2020 har vi og kunderne reddet 118 ton mad. Vi undgår et stort ressourcespild, og vores kunder sparer penge og får økonomisk råderum til andre vigtige ting i hverdagen." },
        { id: 4, component: "AldiOffers", logoUrl: require('../../assets/joeLogo.png'), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      ];
  /*
      Descriptions hentes fra:
      https://www.csr.dk/reduktion-af-madspild-og-ny-emballagestrategi-går-hånd-i-hånd-i-aldi
      https://www.joejuice.com/impact
      https://www.csr.dk/klimavenlig-kaffe-hos-cofoco

  */

  return (
    <View style={styles.container}>

      <ScrollView>
      <Text style={styles.headerTexttext}> Vores sponsorer, som gør det muligt at drive denne applikation. Se hvilke produkter du kan købe, med dine optjente point! </Text>
        {sponsors.map((sponsor) => (
          <View key={sponsor.id} style={styles.sponsorBox}>
        <Image source={sponsor.logoUrl} style={styles.logo} />
            <Text style={styles.sponsorHeadText}>{sponsor.name}</Text>
            <Text style={styles.text}>{sponsor.description}</Text>
            <Button title={`Se tilbuddene fra ${sponsor.name}`} onPress={() => navigation.navigate(sponsor.component)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sponsorBox: {
    padding: 20,
    marginVertical: 20, // Mellemrum
    backgroundColor: '#fffff0', // Bagrunds farve, https://reactnative.dev/docs/colors - bruger Ivory 
    borderRadius: 10, // Kanter på boxen
    borderWidth: 2, // bredde af boxen
    borderColor: 'black', // farve i kanten af boxen
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  headerText: {
    marginTop: 30,
  },

  sponsorHeadText: {
    textAlign: 'center',
    fontSize: 25,
  },
  text: {
    marginVertical: 10,
    textAlign: 'left',

  }
});

export default SponsScreen;
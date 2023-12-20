// Importerer nødvendige React Native komponenter
import React, { useState, useEffect } from 'react';
import { View, FlatList, } from 'react-native';

// Importerer Firebase Authentication funktioner
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Importerer globalStyles 
import { globalStyles } from '../../styles/GlobalStyles';
import  TextBox  from '../../components/Forms/TextBox'

// Komponent kaldet PickUpDate
const PickUpDate = () => {
    // Variabel til at gemme accepterede anmodninger
    const [acceptedRequests, setAcceptedRequests] = useState([]);

    // Firebase Firestore-database og Authentication
    const db = getFirestore();
    const auth = getAuth();

    // Anvendes til at hente accepterede anmodninger
    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            if (auth.currentUser) {
                // Opretter en forespørgsel (query) for accepterede anmodninger
                const q = query(collection(db, "buyRequests"), where("status", "==", "accepted"));
                const querySnapshot = await getDocs(q);
                let requests = [];
    
                // Henter datene 
                for (const docSnap of querySnapshot.docs) {
                    const requestData = docSnap.data();
                    if (requestData.buyerUID === auth.currentUser.uid || requestData.sellerUID === auth.currentUser.uid) {
                        // Hente navne på donator/afhenter
                        const buyerDocRef = doc(db, "users", requestData.buyerUID);
                        const sellerDocRef = doc(db, "users", requestData.sellerUID);
    
                        const [buyerSnap, sellerSnap] = await Promise.all([
                            getDoc(buyerDocRef),
                            getDoc(sellerDocRef)
                        ]);
    
                        let buyerName = '', sellerName = '';
                        if (buyerSnap.exists()) {
                            buyerName = buyerSnap.data().name;
                        }
                        if (sellerSnap.exists()) {
                            sellerName = sellerSnap.data().name;
                        }
    
                        // Gemmer anmodningen med relevant information
                        requests.push({
                            id: docSnap.id,
                            productName: requestData.productName,
                            pickupDate: requestData.pickupDate,
                            address: requestData.address,
                            buyerUID: requestData.buyerUID,
                            sellerUID: requestData.sellerUID,
                            buyerName: buyerName,
                            sellerName: sellerName
                        });
                    }
                }
    
                // Opdaterer med de hentede anmodninger
                setAcceptedRequests(requests);
            }
        };
    
        fetchAcceptedRequests();
    }, [auth, db]);
    
    const renderRequestItem = ({ item }) => {
        const message = item.buyerUID === auth.currentUser.uid ? 
            `Afhent '${item.productName}' D. ${item.pickupDate} på addressen ${item.address}` : 
            `${item.buyerName} afhenter donationen '${item.productName}' D. ${item.pickupDate} på addressen ${item.address}`;
    
        return <TextBox text={message} />;
    };


    return (
        <View style={globalStyles.container}>
            <FlatList
                data={acceptedRequests}
                renderItem={renderRequestItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default PickUpDate;
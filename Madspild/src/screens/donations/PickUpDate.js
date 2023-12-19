import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { globalStyles } from '../../styles/GlobalStyles';
import  TextBox  from '../../components/Forms/TextBox'


const PickUpDate = () => {
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            if (auth.currentUser) {
                const q = query(collection(db, "buyRequests"), where("status", "==", "accepted"));
                const querySnapshot = await getDocs(q);
                let requests = [];

                for (const docSnap of querySnapshot.docs) {
                    const requestData = docSnap.data();
                    if (requestData.buyerUID === auth.currentUser.uid || requestData.sellerUID === auth.currentUser.uid) {
                        const productDocRef = doc(db, "products", requestData.productId);
                        const buyerDocRef = doc(db, "users", requestData.buyerUID);
                        const sellerDocRef = doc(db, "users", requestData.sellerUID);

                        const [productSnap, buyerSnap, sellerSnap] = await Promise.all([
                            getDoc(productDocRef),
                            getDoc(buyerDocRef),
                            getDoc(sellerDocRef)
                        ]);

                        if (productSnap.exists() && buyerSnap.exists() && sellerSnap.exists()) {
                            requests.push({
                                id: docSnap.id,
                                productName: productSnap.data().name,
                                pickupDate: productSnap.data().pickupDate,
                                address: productSnap.data().address,
                                buyerName: buyerSnap.data().name,
                                sellerName: sellerSnap.data().name,
                            });
                        }
                    }
                }

                setAcceptedRequests(requests);
            }
        };

        fetchAcceptedRequests();
    }, []);

    const renderRequestItem = ({ item }) => {
        const message = item.buyerName === auth.currentUser.displayName ? 
            `You will pick up ${item.productName} at ${item.pickupDate}` : 
            `${item.buyerName} will pick up ${item.productName} at ${item.pickupDate}`;

        return (
            <TextBox text={message} />
        );
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

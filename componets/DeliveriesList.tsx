// del av components/DeliveriesList.tsx
import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Base, Typography } from '../styles'
import { useState, useEffect } from "react";
import deliveryModel from "../models/deliveries";
import Delivery from "../interfaces/delivery";

export default function DeliveriesList({ navigation }) {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);

    async function fetchDocs() {
        setDeliveries(await deliveryModel.getDeliveries());

    }

    useEffect(() => {
        fetchDocs()
    }, [deliveries]);

    let deliveryCard = deliveries.map((delivery, index) => {
        return <View key={index} style={Base.prod} >
            <Text style={Typography.p}>{delivery.product_name}.</Text>
            <Text style={Typography.p} >Amount: {delivery.amount}</Text>
            <Text style={Typography.p} >Delivery: {delivery.delivery_date}</Text>
            <Text style={Typography.p}>Comment: {delivery.comment}</Text>
        </View >
    })

    let deliveryMess;

    if (deliveryCard.length == 0) {
        deliveryMess = <Text>Inga inleveranser</Text>
    } else {
        deliveryMess = <Text></Text>;
    }



    return (
        <SafeAreaView style={styles.container} >
            <ScrollView style={{ padding: 15 }}>


                <Pressable
                    onPress={() => {
                        navigation.navigate('Form');
                    }}
                    style={Base.btnWhite}
                ><Text style={Base.btnTextBlack}>Skapa ny Inleverans</Text></Pressable>
                <Text style={Typography.header3}>Historik Inleveranser</Text>
                {deliveryMess}
                {deliveryCard}

            </ScrollView>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525',
    }
});
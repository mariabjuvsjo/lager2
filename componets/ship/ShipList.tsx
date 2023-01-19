import { SafeAreaView, ScrollView, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Base, Typography } from '../../styles'
import { useState, useEffect } from "react";

import orders from '../../models/orders'



export default function ShipList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orders.getOrders());
    }

    useEffect(() => {
        reloadOrders()
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Pressable style={Base.btn} key={index} onPress={
                () => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }
            } ><Text style={Base.btnText}>{order.name}</Text></Pressable>


        });
    return (
        <SafeAreaView>
            <Text style={Typography.header3}>Ordar redo att skickas:</Text>

            {listOfOrders}


        </SafeAreaView>

    )
}


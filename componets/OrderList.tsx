import { useState, useEffect } from 'react';
import { View, Text, Button, Pressable } from "react-native";
import { Base, Typography } from '../styles';

import orderModel from "../models/orders";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders()
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Pressable style={Base.btn} key={index} onPress={
                () => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }
            } ><Text style={Base.btnText}>{order.name}</Text></Pressable>


        });
    return (
        <View style={Base.aligning}>
            <Text style={Typography.header2}>To do:</Text>
            {listOfOrders}
        </View>
    );



}
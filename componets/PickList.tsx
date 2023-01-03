import { View, Text, Button, Pressable } from "react-native";
import { useState, useEffect } from 'react';
import orderModel from "../models/orders";
import productModel from "../models/products";
import { Base } from "../styles";
import { Typography } from "../styles";


export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    async function fetchDocs() {
        setProductsList(await productModel.getProducts());

    }

    useEffect(() => {
        fetchDocs()
    }, []);





    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Orders", { reload: true });
    }
    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
            key={index}>{item.name} - {item.amount} - {item.location}</Text>

    });

    let isStock = true;
    for (let i of order.order_items) {
        for (let j of productsList) {
            if (j.name === i.name) {
                if (i.stock < i.amount) {
                    isStock = false
                }
            }
        }
    }

    if (isStock) {
        return (
            <View style={Base.aligning}>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>

                <Text>Produkter:</Text>

                {orderItemsList}

                <Pressable style={Base.btn} onPress={pick}><Text style={Base.btnText}>Plocka Order</Text></Pressable>



            </View>
        )

    } else {
        return (
            <View style={Base.aligning}>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>

                <Text>Produkter:</Text>

                {orderItemsList}

                <Text>En eller flera varor är slut i lagret</Text>



            </View>
        )

    }

}
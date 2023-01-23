
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import productModel from "../models/products";
import { Base, Typography } from "../styles";

export default function StockList({ products, setProducts }) {


    async function fetchDocs() {
        setProducts(await productModel.getProducts());

    }

    useEffect(() => {
        fetchDocs()
    }, []);

    const listing = products.map((product, index) => {
        return <Text style={Base.prod} key={index}>{product.name} : {product.stock} st</Text>
    })

    return (
        <View >

            {listing}
        </View>

    );
}
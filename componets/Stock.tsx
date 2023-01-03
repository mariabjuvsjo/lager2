import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import productModel from "../models/products";
import { Base, Typography } from "../styles";

function StockList({ products, setProducts }) {


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

export default function Stock({ products, setProducts }) {
    return (
        <View>
            <Text style={Typography.header3}>Produkter</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
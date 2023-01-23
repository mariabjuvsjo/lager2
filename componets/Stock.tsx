

import { StyleSheet, Text, View } from 'react-native';

import { Base, Typography } from "../styles";

import StockList from './StockList';



export default function Stock({ products, setProducts }) {
    return (
        <View>
            <Text style={Typography.header3}>Produkter</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}